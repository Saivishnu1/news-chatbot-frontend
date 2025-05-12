import React, { useState, useRef, useEffect } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isComposing, setIsComposing] = useState(false);

  useEffect(() => {
    // Focus the input on component mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isComposing) {
      const message = inputValue;
      setInputValue(''); // Clear input immediately
      // Use requestAnimationFrame to ensure UI updates before sending
      requestAnimationFrame(() => {
        onSendMessage(message);
      });
    }
  }, [inputValue, isComposing, onSendMessage]);

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit, isComposing]);

  const handleChange = React.useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  }, []);

  return (
    <div className="p-4 border-t border-gray-200 bg-white">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative flex-1">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder="Type a message..."

            className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-all"
            rows={1}
            style={{
              minHeight: '44px',
              maxHeight: '200px',
              caretColor: 'auto',
              WebkitAppearance: 'none',
              height: 'auto',
            }}
          />
        </div>
        <button
          type="submit"
          className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!inputValue.trim()}
        >
          <Send size={20} />
        </button>
      </form>
      <p className="text-xs text-gray-500 mt-2">
        Press Enter to send, Shift+Enter for a new line
      </p>
    </div>
  );
};

export default ChatInput;