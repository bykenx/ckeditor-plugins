/**
 * 七牛云服务器错误
 * @public
 * @see https://developer.qiniu.com/kodo/3928/error-responses
 */
export class QiniuError extends Error {
  constructor(public code: number, message: string) {
    super(message)
  }
}

/** @public */
export interface QiniuUploadOptions {
  domain: string;
  getToken: (file: File) => Promise<string>;
  onError?: (err: QiniuError | Error) => void;
}
