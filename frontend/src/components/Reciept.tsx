import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCheckout } from "../context/useCheckout";

const Receipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCheckout(); // Pulling in the global context to get the user's info

  const receiptData = location.state;

  // Security check
  if (!receiptData) {
    return <Navigate to="/course" replace />;
  }

  const { refNum, receiptQR } = receiptData;

  // Fallback to placeholders if context is empty (e.g., during testing)
  const email = state.registration?.email || "myemail@bcit.ca";
  const phone = state.registration?.phone || "+1 577 656 6789";
  const ticketAmount = state.registration?.ticketAmount || 1;
  const totalPayment = ticketAmount * 24; // Assuming 24 CAD per course(s)

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">
          <button className="back-button" onClick={() => navigate("/course/purchase")} type="button">
            ←
          </button>
          Receipt
        </h2>
        <p className="header-subtitle">Your Registration has been Confirmed</p>
      </div>

      <div className="purple-card" style={{ position: "relative", marginTop: "40px" }}>
        {/* Floating Checkmark Icon */}
        <div
          style={{
            position: "absolute",
            top: "-35px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "70px",
            height: "70px",
            backgroundColor: "#FDFBF0",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              backgroundColor: "#8A73FF",
              borderRadius: "50%",
              width: "45px",
              height: "45px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            ✓
          </div>
        </div>

        <h3
          style={{ textAlign: "center", marginTop: "30px", marginBottom: "15px", fontSize: "28px", fontWeight: "600" }}
        >
          Payment Success!
        </h3>

        {/* QR Code Container */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "15px",
            padding: "20px",
            textAlign: "center",
            color: "black",
            marginBottom: "20px",
          }}
        >
          <img src={receiptQR} alt="QR Code" style={{ width: "130px", height: "130px", marginBottom: "10px" }} />
          <p style={{ fontSize: "14px", margin: 0, fontWeight: 500, color: "#333" }}>Download QR CODE</p>
        </div>

        {/* 2x2 Grid for Details */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "20px" }}>
          <div className="info-box" style={{ margin: 0, textAlign: "center" }}>
            <span className="info-label">Ref Number</span>
            <span className="info-value" style={{ fontSize: "13px" }}>
              {refNum}
            </span>
          </div>
          <div className="info-box" style={{ margin: 0, textAlign: "center" }}>
            <span className="info-label">Ticket Amount</span>
            <span className="info-value">x{ticketAmount}</span>
          </div>
          <div
            className="info-box"
            style={{
              margin: 0,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <span className="info-label">Email Address</span>
            <span className="info-value" style={{ fontSize: "12px", wordBreak: "break-all" }}>
              {email}
            </span>
          </div>
          <div className="info-box" style={{ margin: 0, textAlign: "center" }}>
            <span className="info-label">Phone Number</span>
            <span className="info-value" style={{ fontSize: "12px" }}>
              {phone}
            </span>
          </div>
        </div>

        {/* Total Payment Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
            marginTop: "10px",
          }}
        >
          <span style={{ fontSize: "18px", fontWeight: "500" }}>Total Payment</span>
          <span
            style={{
              backgroundColor: "#46148C",
              padding: "8px 16px",
              borderRadius: "20px",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {totalPayment} CAD
          </span>
        </div>

        <button className="primary-button" onClick={() => navigate("/course/profile")}>
          Complete
        </button>
      </div>
    </>
  );
};

export default Receipt;
