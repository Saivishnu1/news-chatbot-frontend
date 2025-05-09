import React from 'react';
import Message from './Message';
import TypingIndicator from './TypingIndicator';
import { Message as MessageType } from './ChatContainer';

interface MessageListProps {
  messages: MessageType[];
  isTyping: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, isTyping }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </div>
    </div>
  );
};

export default MessageList;