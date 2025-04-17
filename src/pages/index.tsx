import { useState } from "react";
import QrGenerator from "@/components/QrGenerator";
import { Info, Sun, Moon } from "lucide-react";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [qrContent, setQrContent] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrBgColor, setQrBgColor] = useState("#ffffff");

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
          <h1 className="text-4xl font-extrabold text-indigo-500 dark:text-indigo-400">
            QR Code Generator
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Create high-quality, customizable QR codes effortlessly.
          </p>
        </section>

        {/* Info Panel */}
        {showInfo && (
          <div className="card mb-10">
            <h2 className="text-xl font-semibold mb-4">About This Tool</h2>
            <p className="text-gray-400">
              This QR generator supports:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-gray-400">
              <li>Website URLs</li>
              <li>Plain text</li>
              <li>Contact cards (vCards)</li>
              <li>Wi-Fi network credentials</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500 italic">
              All data is processed client-side to ensure privacy.
            </p>
          </div>
        )}

        {/* QR Code Generator */}
        <div className="card">
          <h2 className="text-xl font-bold mb-6">Generate Your QR Code</h2>
          <div className="space-y-4">
            {/* Input for QR Content */}
            <div>
              <label className="block text-sm font-medium text-gray-300">
                QR Code Content
              </label>
              <input
                type="text"
                value={qrContent}
                onChange={(e) => setQrContent(e.target.value)}
                className="mt-1 block w-full"
                placeholder="Enter text, URL, or other content"
              />
            </div>

            {/* QR Code Colors */}
            <div className="flex space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  QR Code Color
                </label>
                <input
                  type="color"
                  value={qrColor}
                  onChange={(e) => setQrColor(e.target.value)}
                  className="mt-1 block w-16 h-10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Background Color
                </label>
                <input
                  type="color"
                  value={qrBgColor}
                  onChange={(e) => setQrBgColor(e.target.value)}
                  className="mt-1 block w-16 h-10"
                />
              </div>
            </div>

            {/* QR Code Preview */}
            <div className="mt-6">
              <QrGenerator content={qrContent} color={qrColor} bgColor={qrBgColor} />
            </div>
          </div>
        </div>
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