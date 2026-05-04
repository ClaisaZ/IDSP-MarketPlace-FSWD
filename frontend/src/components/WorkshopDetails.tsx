import React from "react";
import { useNavigate } from "react-router-dom";

const WorkshopDetails: React.FC = () => {
  const navigate = useNavigate();

  // Placeholder avatars for the users
  const avatar1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80";
  const avatar2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80";
  const avatar3 = "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80";

  return (
    <div style={{ paddingBottom: "100px", position: "relative" }}>
      {/* Header */}
      <div
        className="screen-header"
        style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
      >
        <h2 className="header-title" style={{ margin: 0 }}>
          <button className="back-button" onClick={() => navigate("/login")} type="button">
            ←
          </button>
          Workshop Details
        </h2>
        <span style={{ fontSize: "24px", cursor: "pointer" }}>🔖</span>
        <span style={{ fontSize: "24px", cursor: "pointer" }} onClick={() => navigate("/course/profile")}>👤</span>
      </div>

      {/* Hero Section */}
      <img
        src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80"
        alt="Design Tools"
        className="hero-image"
      />

      <div className="status-row">
        <span className="status-badge">Going On</span>
        <span style={{ color: "var(--text-gray)" }}>12:00PM – Burnaby, Metro | ★ 4.5</span>
      </div>

      <h3 style={{ fontSize: "24px", margin: "10px 0 20px 0" }}>Design Workshop With Our Special Guest X.</h3>

      {/* Logistics Card */}
      <div className="purple-card" style={{ padding: "25px", marginBottom: "20px" }}>
        <div className="logistics-row">
          {/* Custom Calendar Icon */}
          <div
            className="logistics-icon"
            style={{
              backgroundColor: "white",
              color: "var(--primary-purple)",
              flexDirection: "column",
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontSize: "11px", fontWeight: "bold" }}>May</span>
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>28</span>
          </div>
          <div className="logistics-text">
            <strong style={{ fontSize: "16px" }}>Thursday, May 28</strong>
            <span style={{ fontSize: "14px", opacity: 0.8 }}>12:00PM to 2:00PM PST</span>
          </div>
        </div>

        <div className="logistics-row">
          <div
            className="logistics-icon"
            style={{ color: "white", border: "2px solid rgba(255,255,255,0.4)", background: "transparent" }}
          >
            📍
          </div>
          <div className="logistics-text">
            <strong style={{ fontSize: "16px" }}>3700 Willingdon Ave,</strong>
            <span style={{ fontSize: "14px", opacity: 0.8 }}>Burnaby, BC V5G 3L1</span>
          </div>
        </div>

        <div className="logistics-row" style={{ marginBottom: 0 }}>
          <div
            className="logistics-icon"
            style={{ color: "white", border: "2px solid rgba(255,255,255,0.4)", background: "transparent" }}
          >
            💳
          </div>
          <div className="logistics-text">
            <strong style={{ fontSize: "16px" }}>Free</strong>
            <span style={{ fontSize: "14px", opacity: 0.8 }}>Event Cost</span>
          </div>
        </div>
      </div>

      {/* Event Info & Skills */}
      <div className="purple-card" style={{ padding: "25px", marginBottom: "20px" }}>
        <h4 style={{ textAlign: "left", fontSize: "20px", marginBottom: "15px" }}>Event Information</h4>
        <p style={{ fontSize: "14px", lineHeight: "1.6", opacity: 0.9, marginBottom: "20px" }}>
          This is a transformative journey into inner healing and finding the strength to move forward despite trauma.
          The film follows the protagonists' journey from pain and doubt to self-acceptance, new life direction, and a
          renewed sense of self-worth. The project was created by the charitable movement "Second Wind" in partnership
          with the foundation "If Not Now, When?". The film is directed by Mariia Kondakova, a French-Ukrainian
          documentary filmmaker known for her sensitive and honest exploration of war, trauma, and human resilience.
        </p>

        <h4 style={{ textAlign: "left", fontSize: "18px", marginBottom: "10px" }}>Skills Gained :</h4>
        <div className="interests-list">
          <span className="interest-tag" style={{ background: "#46148C", padding: "8px 20px" }}>
            Design
          </span>
          <span className="interest-tag" style={{ background: "#46148C", padding: "8px 20px" }}>
            Creativity
          </span>
          <span className="interest-tag" style={{ background: "#46148C", padding: "8px 20px" }}>
            Tech
          </span>
          <span className="interest-tag" style={{ background: "#46148C", padding: "8px 20px" }}>
            Math
          </span>
        </div>
      </div>

      {/* Event Host */}
      <div className="purple-card" style={{ padding: "25px", marginBottom: "20px" }}>
        <h4 style={{ textAlign: "left", fontSize: "20px", marginBottom: "15px" }}>Event Host</h4>
        <div className="user-list-item">
          <img src={avatar1} alt="Anya Petrova" className="user-avatar" />
          <span className="user-name">Anya Petrova</span>
        </div>
      </div>

      {/* Event Guests */}
      <div className="purple-card" style={{ padding: "25px", marginBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h4 style={{ textAlign: "left", fontSize: "20px", marginBottom: "5px" }}>Event Guests</h4>
            <div className="guest-subtitle">23/100 Seats</div>
          </div>
          <span style={{ fontSize: "12px", opacity: 0.8, marginTop: "5px" }}>View All</span>
        </div>

        <div className="user-list-item">
          <img src={avatar1} alt="Anya Petrova" className="user-avatar" />
          <span className="user-name">Anya Petrova</span>
        </div>
        <div className="user-list-item">
          <img src={avatar2} alt="Kenji Tanaka" className="user-avatar" />
          <span className="user-name">Kenji Tanaka</span>
        </div>
        <div className="user-list-item">
          <img src={avatar3} alt="Natalie Kim" className="user-avatar" />
          <span className="user-name">Natalie Kim</span>
        </div>
      </div>

      {/* Reviews Card */}
      <div className="purple-card" style={{ padding: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h4 style={{ margin: 0, fontSize: "20px" }}>Reviews</h4>
          <span style={{ fontSize: "12px", opacity: 0.8 }}>View All</span>
        </div>

        {/* Review 1 */}
        <div className="review-card">
          <div className="review-header">
            <div className="avatar-placeholder" style={{ width: "35px", height: "35px", fontSize: "14px" }}>
              CS
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>Nate Smith</div>
              <div style={{ color: "#1a1a1a", fontSize: "12px" }}>★★★★★</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.4", color: "#444" }}>
            Anya explained everything in a clear and simple way, which really helped the whole class understand the
            material better and feel prepared for the test. Her teaching made a big difference.
          </p>
        </div>

        {/* Review 2 */}
        <div className="review-card">
          <div className="review-header">
            <div className="avatar-placeholder" style={{ width: "35px", height: "35px", fontSize: "14px" }}>
              CS
            </div>
            <div>
              <div style={{ fontWeight: "bold", fontSize: "14px" }}>Chris Sanders</div>
              <div style={{ color: "#1a1a1a", fontSize: "12px" }}>★★★★</div>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "13px", lineHeight: "1.4", color: "#444" }}>
            Anya explained most concepts well and clearly, but was going at a fast pace and it was hard to keep up with
            the course.
          </p>
        </div>
      </div>

      {/* Floating Register Button */}
      <button className="floating-register-btn" onClick={() => navigate("/course/register")}>
        Register
      </button>
    </div>
  );
};

export default WorkshopDetails;
