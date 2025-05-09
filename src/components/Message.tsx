import React from 'react';
import { Message as MessageType } from './ChatContainer';

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  }).format(message.timestamp);

  return (
    <div
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fadeIn`}
    >
      <div
        className={`max-w-[80%] md:max-w-[70%] rounded-2xl px-4 py-3 ${
          isBot
            ? 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
            : 'bg-blue-600 text-white rounded-tr-none'
        } shadow-sm`}
      >
        <p className="text-sm md:text-base">{message.text}</p>
        <span
          className={`text-xs block mt-1 ${
            isBot ? 'text-gray-500' : 'text-blue-100'
          }`}
        >
          {formattedTime}
        </span>
      </div>
    </div>
  );
};

export default Message;