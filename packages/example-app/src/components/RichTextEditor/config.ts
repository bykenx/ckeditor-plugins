import QiniuUploadAdapter from 'ckeditor-adapter-qiniu'

/** 默认工具栏 */
export const defaultToolbar = [
  'heading',
  '|',
  'bold',
  'italic',
  'link',
  'bulletedList',
  'numberedList',
  '|',
  'indent',
  'outdent',
  '|',
  'imageUpload',
  'blockQuote',
  'insertTable',
  'undo',
  'redo',
]

// 默认插件
export const defaultPlugins = [QiniuUploadAdapter]
