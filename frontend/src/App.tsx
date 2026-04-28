import { useState } from "react";
import "./App.css";

import PaymentDetails from "./componets/PaymentDetails";
import PaymentSelection from "./componets/PaymentSelection";
import Receipt from "./componets/Reciept";
import Registration from "./componets/Registration";
import { CheckoutProvider } from "./context/CheckoutProvider";

type ReceiptData = {
  refNum: string;
  receiptQR: string;
};

// 1. Added REGISTRATION to the steps
type CheckoutStep = "REGISTRATION" | "SELECT_PAYMENT" | "PAYMENT_DETAILS" | "RECEIPT";

function App() {
  // 2. Start the app on the REGISTRATION screen
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("REGISTRATION");
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null);

  const handlePurchaseComplete = (data: ReceiptData) => {
    setReceiptData(data);
    setCurrentStep("RECEIPT");
  };

  return (
    <div className="app-container">
      <CheckoutProvider>
        {/* Screen 1: Registration Form */}
        {currentStep === "REGISTRATION" && <Registration onNext={() => setCurrentStep("SELECT_PAYMENT")} />}

        {/* Screen 2: Select Payment Method */}
        {currentStep === "SELECT_PAYMENT" && <PaymentSelection onNext={() => setCurrentStep("PAYMENT_DETAILS")} />}

        {/* Screen 3: Credit Card / Shipping Form */}
        {currentStep === "PAYMENT_DETAILS" && (
          <PaymentDetails onComplete={handlePurchaseComplete} onBack={() => setCurrentStep("SELECT_PAYMENT")} />
        )}

        {/* Screen 4: Success Receipt */}
        {currentStep === "RECEIPT" && receiptData && (
          <Receipt refNum={receiptData.refNum} receiptQR={receiptData.receiptQR} />
        )}
      </CheckoutProvider>
    </div>
  );
}

export default App;
