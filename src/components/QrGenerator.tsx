"use client";
import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import dynamic from "next/dynamic";

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
    <div className="max-w-md mx-auto px-6 py-10 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-800 transition-all duration-300">
      {/* QR Code Display */}
      <div
        ref={qrRef}
        className="mx-auto w-fit p-5 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 transition mb-6"
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
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <button
            onClick={downloadQR}
            className="px-6 py-2 rounded-full bg-indigo-600 text-white font-semibold shadow hover:bg-indigo-700 hover:scale-105 transition-all duration-150"
          >
            Download
          </button>
          <button
            onClick={handleCopy}
            className="px-6 py-2 rounded-full bg-emerald-600 text-white font-semibold shadow hover:bg-emerald-700 hover:scale-105 transition-all duration-150"
          >
            {copySuccess ? "Copied!" : "Copy Text"}
          </button>
        </div>
      )}

      {/* Scanner Toggle */}
      <div className="mt-10 text-center">
        <button
          onClick={() => setShowScanner(!showScanner)}
          className="px-6 py-2 rounded-full bg-gray-600 text-white font-semibold shadow hover:bg-gray-700 hover:scale-105 transition-all duration-150"
        >
          {showScanner ? "Close Scanner" : "Open Scanner"}
        </button>

        {showScanner && (
          <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg p-4 flex flex-col items-center">
            <div style={{ width: "100%", borderRadius: "1rem", overflow: "hidden" }}>
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (result) handleScan(result.getText());
                  if (error) handleError(error);
                }}
              />
            </div>
            <span className="mt-2 text-xs text-gray-500 dark:text-gray-400">Point your camera at a QR code</span>
          </div>
        )}

        {scannedData && (
          <div className="mt-6 text-base text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-xl px-4 py-2 shadow">
            <span className="font-semibold">Scanned:</span> {scannedData}
          </div>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
