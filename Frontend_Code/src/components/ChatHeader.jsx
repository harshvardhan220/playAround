import React from 'react';
import { IonIcon } from "react-ion-icon"; // Ensure Ionicons is imported
// Ensure Ionicons is imported

const ChatHeader = ({ roomName }) => (
  <div className="room-header">
    <div className="room-header-img">
      <img src="https://source.unsplash.com/user/erondu/200x200" alt="Chat Room" />
    </div>
    <div className="room-name">
      <h4>{roomName}</h4>
    </div>
    <div className="room-header-icons">
      <IonIcon name="information-outline" className="fa"></IonIcon>
      <IonIcon name="people-outline" className="fa"></IonIcon>
      <IonIcon name="notifications-outline" className="fa"></IonIcon>
    </div>
  </div>
);

export default ChatHeader;


