import React from "react";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>Welcome to the Chat App</h1>
      <button onClick={goToLogin} style={{ padding: "10px 20px", cursor: "pointer" }}>
        Go to Login
      </button>
    </div>
  );
};

export default Home;
