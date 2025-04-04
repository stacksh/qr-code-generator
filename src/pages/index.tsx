import QrGenerator from "@/components/QrGenerator";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        QR Code Generator 🚀
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Enter text or a URL to generate a QR code.
      </p>
      <QrGenerator />
    </main>
  );
}
