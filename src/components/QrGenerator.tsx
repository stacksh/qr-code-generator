"use client";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrGenerator: React.FC = () => {
  const [text, setText] = useState<string>("");
  const qrRef = useRef<HTMLDivElement | null>(null);

  // Function to download QR Code
  const downloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current?.querySelector("canvas") as HTMLCanvasElement | null;
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr-code.png";
        link.click();
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-96 text-center">
      <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-3">
        Generate Your QR Code
      </h2>
      <input
        type="text"
        placeholder="Enter text or URL"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4 text-center dark:bg-gray-700 dark:text-white"
      />
      <div ref={qrRef} className="bg-white p-4 rounded-lg inline-block">
        {text && <QRCodeCanvas value={text} size={200} />}
      </div>
      {text && (
        <button
          onClick={downloadQR}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QrGenerator;
