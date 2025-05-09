import React, { useState, useRef, useEffect } from 'react';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import Header from './Header';

export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
};

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateSmartResponse(text.toLowerCase()),
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateSmartResponse = (text: string): string => {
    // Simple keyword-based response system
    if (text.includes('hello') || text.includes('hi')) {
      return "Hello! How can I assist you today?";
    }
    
    if (text.includes('help')) {
      return "I'm here to help! What specific assistance do you need?";
    }
    
    if (text.includes('weather')) {
      return "I'm sorry, I don't have access to real-time weather data. You would need to integrate a weather API for that functionality.";
    }
    
    if (text.includes('name')) {
      return "I'm a chat assistant. You can call me Bot!";
    }
    
    if (text.includes('bye') || text.includes('goodbye')) {
      return "Goodbye! Have a great day!";
    }
    
    if (text.includes('thank')) {
      return "You're welcome! Is there anything else I can help you with?";
    }
    
    if (text.includes('how are you')) {
      return "I'm functioning well, thank you for asking! How can I assist you today?";
    }

    // Default responses for unknown inputs
    const defaultResponses = [
      "That's an interesting point. Could you elaborate more?",
      "I understand. What specific aspects would you like to explore?",
      "Tell me more about that.",
      "I see. How can I help you with this topic?",
      "Interesting perspective. What made you think about this?"
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        text: 'Hello! How can I help you today?',
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <Header onReset={handleReset} />
      <div className="flex-1 overflow-hidden flex flex-col">
        <MessageList messages={messages} isTyping={isTyping} />
        <div ref={bottomRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatContainer;