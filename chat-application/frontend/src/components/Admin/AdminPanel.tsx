import React, { useState } from "react";
import styles from "./AdminPanel.module.scss"; // Importing scoped styles

const AdminPanel: React.FC = () => {
  const [bannedUsers, setBannedUsers] = useState<string[]>([]);

  const banUser = (username: string) => {
    setBannedUsers([...bannedUsers, username]);
  };

  return (
    <div className={styles.container}>
      <h1>Admin Panel</h1>
      <ul className={styles.list}>
        {bannedUsers.map((user, index) => (
          <li key={index} className={styles.listItem}>
            {user}
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Username to ban"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            banUser((e.target as HTMLInputElement).value);
          }
        }}
        className={styles.input}
      />
    </div>
  );
};

export default AdminPanel;
