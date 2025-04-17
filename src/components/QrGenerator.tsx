"use client";
import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QrGeneratorProps {
  content?: string;
  color?: string;
  bgColor?: string;
}

const QrGenerator: React.FC<QrGeneratorProps> = ({
  content,
  color = "#000000",
  bgColor = "#ffffff",
}) => {
  const [text, setText] = useState<string>("");
  const qrRef = useRef<HTMLDivElement | null>(null);

  const qrContent = content || text;

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
    <div
      className="shadow-lg rounded-lg p-6 w-96 text-center"
      style={{ backgroundColor: bgColor, color: color }}
    >
      <h2 className="text-xl font-semibold mb-3">Generate Your QR Code</h2>

      {!content && (
        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4 text-center dark:bg-gray-700 dark:text-white"
        />
      )}

      <div ref={qrRef} className="bg-white p-4 rounded-lg inline-block">
        {qrContent && (
          <QRCodeCanvas value={qrContent} size={200} fgColor={color} bgColor={bgColor} />
        )}
      </div>

      {qrContent && (
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
