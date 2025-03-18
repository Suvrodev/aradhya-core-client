const TermsAndConditions = () => {
  // Terms and Conditions Data
  const terms = [
    "By accessing and using AradhyaCore.com, you agree to comply with these terms and conditions.",
    "All content on this website, including text, graphics, logos, and images, is the property of AradhyaCore and is protected by intellectual property laws.",
    "You may not reproduce, distribute, or modify any content from this website without prior written consent from AradhyaCore.",
    "AradhyaCore reserves the right to modify or discontinue any part of the website without notice.",
    "You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.",
    "AradhyaCore is not liable for any damages or losses resulting from your use of the website or its services.",
    "You agree not to use the website for any illegal or unauthorized purposes.",
    "AradhyaCore may terminate your access to the website at any time for violation of these terms.",
    "These terms and conditions are governed by the laws of [Your Country/Region].",
    "If you have any questions about these terms, please contact us at info@aradhyacore.com.",
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-500 to-[#262F51] p-4">
      <section className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden p-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Terms and Conditions
          </h1>
          <p className="text-lg text-white/80">
            Please read these terms carefully before using our website.
          </p>
        </div>

        {/* Terms and Conditions List */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
          <h2 className="text-2xl font-bold text-white mb-6">Our Terms</h2>
          <ul className="space-y-4">
            {terms.map((term, index) => (
              <li key={index} className="flex items-start">
                <span className="text-teal-300 mr-3">•</span>
                <p className="text-white/80">{term}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Section */}
        <div className="text-center mt-12">
          <p className="text-white/80">
            © 2023 <span className="font-bold text-teal-300">AradhyaCore</span>.
            All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsAndConditions;
