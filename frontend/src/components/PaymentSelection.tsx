import React from "react";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../context/useCheckout";

const PaymentSelection: React.FC = () => {
  const { dispatch } = useCheckout();
  const navigate = useNavigate(); // <-- Initialized the hook

  const handlePaymentSelect = (method: "Visa" | "PayPal") => {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method });
    navigate("/course/purchase");
  };

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">
          {/* <-- Added onClick to the back button to go back to Registration --> */}
          <button className="back-button" onClick={() => navigate("/course")} type="button">
            ←
          </button>{" "}
          Select
        </h2>
        <p className="header-subtitle">Choose Payment method</p>
      </div>

      <div className="purple-card">
        <h4>Bank Transfer</h4>
        <button type="button" className="white-button">
          <span>🏦</span> Banking Details
        </button>

        <h4 style={{ marginTop: "20px" }}>Pay Online with Credit or Debit</h4>
        <button type="button" onClick={() => handlePaymentSelect("PayPal")} className="white-button">
          <span>🅿️</span> Pay with Paypal
        </button>
        <button type="button" onClick={() => handlePaymentSelect("Visa")} className="white-button">
          <span>💳</span> Credit/Debit Card
        </button>
      </div>
    </>
  );
};

export default PaymentSelection;
