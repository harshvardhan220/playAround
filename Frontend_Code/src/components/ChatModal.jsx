


import React, { useState } from 'react';
import { IonIcon } from "react-ion-icon"; // Ensure Ionicons is imported

const ChatModal = ({ isActive, onJoin }) => {
  const [username, setUsername] = useState('');

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onJoin(username.trim());
    }
  };

  return (
    <>
      <div className={`modal ${isActive ? 'active' : ''}`} id="modal">
        <div className="modal-header">
          <img
            src={`https://avatars.dicebear.com/api/jdenticon/${username}.svg`}
            alt="User Avatar"
          />
        </div>
        <form onSubmit={handleJoinChat}>
          <div className="modal-body">
            <input
              type="text"
              maxlength="512"
              className="input-your-name"
              id="nameText"
              placeholder="What's Your Name?"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="submit-name" type="submit">Join the Room</button>
              <IonIcon
                name="enter-outline"
                className="fa"
                onClick={handleJoinChat}
              ></IonIcon>
            </div>
          </div>
        </form>
      </div>
      <div className={`#overlay ${isActive ? 'active' : ''}`} />
    </>
  );
};

export default ChatModal;


