/// <reference types="svelte" />
/// <reference types="vite/client" />

declare const __SOURCE__: string;

/**
 * Places a load-procedure dot. Defined in `public/preboot.js`. Won't do anything after deskwave flag `__DW_READY__` is set.
 */
declare const Dot: () => void;


