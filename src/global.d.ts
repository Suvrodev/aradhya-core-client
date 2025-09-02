/* eslint-disable @typescript-eslint/no-explicit-any */
export {};

declare global {
  interface Window {
    $crisp: any;
    CRISP_WEBSITE_ID: string;
    dataLayer: any[];
  }
}
