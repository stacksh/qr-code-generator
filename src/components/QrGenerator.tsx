"use client";
import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

interface QrGeneratorProps {
  content?: string;
  color?: string;
  bgColor?: string;
}

const QrGenerator: React.FC<QrGeneratorProps> = ({
  content = "",
  color = "#000000",
  bgColor = "#ffffff",
}) => {
  const qrRef = useRef<HTMLDivElement | null>(null);

  const downloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector("canvas") as HTMLCanvasElement | null;
      if (canvas) {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "qr-code.png";
        link.click();
      }
    }
  };

  return (
    <div className="text-center">
      <div ref={qrRef} className="inline-block bg-white p-4 rounded-lg shadow-md">
        {content && (
          <QRCodeCanvas value={content} size={200} fgColor={color} bgColor={bgColor} />
        )}
      </div>
      {content && (
        <button
          onClick={downloadQR}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
        >
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QrGenerator;
