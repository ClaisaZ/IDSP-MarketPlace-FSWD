import { Link } from "react-router-dom";

function Welcome() {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "390px",
        minHeight: "100vh",
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="screen-header" style={{ textAlign: "center", paddingTop: "40px" }}>
        <h1 className="header-title" style={{ fontSize: "34px", textAlign: "center" }}>
          SkillMatch
        </h1>
      </div>

      <div
        className="purple-card"
        style={{
          flex: 1,
          alignItems: "center",
          textAlign: "center",
          borderRadius: "10",
          paddingTop: "10px",
        }}
      >
        <img
          src="https://picsum.photos/200"
          alt="SkillMatch logo"
          style={{
            width: "170px",
            height: "170px",
            objectFit: "cover",
            marginBottom: "30px",
          }}
        />

        <div style={{ width: "75%", display: "flex", flexDirection: "column", gap: "18px" }}>
          <Link to="/signup" style={{ textDecoration: "none" }}>
            <button className="primary-button" style={{ width: "100%" }}>
              Sign Up
            </button>
          </Link>

          <Link to="/login" style={{ textDecoration: "none" }}>
            <button className="primary-button" style={{ width: "100%" }}>
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Welcome;