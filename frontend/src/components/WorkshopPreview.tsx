import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const WorkshopPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  const data = location.state || {
    name: "Pottery and Sculpting Basics",
    date: "May 20, 2026",
    time: "10:00 AM - 11:35 AM",
    location: "33 W 8th Ave, Vancouver",
    about:
      "This workshop will cover the fundamental techniques of pottery and sculpting. Participants will learn hand-building methods such as pinch pots, coiling, and slab construction...",
    ticketPrice: "$50",
    applicationPeriod: "March 20, 2026 - April 27, 2026",
    seats: "35",
  };

  const hostAvatar = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80";

  return (
    <div className="host-page-container" style={{ padding: "0 20px" }}>
      {/* Header */}
      <div
        className="screen-header"
        style={{ flexDirection: "row", alignItems: "center", paddingTop: "30px", marginBottom: "15px" }}
      >
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          type="button"
          style={{ color: "var(--text-dark)" }}
        >
          ←
        </button>
        <h2 className="header-title" style={{ margin: 0, fontSize: "2rem" }}>
          Workshop Info
        </h2>
      </div>

      {/* Hero Image */}
      <img
        src={data.imageUrl || "https://placehold.co/800x400?text=Workshop+Image"}
        alt={data.name || "Workshop"}
        className="hero-image"
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <span className="badge-open">Open</span>
        <span style={{ fontWeight: "600", fontSize: "16px" }}>★ 0.0</span>
      </div>

      <h3 style={{ fontSize: "22px", margin: "0 0 20px 0", color: "var(--text-dark)" }}>{data.name}</h3>

      {/* Host Info */}
      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>Workshop Host</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={hostAvatar}
            alt="Host"
            style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }}
          />
          <span style={{ fontSize: "14px", color: "var(--text-dark)" }}>Jake Cobsey</span>
        </div>
      </div>

      {/* Logistics Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: "500" }}>Workshop Date</div>
          <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{data.date}</div>
        </div>
        <div>
          <div style={{ fontSize: "16px", fontWeight: "500" }}>Workshop Time</div>
          <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{data.time}</div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>Workshop Location</div>
        <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{data.location}</div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>About This Workshop</div>
        <p style={{ fontSize: "14px", color: "var(--text-dark)", lineHeight: "1.5", margin: "5px 0 0 0" }}>
          {data.about}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>Ticket Price</div>
        <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{data.ticketPrice}</div>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>Application Period</div>
        <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{data.applicationPeriod}</div>
      </div>

      {/* Attending Card */}
      <div className="bordered-card-green">
        <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "5px" }}>Who is attending?</div>
        <div style={{ fontSize: "14px" }}>0/{data.seats} Seats</div>
      </div>

      {/* Reviews Card */}
      <div className="bordered-card-white">
        <div style={{ fontSize: "18px", fontWeight: "600" }}>Reviews</div>
      </div>

      {/* Floating Action Buttons */}
      <div className="floating-btn-stack">
        <button className="btn-dark-purple" onClick={() => navigate(-1)}>
          Edit Workshop
        </button>
        <button className="btn-dark-purple" onClick={() => setShowModal(true)}>
          Host Workshop
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          <div
            style={{
              backgroundColor: "#fbe9a2",
              borderRadius: "16px",
              padding: "32px 24px",
              width: "80%",
              maxWidth: "320px",
              textAlign: "center",
              border: "2px solid #ccc",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "24px", color: "#1a1a1a" }}>
              Ready to host this workshop?
            </h2>
            <button
              className="btn-dark-purple"
              onClick={() => {
                setShowModal(false);
                alert("Workshop Hosted Successfully!");
              }}
            >
              Yes
            </button>
            <button
              className="btn-dark-purple"
              style={{ marginTop: "12px", backgroundColor: "#3d0878" }}
              onClick={() => setShowModal(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkshopPreview;
