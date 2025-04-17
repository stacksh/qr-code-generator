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
    <div className="text-center">
      {/* QR Code Preview */}
      <div ref={qrRef} className="inline-block bg-white p-4 rounded-lg shadow-md">
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

      {/* Download Button */}
      {content && (
        <button
          onClick={downloadQR}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
        >
          Download QR Code
        </button>
      )}

      {/* QR Code Scanner */}
      <div className="mt-6">
        <button
          onClick={() => setShowScanner(!showScanner)}
          className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700"
        >
          {showScanner ? "Close Scanner" : "Open Scanner"}
        </button>
        {showScanner && (
          <div className="mt-4">
            <div style={{ width: "100%" }}>
              <QrReader
                constraints={{ facingMode: "environment" }}
                onResult={(result, error) => {
                  if (result) {
                    handleScan(result.getText());
                  }
                  if (error) {
                    handleError(error);
                  }
                }}
              />
            </div>
          </div>
        )}
        {scannedData && (
          <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">
            Scanned Data: <span className="font-medium">{scannedData}</span>
          </p>
        )}
      </div>
    </div>
  );
};

export default QrGenerator;
