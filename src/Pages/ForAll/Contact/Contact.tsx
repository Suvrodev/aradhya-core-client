import { useRef, useState } from "react";
import contactLottie from "../../../assets/Lottie/contact.json";
import Lottie from "lottie-react";
import { toast } from "sonner";
import { sonarId } from "../../../utils/Fucntion/sonarId";
import emailjs from "@emailjs/browser";
import { PhoneOutgoing } from "lucide-react";

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

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
      title: subject,
      name,
      email,
      message,
      time,
    };

    setLoading(true);

    emailjs
      .send("service_yzwi1e9", "template_32tkren", templateParams, {
        publicKey: "NAaFihqk8KqCtyGzD",
      })
      .then(
        (result) => {
          console.log("SUCCESS!", result);
          if (result.text === "OK") {
            toast.success("Your mail sent successfully", { id: sonarId });
            Form.reset();
          }
        },
        (error) => {
          console.log("FAILED...", error.text);
          toast.error("Failed to send email. Please try again.");
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-[#262F51] p-4">
      <section className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-8 flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-[#262F51]">
            <h1 className="text-4xl font-bold text-white mb-8">
              Contact with Us
            </h1>
            <div className="w-full max-w-md">
              <Lottie animationData={contactLottie} loop={true} />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-8">
            {/* Four Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Location</h3>
                <p className="text-sm">Shib Bari, Khulna</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Service Number</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <PhoneOutgoing className="h-5 w-5 text-white" />
                    <p className="text-sm font-bold">01745377702</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneOutgoing className="h-5 w-5 text-white" />
                    <p className="text-sm font-bold">01951912997</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">Email</h3>
                <p className="text-sm">support@aradhyacore.com</p>
                <p className="text-sm">info@aradhyacore.com</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">OFFICE HOURS</h3>
                <p className="text-sm">
                  Saturday-Thrusday({" "}
                  <span className="text-yellow-200 font-bold">24 hours </span> )
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <form ref={form} onSubmit={sendEmail} className="space-y-6">
              <input
                type="text"
                name="user_name"
                className="w-full p-4 bg-white/20 backdrop-blur-sm rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Name"
              />

              <input
                type="text"
                name="user_email"
                className="w-full p-4 bg-white/20 backdrop-blur-sm rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Email"
              />

              <input
                type="text"
                name="subject"
                className="w-full p-4 bg-white/20 backdrop-blur-sm rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                placeholder="Subject"
              />

              <textarea
                name="message"
                className="w-full p-4 bg-white/20 backdrop-blur-sm rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                placeholder="Message"
                rows={5}
              />

              <button
                type="submit"
                className="w-full p-4 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
