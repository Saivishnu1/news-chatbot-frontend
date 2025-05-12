import React, { useState, useRef, useEffect } from "react";
import MessageList from "./MessageList";
import ChatInput from "./ChatInput";
import Header from "./Header";

export type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  context?: Array<{
    title: string;
    url: string;
    description: string;
  }>;
};

const ChatContainer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
      context: [],
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Fetch session ID and chat history from backend when component loads
  useEffect(() => {
    async function initializeChat() {
      try {
        // Try to get existing session from localStorage
        const storedSessionId = localStorage.getItem('chatSessionId');
        
        if (storedSessionId) {
          // If we have a stored session, fetch its history
          setSessionId(storedSessionId);
          const historyResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/session/chat_history/${storedSessionId}`);
          const historyData = await historyResponse.json();
          
          if (historyData.messages && historyData.messages.length > 0) {
            const formattedMessages = historyData.messages.map((msg: any) => ({
              id: Math.random().toString(),
              text: msg.content,
              sender: msg.role === 'assistant' ? 'bot' : 'user',
              timestamp: new Date(),
              context: [],
            }));
            setMessages(formattedMessages);
            return;
          }
        }
        
        // If no stored session or no history, create new session
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/session/new_session/`);
        const data = await response.json();
        setSessionId(data.session_id);
        localStorage.setItem('chatSessionId', data.session_id);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    }
    initializeChat();
  }, []);

  // Remove the old scroll effect since it's now handled in MessageList
  useEffect(() => {
    // Add a small delay to ensure the DOM has updated
    const timer = setTimeout(() => {
      const chatContainer = document.querySelector('.overflow-y-auto');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !sessionId) return;
    
    // Immediately display user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);
    
    // Save message to backend in background
    fetch(`${import.meta.env.VITE_API_URL}/api/session/chat_message/${sessionId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'user',
        content: text,
      }),
    }).catch(error => {
      console.error('Error saving message:', error);
    });



    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, session_id: sessionId }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.answer || "Oops! No response available.",
        sender: "bot",
        timestamp: new Date(),
        context: data.news_context || [],
      };

      // Save bot message to backend
      try {
        await fetch(`${import.meta.env.VITE_API_URL}/api/session/chat_message/${sessionId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            role: 'assistant',
            content: data.answer || "Oops! No response available.",
          }),
        });
      } catch (error) {
        console.error('Error saving bot message:', error);
      }

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    } catch (error) {
      console.error("API request failed:", error);
      setIsTyping(false);
    }
  };

  const handleReset = async () => {
    if (!sessionId) return;

    // Immediately reset frontend state
    setMessages([
      {
        id: "1",
        text: "Hello! How can I help you today?",
        sender: "bot",
        timestamp: new Date(),
        context: [],
      },
    ]);

    try {
      // Reset backend in background
      fetch(`${import.meta.env.VITE_API_URL}/api/session/reset/${sessionId}`, {
        method: 'POST',
      }).catch(error => {
        console.error('Error resetting chat history:', error);
      });

      // Create new session
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/session/new_session/`);
      const data = await response.json();
      setSessionId(data.session_id);
      localStorage.setItem('chatSessionId', data.session_id);
    } catch (error) {
      console.error('Error creating new session:', error);
    }
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