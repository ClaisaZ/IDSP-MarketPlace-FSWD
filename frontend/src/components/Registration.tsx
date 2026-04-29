import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { type Resolver, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../context/useCheckout";
import { type RegistrationFormData, registrationSchema } from "../schemas/registrationSchema";

const Registration: React.FC = () => {
  const { dispatch } = useCheckout();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema) as Resolver<RegistrationFormData>,
    mode: "onBlur",
  });

  const onSubmit = (data: RegistrationFormData) => {
    dispatch({
      type: "SET_REGISTRATION",
      payload: {
        name: data.name,
        email: data.email,
        age: data.age,
        phone: data.phone,
        ticketAmount: 1,
      },
    });

    navigate("/course/payments");
  };

  return (
    <>
      <div className="screen-header">
        <h2 className="header-title">Registration</h2>
        <p className="header-subtitle">Input Details</p>
      </div>

      <div className="purple-card">
        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <div className="input-group">
            <label className="input-label">Name</label>
            <input {...register("name")} type="text" className="text-input" placeholder="First and Last Name" />
            {errors.name && (
              <span style={{ color: "#FFcccc", fontSize: "12px", marginTop: "4px" }}>{errors.name.message}</span>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Birthday</label>
            <input {...register("birthday")} type="text" className="text-input" placeholder="MM/YY" />
            {errors.birthday && (
              <span style={{ color: "#FFcccc", fontSize: "12px", marginTop: "4px" }}>{errors.birthday.message}</span>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Age</label>
            <input {...register("age")} type="number" className="text-input" placeholder="Must be 18+" />
            {errors.age && (
              <span style={{ color: "#FFcccc", fontSize: "12px", marginTop: "4px" }}>{errors.age.message}</span>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">City</label>
            <input {...register("city")} type="text" className="text-input" />
          </div>

          <div className="input-group">
            <label className="input-label">Email</label>
            <input {...register("email")} type="email" className="text-input" placeholder="you@example.com" />
            {errors.email && (
              <span style={{ color: "#FFcccc", fontSize: "12px", marginTop: "4px" }}>{errors.email.message}</span>
            )}
          </div>

          <div className="input-group">
            <label className="input-label">Phone Number</label>
            <input {...register("phone")} type="tel" className="text-input" placeholder="+1234567890" />
            {errors.phone && (
              <span style={{ color: "#FFcccc", fontSize: "12px", marginTop: "4px" }}>{errors.phone.message}</span>
            )}
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
