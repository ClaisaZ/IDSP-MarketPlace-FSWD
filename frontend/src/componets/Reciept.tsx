import React from "react";

type Props = {
  refNum: string;
  receiptQR: string;
};

const Receipt: React.FC<Props> = ({ refNum, receiptQR }) => {
  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">
          <button className="back-button">←</button> Receipt
        </h2>
        <p className="header-subtitle">Your Registration has been Confirmed</p>
      </div>

      {/* Success Badge Overlap */}
      <div
        style={{ display: "flex", justifyContent: "center", marginBottom: "-25px", position: "relative", zIndex: 10 }}
      >
        <div
          style={{
            background: "#EAE5FF",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#8A73FF",
              color: "white",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            ✓
          </div>
        </div>
      </div>

      <div className="purple-card">
        <h3
          style={{
            textAlign: "center",
            borderBottom: "1px solid rgba(255,255,255,0.3)",
            paddingBottom: "15px",
            marginTop: "20px",
          }}
        >
          Payment Success!
        </h3>

        <div
          style={{
            background: "white",
            padding: "15px",
            borderRadius: "12px",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          <img src={receiptQR} alt="QR Code" style={{ width: "120px", height: "120px" }} />
          <p style={{ color: "black", fontSize: "12px", margin: "5px 0 0 0", fontWeight: "bold" }}>Download QR CODE</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "20px" }}>
          <div className="info-box" style={{ margin: 0 }}>
            <span className="info-label">Ref Number</span>
            <span className="info-value" style={{ fontSize: "11px" }}>
              {refNum}
            </span>
          </div>
          <div className="info-box" style={{ margin: 0 }}>
            <span className="info-label">Ticket Amount</span>
            <span className="info-value">x1</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "auto",
            borderTop: "1px solid rgba(255,255,255,0.3)",
            paddingTop: "15px",
          }}
        >
          <span>Total Payment</span>
          <span
            style={{
              background: "white",
              color: "var(--primary-purple)",
              padding: "5px 15px",
              borderRadius: "15px",
              fontWeight: "bold",
            }}
          >
            24 CAD
          </span>
        </div>

        <button className="primary-button" style={{ marginTop: "20px" }} onClick={() => window.location.reload()}>
          Complete
        </button>
      </div>
    </>
  );
};

export default Receipt;
