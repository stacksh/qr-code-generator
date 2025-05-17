"use client";
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import dynamic from "next/dynamic";

// Dynamically import QR Reader to prevent SSR issues
const QrReader = dynamic(() => import("react-qr-reader").then((mod) => mod.QrReader), { ssr: false });

interface QrGeneratorProps {
  content?: string;
  color?: string;
  bgColor?: string;
  errorCorrection?: string;
  size?: number;
}

const QrGenerator: React.FC<QrGeneratorProps> = ({
  content = "",
  color = "#000000",
  bgColor = "#ffffff",
  size = 200,
  errorCorrection = "M",
}) => {
  const qrRef = useRef<HTMLDivElement | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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

  const handleCopy = () => {
    if (content) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(content).then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        }).catch((err) => console.error("Failed to copy content:", err));
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = content;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
          console.error("Fallback copy failed:", err);
        }
        document.body.removeChild(textarea);
      }
    }
  };

  const handleScan = (data: string | null) => {
    if (data) {
      setScannedData(data);
      setShowScanner(false);
    }
  };

  const handleError = (err: any) => {
    console.error("QR Scanner Error:", err);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-8 rounded-xl shadow-xl bg-white dark:bg-gray-900 transition-all duration-300">
      {/* QR Code Display */}
      <div
        ref={qrRef}
        className="mx-auto w-fit p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition"
      >
        {content && (
          <QRCodeCanvas
            value={content}
            size={size}
            fgColor={color}
            bgColor={bgColor}
            level={errorCorrection as any}
          />
        )}
      </div>

      {/* Buttons */}
      {content && (
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={downloadQR}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
          >
            Download
          </button>
          <button
            onClick={handleCopy}
            className="px-5 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition"
          >
            {copySuccess ? "Copied!" : "Copy Text"}
          </button>
        </div>
      )}

      {/* Scanner Toggle */}
      <div className="mt-8 text-center">
        <button
          onClick={() => setShowScanner(!showScanner)}
          className="px-5 py-2 rounded-xl bg-gray-600 text-white font-medium hover:bg-gray-700 transition"
        >
          {showScanner ? "Close Scanner" : "Open Scanner"}
        </button>

        {showScanner && (
          <div className="mt-4 rounded-lg overflow-hidden shadow-md border border-gray-300 dark:border-gray-700">
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (result) handleScan(result.getText());
                if (error) handleError(error);
              }}
            />
          </div>
        )}

        {scannedData && (
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Scanned:</span> {scannedData}
          </div>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
