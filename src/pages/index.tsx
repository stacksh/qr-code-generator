import { useState } from "react";
import QrGenerator from "@/components/QrGenerator";
import { Download, Info, Settings, History, Github } from "lucide-react";
import { IconButton, FeatureItem } from "@/components/MiscUI";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-950 dark:to-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      
      {/* Navigation Bar */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-2xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">
            QR Maker
          </span>
          <div className="flex items-center space-x-3">
            <IconButton icon={<History />} />
            <IconButton icon={<Settings />} />
            <IconButton icon={<Info />} onClick={() => setShowInfo(!showInfo)} />
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
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-md mb-10 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-3">About This Tool</h2>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
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

        {/* Main QR Generator Card */}
        <section className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Left Side */}
            <div className="md:w-1/2 p-8">
              <h2 className="text-2xl font-bold mb-6">Generate Your QR Code</h2>
              <QrGenerator />
            </div>

            {/* Right Side / Features */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 md:w-1/2 p-8 text-white">
              <h3 className="text-xl font-semibold mb-5">Features</h3>
              <ul className="space-y-4">
                <FeatureItem icon={<Download />} text="Download as PNG, SVG, or PDF" />
                <FeatureItem icon={<Settings />} text="Customize colors and styles" />
                <FeatureItem icon={<Info />} text="Add logos and branding" />
              </ul>

              <div className="mt-8 p-4 bg-white/10 rounded-xl">
                <p className="text-sm">
                  Tip: Always test your QR on multiple devices for optimal performance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">Use Cases</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Business Cards",
                description: "Add scannable contact info to your card."
              },
              {
                title: "Marketing Materials",
                description: "Boost traffic with QR links on posters & flyers."
              },
              {
                title: "Event Check-ins",
                description: "Simplify registration and access at venues."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
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