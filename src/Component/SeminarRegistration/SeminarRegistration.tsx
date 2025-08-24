/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { sonarId } from "../../utils/Fucntion/sonarId";
import { UAParser } from "ua-parser-js";

const API_URL = "https://sheetdb.io/api/v1/rdtogn8tdhsvs";

const SeminarRegistration = () => {
  const [showOtherInput, setShowOtherInput] = useState(false);
  const otherInputRef = useRef<HTMLInputElement | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    setIsSubmitting(true);
    toast.loading("Submitting...", { id: sonarId });

    try {
      // Fetch IP
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();
      console.log("ID Data: ", ipData);
      const ip = ipData.ip;
      console.log("ID : ", ip);

      // Fetch IP info
      const infoRes = await fetch(
        `https://ipinfo.io/${ip}?token=${import.meta.env.VITE_IP_TOKEN}`
      );
      const info = await infoRes.json();

      console.log("Info: ", info);

      // Device info
      const parser = new UAParser();
      const result = parser.getResult();

      const now = new Date();
      const time = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      const date = now
        .toLocaleDateString("en-GB", {
          timeZone: "Asia/Dhaka",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        })
        .split("/")
        .join("-");

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      const payload = {
        data: [
          {
            name: data.name,
            age: data.age,
            occupation: data.profession,
            email: data.email,
            course: data.course,
            other_course: data.otherCourse || "",
            phone: data.phone,
            date,
            time,
            ip,
            city: info.city || "",
            region: info.region || "",
            country: info.country || "",
            loc: info.loc || "",
            org: info.org || "",
            postal: info.postal || "",
            timezone: info.timezone || "",
            device: result.device?.type || "Desktop",
            os: `${result.os?.name || "Unknown"} ${result.os?.version || ""}`,
            browser: `${result.browser?.name || "Unknown"} ${
              result.browser?.version || ""
            }`,
            network: (navigator as any).connection?.effectiveType || "unknown",
          },
        ],
      };

      console.log("Payload: ", payload);
      // Submit to SheetDB
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Data Submitted Successfully", { id: sonarId });
        form.reset();
        setShowOtherInput(false);
      } else {
        console.error(await res.text());
        toast.error("Failed to submit form", { id: sonarId });
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong!", { id: sonarId });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (showOtherInput && otherInputRef.current) {
      otherInputRef.current.focus();
    }
  }, [showOtherInput]);

  const inputClasses =
    "w-full rounded-lg px-4 py-3 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#166F74]";

  return (
    <div className="min-h-screen bg-white flex justify-center items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
        <div className="bg-[#166F74] text-white p-8 relative">
          <h2 className="text-3xl font-bold mb-2">Contact Information</h2>
          <p className="text-green-100">Free Seminar Registration Form</p>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              আপনার নাম <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className={inputClasses}
              style={{ backgroundColor: "#374151" }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              আপনার বয়স <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              placeholder="Your age"
              min={16}
              max={100}
              className={inputClasses}
              style={{ backgroundColor: "#374151" }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              আপনার পেশা <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="profession"
              placeholder="Your profession"
              className={inputClasses}
              style={{ backgroundColor: "#374151" }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              আপনার ইমেইল <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              className={inputClasses}
              style={{ backgroundColor: "#374151" }}
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-3">
              কোর্স <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              {[
                { value: "3D DESIGN", label: "3D DESIGN" },
                { value: "DIGITAL MARKETING", label: "DIGITAL MARKETING" },
                { value: "GRAPHIC DESIGN", label: "GRAPHIC DESIGN" },
                { value: "MOTION", label: "MOTION" },
                { value: "other", label: "Other" },
              ].map((course) => (
                <label
                  key={course.value}
                  className="flex items-center p-3 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-all"
                  style={{ backgroundColor: "#374151", color: "white" }}
                >
                  <input
                    type="radio"
                    name="course"
                    value={course.value}
                    className="h-4 w-4 text-[#166F74] focus:ring-[#166F74] accent-[#166F74]"
                    onChange={() => setShowOtherInput(course.value === "other")}
                    required
                  />
                  <span className="ml-3">{course.label}</span>
                </label>
              ))}
            </div>

            {showOtherInput && (
              <input
                type="text"
                name="otherCourse"
                placeholder="Write your course name"
                ref={otherInputRef}
                className={inputClasses}
                style={{ backgroundColor: "#374151" }}
              />
            )}
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-2">
              আপনার মোবাইল নাম্বার <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="01XXXXXXXXX"
              pattern="[0-9]{11}"
              className={inputClasses}
              style={{ backgroundColor: "#374151" }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full ${
              isSubmitting ? "bg-gray-400" : "bg-[#166F74] hover:bg-[#12595d]"
            } text-white font-medium py-3 px-4 rounded-lg shadow-md transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#166F74] flex items-center justify-center`}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SeminarRegistration;
