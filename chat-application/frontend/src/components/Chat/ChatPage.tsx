import React, { useState } from "react";
import styles from "./ChatPage.module.scss"; // Importing scoped styles

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = () => {
    if (currentMessage.trim()) {
      setMessages([...messages, currentMessage]);
      setCurrentMessage("");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Chat</h1>
      <div className={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} className={styles.message}>
            {msg}
          </div>
        ))}
      </div>
      <div className={styles.inputBox}>
        <input
          type="text"
          placeholder="Type your message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className={styles.input}
        />
        <button onClick={sendMessage} className={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
