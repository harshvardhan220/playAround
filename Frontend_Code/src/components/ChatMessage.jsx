import React from 'react';
import './ChatRoom.css'; // Ensure this file is correctly imported

const ChatMessage = ({ message, sender, timestamp, isOutgoing }) => {
  // Determine the appropriate class names based on message type
  const messageClass = isOutgoing ? 'outgoing-chats' : 'received-chats';
  const profileClass = isOutgoing ? 'outgoing-chat-profile' : 'received-chat-profile';
  const msgClass = isOutgoing ? 'outgoing-msg' : 'received-msg';
  const timeClass = isOutgoing ? 'time-me' : 'time-other';

  return (
    <div className={messageClass}>
      <div className={profileClass}>
        <img
          src={`https://avatars.dicebear.com/api/jdenticon/${sender}.svg`}
          alt={`${sender} avatar`}
          className="room-header-img"
        />
        <span className={isOutgoing ? 'name-me' : 'name-other'}>
          {isOutgoing ? 'You' : sender}
        </span>
        <span className={timeClass}>{timestamp}</span>
      </div>
      <div className={msgClass}>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;

