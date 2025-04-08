import { useState } from "react";
import QrGenerator from "@/components/QrGenerator";
import { Download, Info, Settings, History, Github } from "lucide-react";

export default function Home() {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">QR Maker</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <History className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Settings className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button 
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setShowInfo(!showInfo)}
              >
                <Info className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <main className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
            QR Code Generator <span className="text-indigo-600 dark:text-indigo-400">Pro</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Create customizable QR codes for your business, personal projects, or events in seconds.
          </p>
        </div>
        
        {/* Info Panel (conditionally rendered) */}
        {showInfo && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8 animate-fade-in">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-3">
              About QR Code Generator
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              This tool creates high-quality QR codes that can store various types of information:
            </p>
            <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 mb-4">
              <li>Website URLs</li>
              <li>Plain text</li>
              <li>Contact information</li>
              <li>Wi-Fi network details</li>
              <li>And more!</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-400">
              All QR codes are generated client-side for your privacy.
            </p>
          </div>
        )}
        
        {/* Main QR Generator Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Generate Your QR Code
              </h2>
              <QrGenerator />
            </div>
            
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 md:w-1/2 p-6 md:p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Features</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <Download className="h-4 w-4" />
                  </div>
                  <span>Download as PNG, SVG, or PDF</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <Settings className="h-4 w-4" />
                  </div>
                  <span>Customize colors and style</span>
                </li>
                <li className="flex items-center">
                  <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
                    <Info className="h-4 w-4" />
                  </div>
                  <span>Add logos to your QR code</span>
                </li>
              </ul>
              
              <div className="mt-8 p-4 bg-white bg-opacity-10 rounded-lg">
                <p className="text-sm">
                  Pro Tip: For best scanning results, test your QR code on multiple devices before printing.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Examples Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-8">
            Use Cases
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Business Cards",
                description: "Add contact information to your business cards"
              },
              {
                title: "Marketing Materials",
                description: "Direct customers to your website or promotions"
              },
              {
                title: "Event Check-ins",
                description: "Streamline registration at events and conferences"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 mt-16 py-8 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">
                © 2025 QR Code Generator Pro
              </p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                Terms
              </a>
              <a href="#" className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}