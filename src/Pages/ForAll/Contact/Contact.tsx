import "./Contact.css";
import { useRef, useState } from "react";
import contactLottie from "../../../assets/Lottie/contact.json";
import Lottie from "lottie-react";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false); // লোডিং স্টেট

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const Form = form.current;
    const name: string = Form.user_name.value.trim();
    const email: string = Form.user_email.value.trim();
    const subject: string = Form.subject.value.trim();
    const message: string = Form.message.value.trim();
    const time: string = new Date().toLocaleString();

    if (!name) {
      toast.error("Please Provide your Name", { id: sonarId });
      return;
    }
    if (!email) {
      toast.error("Please Provide your Gmail", { id: sonarId });
      return;
    }
    if (!email.includes("@gmail.com")) {
      toast.error("Please provide a valid Gmail", { id: sonarId });
      return;
    }
    if (!subject) {
      toast.error("Please Provide a Subject", { id: sonarId });
      return;
    }
    if (!message) {
      toast.error("Please Write Your Message", { id: sonarId });
      return;
    }

    const templateParams = {
      title: subject, // ডাইনামিক সাবজেক্ট
      name,
      email,
      message,
      time,
    };

    setLoading(true); // লোডিং শুরু

    emailjs
      .send("service_yzwi1e9", "template_32tkren", templateParams, {
        publicKey: "NAaFihqk8KqCtyGzD",
      })
      .then(
        (result) => {
          console.log("SUCCESS!", result);
          if (result.text === "OK") {
            toast.success("Your mail sent successfully", { id: sonarId });
            Form.reset(); // সফল হলে ফর্ম রিসেট
          }
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send email. Please try again.");
        }
      )
      .finally(() => setLoading(false)); // লোডিং বন্ধ
  };

  return (
    <div>
      <section className="mb-20">
        <div className="flex flex-col md:flex-row bg-[#192655] p-4 md:p-10 rounded-lg">
          <div className="w-full md:w-1/2 relative">
            <h1 className="text-white md:text-4xl font-bold md:absolute top-0 left-0">
              Contact with Me
            </h1>
            <div className="h-full w-full flex flex-col items-center justify-center">
              <Lottie animationData={contactLottie} loop={true} />
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <div className="bg-[#333333] p-4 md:p-10 rounded-lg contactForm">
              <form ref={form} onSubmit={sendEmail}>
                <input
                  type="text"
                  name="user_name"
                  className="w-full bg-transparent p-5 myBorder shadow-md hover:shadow-xl pText"
                  placeholder="Name"
                />

                <input
                  type="text"
                  name="user_email"
                  className="w-full bg-transparent p-5 myBorder mt-10 shadow-md hover:shadow-xl pText"
                  placeholder="Email"
                />

                {/* ✅ ডাইনামিক Subject Input */}
                <input
                  type="text"
                  name="subject"
                  className="w-full bg-transparent p-5 myBorder mt-10 shadow-md hover:shadow-xl pText"
                  placeholder="Subject"
                />

                <textarea
                  name="message"
                  className="w-full bg-transparent p-5 h-60 textBorder mt-10 pText"
                  placeholder="Message"
                />

                {/* ✅ লোডিং ইফেক্ট সহ সাবমিট বাটন */}
                <button
                  type="submit"
                  className="btn text-white w-full md:w-[250px] mt-10 bg-[#192655] hover:bg-[#192655] border-0 shadow-md hover:shadow-xl"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
