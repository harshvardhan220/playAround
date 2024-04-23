import React, { useState } from 'react';
import { IonIcon } from "react-ion-icon";// Ensure Ionicons is imported

const ChatFooter = ({ socket, username, onJoinChat }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit('send-chat-message', { content: message, username });
      setMessage('');
    }
  };

  return (
    <div className="footer">
      <form
        id="send-container"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
      >
        <textarea
          id="message-input"
          placeholder="Type Your Message...."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.key === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <div className="footer-icons">
          <IonIcon
            name="paper-plane-outline"
            className="fa plane"
            onClick={handleSendMessage}
          ></IonIcon>
          <IonIcon name="happy-outline" className="fa happy"></IonIcon>
          <IonIcon name="attach-outline" className="fa attach"></IonIcon>
        </div>
      </form>
    </div>
  );
};

export default ChatFooter;

