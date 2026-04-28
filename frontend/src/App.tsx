import { BrowserRouter, Link, Navigate, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/login";
import PaymentDetails from "./components/PaymentDetails";
import PaymentSelection from "./components/PaymentSelection";
import Profile from "./components/Profile";
import Receipt from "./components/Reciept";
import Registration from "./components/Registration";
import Signup from "./components/Signup";
import { CheckoutProvider } from "./context/CheckoutProvider";

function CourseLayout() {
  return (
    <CheckoutProvider>
      <Outlet />
    </CheckoutProvider>
  );
}

function App() {
  return (
    <div className="app-container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route
            path="/login"
            element={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "400px",
                  margin: "0 auto",
                  paddingTop: "40px",
                }}
              >
                <Login />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "100%",
                    marginTop: "15px",
                    padding: "0 20px",
                  }}
                >
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <button className="white-button" style={{ justifyContent: "center", width: "100%" }}>
                      Create an account
                    </button>
                  </Link>
                  <Link to="/course" style={{ textDecoration: "none" }}>
                    <button className="primary-button" style={{ width: "100%" }}>
                      Continue to app
                    </button>
                  </Link>
                </div>
              </div>
            }
          />

          <Route
            path="/signup"
            element={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  maxWidth: "400px",
                  margin: "0 auto",
                  paddingTop: "40px",
                }}
              >
                <Signup />
                <div style={{ width: "100%", marginTop: "15px", padding: "0 20px" }}>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <button className="white-button" style={{ justifyContent: "center", width: "100%" }}>
                      Already have an account? Login
                    </button>
                  </Link>
                </div>
              </div>
            }
          />

          {/* The URL-Based Course Flow */}
          <Route path="/course" element={<CourseLayout />}>
            <Route index element={<Registration />} />
            <Route path="payments" element={<PaymentSelection />} />
            <Route path="purchase" element={<PaymentDetails />} />
            <Route path="receipt" element={<Receipt />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
