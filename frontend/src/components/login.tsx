import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      alert("Login successful");
      localStorage.setItem("user", JSON.stringify(data.user));
      console.log("Logged in user:", data.user);
    } catch (error) {
      console.error("Login error:", error);
      alert("Could not connect to server");
    }
  }

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">Sign In</h2>
        <p className="header-subtitle">Login to your account</p>
      </div>

      <div className="purple-card">
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
        >
          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Password</label>
            <input
              required
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="primary-button" style={{ marginTop: "20px" }}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;