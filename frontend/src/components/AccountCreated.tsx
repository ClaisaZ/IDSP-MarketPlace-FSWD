import { IoCheckmarkCircle } from "react-icons/io5"; // If you have react-icons
import { useNavigate } from "react-router-dom";

function AccountCreated() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {/* Header */}
      <div
        className="screen-header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginBottom: "40px",
        }}
      >
        {/* Celebration Icon */}
        <IoCheckmarkCircle size={80} color="#facc15" style={{ marginBottom: "10px" }} />

        <h2 className="header-title" style={{ fontSize: "28px" }}>
          Account Created!
        </h2>
        <p className="header-subtitle">Everything is set up and your profile is ready to go.</p>
      </div>

      {/* Success Card */}
      <div
        className="purple-card"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "30px",
          gap: "24px",
        }}
      >
        <h1 style={{ fontSize: "36px", fontWeight: "800", lineHeight: "1.1" }}>You're in, @User!</h1>

        <p style={{ fontSize: "16px", opacity: 0.9 }}>
          You’re ready to start exploring workshops and connecting with other creators on SkillMatch.
        </p>

        <button
          className="primary-button"
          onClick={() => navigate("/course")}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "18px",
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default AccountCreated;
