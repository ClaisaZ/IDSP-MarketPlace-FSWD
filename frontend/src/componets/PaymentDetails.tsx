import axios from "axios";
import React, { useState } from "react";
import { useCheckout } from "../context/useCheckout";

type ReceiptData = {
  refNum: string;
  receiptQR: string;
};

type Props = {
  onComplete: (data: ReceiptData) => void;
  onBack: () => void;
};

const PaymentDetails: React.FC<Props> = ({ onComplete, onBack }) => {
  const { state } = useCheckout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload on form submit
    setLoading(true);
    setError(null);

    try {
      // 1. Simulate a 1-second network delay to show the "Processing..." state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 2. Fake a successful response from the server to force the transition
      onComplete({
        refNum: "TEST-" + Math.floor(Math.random() * 100000),
        receiptQR: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=TestReceiptData",
      });

      const response = await axios.post("http://localhost:3000/api/register", {
        name: state.registration?.name,
        email: state.registration?.email,
        age: state.registration?.age,
        phone: state.registration?.phone,
        ticketAmount: state.registration?.ticketAmount,
        paymentMethod: state.paymentMethod,
      });

      onComplete(response.data);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">
          <button className="back-button" onClick={onBack} type="button">
            ←
          </button>{" "}
          Purchase
        </h2>
        <p className="header-subtitle">Enter Details</p>
      </div>

      <div className="purple-card">
        <form onSubmit={handlePurchase} style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div className="input-group">
            <label className="input-label">Card Number</label>
            <input required type="text" className="text-input" placeholder="XXXX XXXX XXXX XXXX" />
          </div>

          <div className="input-group">
            <label className="input-label">Expiry Date</label>
            <input required type="text" className="text-input" placeholder="MM/YY" />
          </div>

          <div className="input-group">
            <label className="input-label">CVV</label>
            <input required type="text" className="text-input" />
          </div>

          <h4 style={{ margin: "15px 0 10px 0", textAlign: "left", fontSize: "16px" }}>Shipping Address</h4>

          <div className="input-group">
            <label className="input-label">Street address</label>
            <input required type="text" className="text-input" />
          </div>

          <div className="input-group">
            <label className="input-label">City</label>
            <input required type="text" className="text-input" />
          </div>

          <div className="input-group">
            <label className="input-label">Province / State</label>
            <input required type="text" className="text-input" />
          </div>

          <div className="input-group">
            <label className="input-label">Postal code</label>
            <input required type="text" className="text-input" />
          </div>

          {error && (
            <p
              style={{
                color: "#FFcccc",
                background: "rgba(255,0,0,0.2)",
                padding: "10px",
                borderRadius: "8px",
                marginTop: "10px",
              }}
            >
              {error}
            </p>
          )}

          <button type="submit" disabled={loading} className="primary-button" style={{ marginTop: "20px" }}>
            {loading ? "Processing..." : "Purchase"}
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentDetails;
