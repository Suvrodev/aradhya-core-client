/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";

type GTMEventData = Record<string, any>; // Generic key-value object

const useGTMEvent = (eventName: string, data: GTMEventData = {}): void => {
  useEffect(() => {
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
