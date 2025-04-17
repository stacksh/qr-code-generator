import { useState } from "react";
import QrGenerator from "@/components/QrGenerator";
import { Info, Sun, Moon } from "lucide-react";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [qrContent, setQrContent] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrBgColor, setQrBgColor] = useState("#ffffff");
  const [qrSize, setQrSize] = useState(200);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [qrHistory, setQrHistory] = useState<string[]>([]);

  const handleGenerate = () => {
    if (qrContent) {
      setQrHistory((prev) => [qrContent, ...prev.slice(0, 4)]); // Save up to 5 recent QR codes
    }
  };

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      } transition-colors duration-300`}
    >
      {/* Navigation Bar */}
      <nav className="bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold tracking-tight text-indigo-400">
            QR Maker
          </span>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-700 transition"
              aria-label="Toggle Dark Mode"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-gray-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-400" />
              )}
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-700 transition"
              aria-label="About"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-6 w-6 text-gray-400" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto py-16 px-6">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-indigo-500 dark:text-indigo-400">
            QR Code Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Create high-quality, customizable QR codes effortlessly.
          </p>
        </section>

        {/* Info Panel */}
        {showInfo && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-10 shadow-md">
            <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
            <p className="text-gray-600 dark:text-gray-400">
              This QR generator supports:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Website URLs</li>
              <li>Plain text</li>
              <li>Contact cards (vCards)</li>
              <li>Wi-Fi network credentials</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 italic">
              All data is processed client-side to ensure privacy.
            </p>
          </div>
        )}

        {/* QR Code Generator */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
          <h2 className="text-xl font-bold mb-6">Generate Your QR Code</h2>
          <div className="space-y-4">
            {/* Input for QR Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                QR Code Content
              </label>
              <input
                type="text"
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter text, URL, or other content"
              />
            </div>

            {/* QR Code Colors */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  QR Code Color
                </label>
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="mt-1 block w-16 h-10 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Background Color
                </label>
                <input
                  type="color"
                  value={qrBgColor}
                  onChange={(e) => setQrBgColor(e.target.value)}
                  className="mt-1 block w-16 h-10 border border-gray-300 dark:border-gray-700 rounded-md"
                />
              </div>
            </div>

            {/* QR Code Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                QR Code Size
              </label>
              <input
                type="number"
                value={qrSize}
                onChange={(e) => setQrSize(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter size (e.g., 200)"
              />
            </div>

            {/* Error Correction Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Error Correction Level
              </label>
              <select
                value={errorCorrection}
                onChange={(e) => setErrorCorrection(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="L">Low (L)</option>
                <option value="M">Medium (M)</option>
                <option value="Q">Quartile (Q)</option>
                <option value="H">High (H)</option>
              </select>
            </div>

            {/* QR Code Preview */}
            <div className="mt-6">
              <QrGenerator
                content={qrContent}
                color={qrColor}
                bgColor={qrBgColor}
                size={qrSize}
                errorCorrection={errorCorrection}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700"
            >
              Generate QR Code
            </button>
          </div>
        </div>

        {/* QR Code Scanner Section */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Scan a QR Code</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Use your device's camera to scan a QR code and retrieve its content.
          </p>
          <QrGenerator />
        </section>

        {/* QR Code History */}
        {qrHistory.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mt-10 shadow-md">
            <h2 className="text-xl font-bold mb-4">QR Code History</h2>
            <ul className="space-y-2">
              {qrHistory.map((item, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-400">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 py-6 mt-20">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-400">
          © 2025 QR Code Generator Pro. All rights reserved.
        </div>
      </footer>
    </div>
  );
}