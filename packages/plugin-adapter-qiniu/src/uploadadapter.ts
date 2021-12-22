import { uploadUrl } from './constant'
import { QiniuError, QiniuUploadOptions } from './interface'
import { warn } from './utils'

class Adapter {

  abortController: AbortController

  constructor(private loader: any, private options: QiniuUploadOptions) {
    this.abortController = new AbortController()
  }

  upload() {
    const { getToken, domain, onError } = this.options
    return this.loader.file.then(async (file: any) => {
      let token
      try {
        token = await getToken(file!)
      } catch(err) {
        const error = new Error('获取token失败')
        onError?.(error)
        throw error
      }
      const formData = new FormData()
      formData.append('file', file!)
      formData.append('token', token)
      try {
        const res = await fetch(uploadUrl, {
          body: formData,
          credentials: 'omit',
          signal: this.abortController.signal,
          method: 'POST',
        })
        const data = await res.json()
        if (res.status !== 200) {
          const error = new QiniuError(res.status, data?.error)
          throw error
        }
        return { default: `${domain}/${data.key}` }
      } catch(err) {
        onError?.(err as Error)
        throw err
      }
    });
  }

  abort() {
    this.abortController.abort()
  }
}

/** @public */
export default function QiniuUploadAdapter(editor: any) {
  const config = (editor.config.get('qiniuUpload') || {}) as QiniuUploadOptions
  if (!config.getToken) {
    warn('[QiniuUploadAdapter] 请提供 qiniuUpload.getToken 方法用以获取上传token')
    return
  } else if (!config.domain) {
    warn('[QiniuUploadAdapter] 请提供 qiniuUpload.domain 配置项用以拼接完整资源地址')
    return
  }
  editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
    return new Adapter(loader, config);
  }
}