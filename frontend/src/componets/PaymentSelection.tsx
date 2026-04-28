import React from "react";
import { useCheckout } from "../context/useCheckout";

type Props = {
  onNext: () => void;
};

const PaymentSelection: React.FC<Props> = ({ onNext }) => {
  const { dispatch } = useCheckout();

  const handlePaymentSelect = (method: "Visa" | "PayPal") => {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: method });
    onNext();
  };

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">
          <button className="back-button">←</button> Select
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
