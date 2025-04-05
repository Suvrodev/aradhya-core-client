import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";

interface IpInfo {
  ip: string;
  city: string;
  region: string;
  country: string;
  loc: string;
  org: string;
  postal: string;
  timezone: string;
}

const TraceUser = () => {
  const [ip, setIp] = useState<string>("");
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [deviceType, setDeviceType] = useState<string>("Desktop");
  const [os, setOs] = useState<string>("Unknown");
  const [browser, setBrowser] = useState<string>("Unknown");

  // Fetch IP
  useEffect(() => {
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setIp(data.ip))
      .catch((err) => console.error("IP fetch error:", err));
  }, []);

  // Fetch IP info
  useEffect(() => {
    if (ip) {
      fetch(
        `https://ipinfo.io/${ip}?token=${
          import.meta.env.VITE_IP_TOKEN as string
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          const fullData = { ...data, ip };
          setIpInfo(fullData);
        })
        .catch((err) => console.error("IP Info error:", err));
    }
  }, [ip]);

  // Detect Device Info
  useEffect(() => {
    const parser = new UAParser();
    const result = parser.getResult();
    const type = result.device?.type || "Desktop";
    const osInfo = `${result.os?.name || "Unknown"} ${
      result.os?.version || ""
    }`;
    const browserInfo = `${result.browser?.name || "Unknown"} ${
      result.browser?.version || ""
    }`;

    setDeviceType(type);
    setOs(osInfo);
    setBrowser(browserInfo);
  }, []);

  // Send to Google Sheet
  useEffect(() => {
    if (ipInfo) {
      const payload = {
        ip: ipInfo.ip,
        loc: ipInfo.loc,
        city: ipInfo.city,
        org: ipInfo.org,
        region: ipInfo.region,
        postal: ipInfo.postal,
        timezone: ipInfo.timezone,
        country: ipInfo.country,
        "Device Type": deviceType,
        OS: os,
        Browser: browser,
      };

      //   console.log("Sending to Sheet:", payload);

      fetch(`https://sheetdb.io/api/v1/${import.meta.env.VITE_SPREED_SHEET}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        // .then((res) => res.json())
        // .then((data) => {
        //     console.log("✅ Data sent to Sheet:", data);
        // })
        .catch((err) => {
          console.error("❌ Error sending to sheet:", err);
        });
    }
  }, [ipInfo, deviceType, os, browser]);

  return null; // No UI needed
};

export default TraceUser;
