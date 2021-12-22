export function log(...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.log(...args)
  }
}

export function warn(...args: any[]) {
  if (process.env.NODE_ENV === 'development') {
    console.warn(...args)
  }
}
