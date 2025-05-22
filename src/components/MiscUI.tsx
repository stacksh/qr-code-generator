import { ReactNode } from "react";

export const IconButton = ({ icon, onClick = () => {} }: { icon: ReactNode; onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  >
    {icon}
  </button>
);

export const FeatureItem = ({ icon, text }: { icon: ReactNode; text: string }) => (
  <li className="flex items-center text-sm sm:text-base">
    <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
      {icon}
    </div>
    <span>{text}</span>
  </li>
);
