import { useState } from "react";
import { toast } from "sonner";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      toast.success("Login successful");

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      setTimeout(() => {
        window.location.href = "/course";
      }, 1000);

      console.log("Logged in user:", data.user);
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Could not connect to server");
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
          style={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
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

            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-input"
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  paddingRight: "45px",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "20px",
                  color: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="primary-button"
            style={{ marginTop: "20px" }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;