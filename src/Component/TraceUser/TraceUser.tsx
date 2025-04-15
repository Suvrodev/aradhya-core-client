import { useEffect, useState } from "react";
import { UAParser } from "ua-parser-js";
import { useAppSelector } from "../../redux/hook";
import { verifyToken } from "../../utils/Fucntion/verifyToken";

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

  const { token } = useAppSelector((state) => state.auth);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let user: any;
  if (token) {
    user = verifyToken(token);
  }
  // console.log("User in Trace: ", user);

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
      const now = new Date();

      // Convert to Bangladesh Time (Asia/Dhaka)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      const time = now.toLocaleTimeString("en-US", options); // e.g., "08:35 PM"

      // BD Date
      const dateOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Dhaka",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
      const rawDate = now.toLocaleDateString("en-GB", dateOptions); // e.g., "05/04/2025"
      const date = rawDate.split("/").join("-"); // safer than replaceAll

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
        Time: time,
        Date: date,
        name: token ? user?.name : "Not Logged",
        email: token ? user?.email : "Not Logged",
        phone: token ? String(user?.phone || "") : "Not Logged",
      };

      // console.log("Sending to Sheet:", payload);

      fetch(`https://sheetdb.io/api/v1/${import.meta.env.VITE_SPREED_SHEET}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        // .then((data) => {
        //   console.log("✅ Data sent to Sheet:", data);
        // })
        .catch((err) => {
          console.error("❌ Error sending to sheet:", err);
        });
    }
  }, [ipInfo, deviceType, os, browser, user, token]);

  return null; // No UI needed
};

export default TraceUser;
