import { useNavigate } from "react-router-dom";

function AccountCreated() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "390px",
        margin: "0 auto",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="screen-header"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <h2 className="header-title">Account Created</h2>
        <p className="header-subtitle">
          Your account is created and your profile is updated
        </p>
      </div>

      {/* Card */}
      <div
        className="purple-card"
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h1 style={{ fontSize: "40px" }}>NICE...yea... they dont have a flow for this so idk</h1>

        <p>
          You’re ready to start exploring SkillMatch.
        </p>

        <button
          className="primary-button"
          onClick={() => navigate("/course")}
          style={{
            width: "80%",
          }}
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default AccountCreated;