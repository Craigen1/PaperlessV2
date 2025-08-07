import React, { useState, useEffect } from "react";
import "./styles.css";
export default function CssT() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "" || password === "") {
      setError(true);
    } else {
      // Submit the login form
    }
  };

  useEffect(() => {
    // set error to false in 0.5s
    if (error) {
      const interval = setInterval(() => {
        setError(false);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [error]);

  return (
    <>
      <div className="login-page ">
        <form
          onSubmit={handleSubmit}
          className={
            error
              ? "border-2 p-2 rounded-lg  error border-red-500"
              : "border p-2 rounded-lg "
          }
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}
