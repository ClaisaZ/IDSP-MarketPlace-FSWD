import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCheckout } from "../context/useCheckout";

// Reusable info box — eliminates the repeated grid cell pattern
type InfoBoxProps = {
  label: string;
  value: string | number;
  fontSize?: string;
  wordBreak?: "break-all" | "normal";
};

const InfoBox: React.FC<InfoBoxProps> = ({
  label,
  value,
  fontSize = "14px",
  wordBreak = "normal",
}) => (
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
    <span className="info-label">{label}</span>
    <span className="info-value" style={{ fontSize, wordBreak }}>
      {value}
    </span>
  </div>
);

const Receipt: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useCheckout();

  const receiptData = location.state;

  // Redirects to start if receipt data is missing
  if (!receiptData) {
    return <Navigate to="/course" replace />;
  }

  const { refNum, receiptQR } = receiptData;

  const email = state.registration?.email || "myemail@bcit.ca";
  const phone = state.registration?.phone || "+1 577 656 6789";
  const ticketAmount = state.registration?.ticketAmount || 1;
  const totalPayment = ticketAmount * 24;

  // If user came from a workshop, we are going to register them as an attendee after payment
  // workshopId is passed through the entire checkout flow from WorkshopPreview
  const handleComplete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (receiptData.workshopId) {
        await fetch(`http://localhost:3000/api/workshops/${receiptData.workshopId}/attend`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      console.error("Failed to register attendance");
      toast.error("Failed to register attendance. Please try again.");
    }
    if (receiptData.workshopId) {
      navigate("/workshop/preview", { state: { _id: receiptData.workshopId } });
    } else {
      navigate("/course/profile");
    }
  };

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">
          <button
            className="back-button"
            onClick={() => navigate("/course/purchase")}
            type="button"
          >
            ←
          </button>
          Receipt
        </h2>
        <p className="header-subtitle">Your Registration has been Confirmed</p>
      </div>

      <div className="purple-card" style={{ position: "relative", marginTop: "40px" }}>
        {/* Floating Checkmark */}
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
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "15px",
            fontSize: "28px",
            fontWeight: "600",
          }}
        >
          Payment Success!
        </h3>

        {/* QR Code */}
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
          <img
            src={receiptQR}
            alt="QR Code"
            style={{ width: "180px", height: "180px", marginBottom: "10px" }}
          />
          <p style={{ fontSize: "16px", margin: 0, fontWeight: 500, color: "#333" }}>
            Download QR CODE
          </p>
        </div>

        {/* 2x2 Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            marginBottom: "20px",
          }}
        >
          <InfoBox label="Ref Number" value={refNum} fontSize="13px" />
          <InfoBox label="Ticket Amount" value={`x${ticketAmount}`} />
          <InfoBox label="Email Address" value={email} fontSize="12px" wordBreak="break-all" />
          <InfoBox label="Phone Number" value={phone} fontSize="12px" />
        </div>

        {/* Total */}
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

        <button className="primary-button" onClick={handleComplete}>
          Complete
        </button>
      </div>
    </>
  );
};

export default Receipt;
