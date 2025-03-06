import { useEffect } from "react";

const CrispChat = () => {
  useEffect(() => {
    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = import.meta.env.VITE_CRISP_WEBSITE_ID || "";

    const script = document.createElement("script");
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script); // Cleanup on unmount
    };
  }, []);

  return null; // This component does not render anything
};

export default CrispChat;
