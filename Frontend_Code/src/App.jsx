import React, { useState, useEffect, useRef } from "react";

import ChatHeader from "./components/ChatHeader";
import ChatBody from "./components/ChatBody";
import ChatFooter from "./components/ChatFooter";
import ChatModal from "./components/ChatModal";
import { io } from "socket.io-client";
import "./App.css"; // Load the external CSS // Apply the given CSS

const App = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isOverlayActive, setIsOverlayActive] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const socket = useRef(null);
  const incomingAudioRef = useRef(new Audio("/path/to/incoming-sound.mp3"));
  const outgoingAudioRef = useRef(new Audio("/path/to/incoming-sound.mp3"));
  const chatBodyRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    socket.current = io("https://zchatserver.glitch.me/");

    socket.current.on("chat-message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "received", ...data },
      ]);
      scrollToBottom();
      if (soundEnabled && incomingAudioRef.current) {
        incomingAudioRef.current.play();
      }
    });

    socket.current.on("user-connected", (name) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "system", message: `User ${name} joined` },
      ]);
      scrollToBottom();
    });

    return () => {
      socket.current.disconnect();
    };
  }, [soundEnabled]);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = { message, username };
      socket.current.emit("send-chat-message", newMessage);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "sent", ...newMessage },
      ]);
      setMessage("");
      scrollToBottom();
      if (soundEnabled && outgoingAudioRef.current) {
        outgoingAudioRef.current.play();
      }
    }
  };

  const joinChat = () => {
    if (username.trim() !== "") {
      socket.current.emit("send-username", username);
      setIsOverlayActive(false);
      sendMessage(`Hey, I joined`, username);
    }
  };

  return (
    <div className="chatui">
      <audio ref={incomingAudioRef}>
        <source src="incoming_tone.mp3" />
      </audio>
      <audio ref={outgoingAudioRef}>
        <source src="outgoing_tone.mp3" />
      </audio>

      {/* Header */}
      <div className="room-header">
        <div className="room-header-img">
          <img
            src="https://source.unsplash.com/user/erondu/200x200"
            alt="Room"
          />
        </div>
        <div className="room-name">
          <h4>#PlayAround</h4>
        </div>
        <div className="room-header-icons">
          <ion-icon name="information-outline" className="fa"></ion-icon>
          <ion-icon name="people-outline" className="fa"></ion-icon>
          <ion-icon
            name={
              soundEnabled
                ? "notifications-outline"
                : "notifications-off-outline"
            }
            className="fa"
            onClick={() => setSoundEnabled(!soundEnabled)}
          ></ion-icon>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <>
            <div
              key={index}
              className={
                msg.type === "sent" ? "outgoing-chats" : "received-chats"
              }
            >
              {msg.type === "sent" ? (
                <div className="outgoing-chat-profile">
                  <img
                    src={`https://avatars.dicebear.com/api/jdenticon/${username}.svg`}
                    alt="You"
                  />
                  <span className="name-me">You</span>
                </div>
              ) : (
                <div className="received-chat-profile">
                  <img
                    src={`https://avatars.dicebear.com/api/jdenticon/${msg.username}.svg`}
                    alt={msg.username}
                  />
                  <span className="name-other">{msg.username}</span>
                </div>
              )}
              <div
                className={
                  msg.type === "sent" ? "outgoing-msg" : "received-msg"
                }
              >
                <p>{msg.message}</p>
              </div>
            </div>
          </>
        ))}
      </div>

      {/* Chat Footer */}
      <div className="footer">
        <form
          id="send-container"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <textarea
            id="message-input"
            placeholder="Type Your Message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.ctrlKey && e.key === "Enter") {
                sendMessage();
              }
            }}
          />
          <div className="footer-icons">
            <ion-icon
              name="paper-plane-outline"
              className="fa plane"
              id="sendButton"
              onClick={sendMessage}
            ></ion-icon>
            <ion-icon name="happy-outline" className="fa happy"></ion-icon>
            <ion-icon name="attach-outline" className="fa attach"></ion-icon>
          </div>
        </form>
      </div>

      {isOverlayActive && (
        <div className="modal active" id="modal">
          <div className="modal-header">
            <img
              src={`https://avatars.dicebear.com/api/jdenticon/${username}.svg`}
              alt="Name Icon"
            />
          </div>
          <form>
            <div className="modal-body">
              <input
                type="text"
                className="input-your-name"
                placeholder="What's Your Name?"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="off"
              />
              <div className="modal-buttons">
                <button
                  className="submit-name"
                  onClick={(e) => {
                    e.preventDefault();
                    joinChat();
                  }}
                >
                  Join the Room
                </button>
                <ion-icon
                  name="enter-outline"
                  className="fa"
                  id="SubmitNameIcon"
                  onClick={joinChat}
                ></ion-icon>
              </div>
            </div>
          </form>
        </div>
      )}
      <div id="overlay" className={isOverlayActive ? "active" : ""}></div>
    </div>
  );
};

export default App;
