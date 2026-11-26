declare global {
  interface Window {
    __DW_INIT__: boolean;
    __DW_STATUS__: string;
    __DW_READY__: boolean;
  }
}

export {};
