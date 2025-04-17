import { useState } from "react";
import QrGenerator from "@/components/QrGenerator";
import { Download, Info, Settings, History, Github, Sun, Moon } from "lucide-react";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [qrContent, setQrContent] = useState("");
  const [qrColor, setQrColor] = useState("#000000");
  const [qrBgColor, setQrBgColor] = useState("#ffffff");

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gray-950 text-gray-100"
          : "bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800"
      } transition-colors duration-300`}
    >
      {/* Navigation Bar */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-3xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-400">
            QR Maker
          </span>
          <div className="flex items-center space-x-4">
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle Dark Mode"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-gray-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <button
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="About"
              onClick={() => setShowInfo(!showInfo)}
            >
              <Info className="h-6 w-6 text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-extrabold leading-tight">
            QR Code Generator <span className="text-indigo-600 dark:text-indigo-400">Pro</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate high-quality, customizable QR codes effortlessly for your business, personal brand, or event.
          </p>
        </section>

        {/* Info Panel */}
        {showInfo && (
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-10 transition-all">
            <h2 className="text-2xl font-semibold mb-4">About This Tool</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This QR generator supports:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
              <li>Website URLs</li>
              <li>Plain text</li>
              <li>Contact cards (vCards)</li>
              <li>Wi-Fi network credentials</li>
              <li>And more</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-500 italic">
              All data is processed client-side to ensure privacy and speed.
            </p>
          </div>
        )}

        {/* QR Code Generator */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 mb-10">
          <h2 className="text-2xl font-bold mb-6">Generate Your QR Code</h2>
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
                className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

            {/* QR Code Preview */}
            <div className="mt-6">
              <QrGenerator content={qrContent} color={qrColor} bgColor={qrBgColor} />
            </div>

            {/* Download Buttons */}
            <div className="flex space-x-4 mt-6">
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">
                Download PNG
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">
                Download SVG
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md shadow hover:bg-indigo-700">
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6 mt-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-gray-500 dark:text-gray-400 mb-3 md:mb-0">
            © 2025 QR Code Generator Pro. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}