import { useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        return;
      }

      alert("Account created successfully");

      setFormData({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.error("Signup error:", error);
      alert("Could not connect to server");
    }
  }

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">Create Account</h2>
        <p className="header-subtitle">Sign up to continue</p>
      </div>

      <div className="purple-card">
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div className="input-group">
            <label className="input-label">Name</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-input"
              placeholder="Enter your name"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              value={formData.password}
              onChange={handleChange}
              className="text-input"
              placeholder="Create a password"
            />
          </div>

          <button type="submit" className="primary-button" style={{ marginTop: "20px" }}>
            Sign Up
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;
