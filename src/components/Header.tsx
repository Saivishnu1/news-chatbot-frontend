import React from 'react';
import { MessageSquare, RotateCcw } from 'lucide-react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <MessageSquare className="h-6 w-6 text-blue-600" />
        <h1 className="text-xl font-semibold text-gray-800">Chat Interface</h1>
      </div>
      <button
        onClick={onReset}
        className="flex items-center space-x-1 px-3 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <RotateCcw size={16} />
        <span>Reset Chat</span>
      </button>
    </header>
  );
};

export default Header;