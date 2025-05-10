import { QRCodeCanvas } from "qrcode.react";
import { useRef, useState } from "react";

const QRCodeGenerator = () => {
  const [text, setText] = useState<string>("");
  const [qrColor, setQrColor] = useState<string>("#000000"); // Default black
  const qrRef = useRef<HTMLCanvasElement>(null);

  const downloadQRCode = () => {
    const canvas = qrRef.current;
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-teal-500 via-teal-600 to-[#262F51]">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl w-full max-w-md text-center p-8 border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-6">
          QR Code Generator
        </h1>

        <div className="mb-6">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text or URL"
            className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:border-transparent transition-all"
          />
        </div>

        {text.trim() !== "" && (
          <div className="animate-fadeIn">
            <div className="mb-4">
              <label className="text-white/80 font-medium text-sm mr-2">
                QR Code Color:
              </label>
              <input
                type="color"
                value={qrColor}
                onChange={(e) => setQrColor(e.target.value)}
                className="w-10 h-6 p-0 border-none rounded-md cursor-pointer"
              />
            </div>

            <div className="flex justify-center mb-6 p-4 bg-white rounded-lg">
              <QRCodeCanvas
                value={text}
                size={256}
                bgColor="rgba(0,0,0,0)" // ✅ Transparent background
                fgColor={qrColor}
                level="H"
                includeMargin={true}
                ref={qrRef}
              />
            </div>

            <button
              onClick={downloadQRCode}
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-teal-500/20"
            >
              Download QR Code
            </button>
          </div>
        )}

        {!text.trim() && (
          <div className="text-white/70 italic mt-4">
            Enter text or URL to generate QR code
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
