import { useState } from "react";
import "./App.css";

import PaymentDetails from "./componets/PaymentDetails";
import PaymentSelection from "./componets/PaymentSelection";
import Receipt from "./componets/Reciept";
import Registration from "./componets/Registration";
import Profile from "./componets/Profile";
import Login from "./componets/login";
import Signup from "./componets/Signup";
import { CheckoutProvider } from "./context/CheckoutProvider";

type ReceiptData = {
  refNum: string;
  receiptQR: string;
};

// 1. Added REGISTRATION to the steps
type CheckoutStep = "REGISTRATION" | "SELECT_PAYMENT" | "PAYMENT_DETAILS" | "RECEIPT" | "PROFILE";

type CheckoutStep = "REGISTRATION" | "SELECT_PAYMENT" | "PAYMENT_DETAILS" | "RECEIPT";
type AuthStep = "LOGIN" | "SIGNUP" | "APP";

function App() {
  const [authStep, setAuthStep] = useState<AuthStep>("LOGIN");

  const [currentStep, setCurrentStep] = useState<CheckoutStep>("REGISTRATION");
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const handlePurchaseComplete = (data: ReceiptData) => {
    setReceiptData(data);
    setCurrentStep("RECEIPT");
  };

  return (
    <div className="app-container">
      <CheckoutProvider>
        {authStep === "LOGIN" && (
          <>
            <Login />

            <button type="button" onClick={() => setAuthStep("SIGNUP")}>
              Create an account
            </button>

            <button type="button" onClick={() => setAuthStep("APP")}>
              Continue to app
            </button>
          </>
        )}

        {authStep === "SIGNUP" && (
          <>
            <Signup />

            <button type="button" onClick={() => setAuthStep("LOGIN")}>
              Already have an account? Login
            </button>
          </>
        )}

        {authStep === "APP" && (
          <>
            {currentStep === "REGISTRATION" && (
              <Registration onNext={() => setCurrentStep("SELECT_PAYMENT")} />
            )}

            {currentStep === "SELECT_PAYMENT" && (
              <PaymentSelection onNext={() => setCurrentStep("PAYMENT_DETAILS")} />
            )}

            {currentStep === "PAYMENT_DETAILS" && (
              <PaymentDetails
                onComplete={handlePurchaseComplete}
                onBack={() => setCurrentStep("SELECT_PAYMENT")}
              />
            )}

            {currentStep === "RECEIPT" && receiptData && (
              <Receipt refNum={receiptData.refNum} receiptQR={receiptData.receiptQR} />
            )}
          </>
        )}
        {/* Screen 5: Profile page */}
        {currentStep === "PROFILE" && <Profile />}
      </CheckoutProvider>
    </div>
  );
}

export default App;