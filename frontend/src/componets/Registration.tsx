import React, { useState } from "react";
import { useCheckout } from "../context/useCheckout";

type Props = {
  onNext: () => void;
};

const Registration: React.FC<Props> = ({ onNext }) => {
  const { dispatch } = useCheckout();

  // Local state to hold form inputs
  const [formData, setFormData] = useState({
    name: "",
    birthday: "",
    age: "",
    city: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Save the required data to global context to send to backend later
    dispatch({
      type: "SET_REGISTRATION",
      payload: {
        name: formData.name,
        email: formData.email,
        age: Number(formData.age),
        phone: formData.phone,
        ticketAmount: 1, // Defaulting to 1 ticket based on your receipt design
      },
    });

    onNext(); // Move to Screen 2
  };

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">Registration</h2>
        <p className="header-subtitle">Input Details</p>
      </div>

      <div className="purple-card">
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div className="input-group">
            <label className="input-label">Name</label>
            <input
              required
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="text-input"
              placeholder="XXXX XXXX XXXX XXXX"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Birthday</label>
            <input
              type="text"
              name="birthday"
              value={formData.birthday}
              onChange={handleChange}
              className="text-input"
              placeholder="MM/YY"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Age</label>
            <input
              required
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="text-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">City</label>
            <input type="text" name="city" value={formData.city} onChange={handleChange} className="text-input" />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input
              required
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="text-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input
              required
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="text-input"
            />
          </div>

          <button type="submit" className="primary-button" style={{ marginTop: "20px" }}>
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default Registration;
