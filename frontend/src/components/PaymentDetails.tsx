import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../context/useCheckout";

const PaymentDetails: React.FC = () => {
  const { state } = useCheckout();
  const paymentMethod = state.paymentMethod;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3000/api/course", {
        name: state.registration?.name,
        email: state.registration?.email,
        age: state.registration?.age,
        phone: state.registration?.phone,
        ticketAmount: state.registration?.ticketAmount,
        paymentMethod: state.paymentMethod,
      });

      navigate("/course/receipt", { state: response.data });
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
          <button className="back-button" onClick={() => navigate("/course/payments")} type="button">
            ←
          </button>
          Purchase
        </h2>
        <p className="header-subtitle">Enter Details</p>
      </div>

      <div className="purple-card">
        <form onSubmit={handlePurchase} style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          {/* Dynamic UI: Visa shows card fields, PayPal shows login simulation */}
          {paymentMethod === "Visa" && (
            <>
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
            </>
          )}

          {paymentMethod === "PayPal" && (
            <>
              <div className="input-group">
                <label className="input-label">PayPal Email</label>
                <input required type="email" className="text-input" placeholder="you@paypal.com" />
              </div>
              <div className="input-group">
                <label className="input-label">PayPal Password</label>
                <input required type="password" className="text-input" placeholder="••••••••" />
              </div>
              <p style={{ fontSize: "12px", color: "#ccc", marginTop: "4px" }}>
                This is a login simulation — no real PayPal connection.
              </p>
            </>
          )}

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
