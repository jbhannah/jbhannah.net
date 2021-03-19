declare var gtag: (command: string, ...params: any) => void

declare module '*.less' {
  const resource: {[key: string]: string};
  export = resource;
}
