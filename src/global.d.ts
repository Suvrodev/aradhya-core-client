export {};

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    $crisp: any;
    CRISP_WEBSITE_ID: string;
  }
}
