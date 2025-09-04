/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

type GTMEventData = Record<string, any>; // Generic key-value object

const useGTMEvent = (eventName: string, data: GTMEventData = {}): void => {
  useEffect(() => {
    // যদি eventName নাই বা data নাই বা empty object হয় → কিছুই করবে না
    if (
      !eventName ||
      !data ||
      (typeof data === "object" && Object.keys(data).length === 0)
    ) {
      return;
    }

    if (typeof window !== "undefined") {
      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).dataLayer.push({
        event: eventName,
        ...data,
      });

      console.log(`GTM event fired: ${eventName}`, data);
    }
  }, [eventName, data]);
};

export default useGTMEvent;
