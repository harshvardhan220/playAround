import React from 'react';

const ChatBody = ({ messages }) => (
  <div className="chat-body" id="chatBody">
    {messages.map((msg, idx) => (
      <div key={idx} className={msg.type === 'received' ? 'received-chats' : 'outgoing-chats'}>
        <div className={msg.type === 'received' ? 'received-chat-profile' : 'outgoing-chat-profile'}>
          <img src={`https://avatars.dicebear.com/api/jdenticon/${msg.username}.svg`} alt="Profile" />
          {msg.type === 'received' ? (
            <span className="name-other">{msg.username}</span>
          ) : (
            <span className="name-me">You</span>
          )}
        </div>
        <div className={msg.type === 'received' ? 'received-msg' : 'outgoing-msg'}>
          <p>{msg.content}</p>
        </div>
      </div>
    ))}
  </div>
);

export default ChatBody;

