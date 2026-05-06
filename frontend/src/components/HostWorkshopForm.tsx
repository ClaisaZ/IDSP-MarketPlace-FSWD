import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const HostWorkshopForm: React.FC = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageName, setImageName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
    location: "",
    about: "",
    ticketPrice: "",
    applicationPeriod: "",
    seats: "",
    imageUrl: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    setImageName(file.name);
    setIsUploading(true);
    setUploadError("");

    const formPayload = new FormData();
    formPayload.append("image", file);

    try {
      const response = await fetch("http://localhost:5000/api/media/upload", {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
    } catch {
      setUploadError("Image upload failed. Please try again.");
      setImageName("");
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/host/preview", { state: formData });
  };

  return (
    <div className="host-page-container">
      <h1 className="host-title">Host Workshop</h1>

      <form onSubmit={handlePreview} className="host-form-card">
        {/* 1. Workshop Name */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Name</label>
          <input
            required
            type="text"
            name="name"
            className="bordered-input"
            placeholder="Enter Workshop Name"
            onChange={handleChange}
          />
        </div>

        {/* 2. Date */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Date</label>
          <input
            required
            type="text"
            name="date"
            className="bordered-input"
            placeholder="Enter Date"
            onChange={handleChange}
          />
        </div>

        {/* 3. Time */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Time</label>
          <input
            required
            type="text"
            name="time"
            className="bordered-input"
            placeholder="Enter Start and End Time"
            onChange={handleChange}
          />
        </div>

        {/* 4. Location */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Location</label>
          <input
            required
            type="text"
            name="location"
            className="bordered-input"
            placeholder="Enter Location"
            onChange={handleChange}
          />
        </div>

        {/* 5. About */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">About This Workshop</label>
          <textarea
            required
            name="about"
            className="bordered-input"
            placeholder="Enter information about this workshop (150 characters maximum)"
            maxLength={150}
            onChange={handleChange}
          />
        </div>

        {/* 6. Ticket Price */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Ticket Price</label>
          <input
            required
            type="text"
            name="ticketPrice"
            className="bordered-input"
            placeholder="Enter Price"
            onChange={handleChange}
          />
        </div>

        {/* 7. Application Period */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Application Period</label>
          <input
            required
            type="text"
            name="applicationPeriod"
            className="bordered-input"
            placeholder="Enter the application period"
            onChange={handleChange}
          />
        </div>

        {/* 8. Seats Available */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Seats Available</label>
          <input
            required
            type="number"
            name="seats"
            className="bordered-input"
            placeholder="Enter Number of Seats Available"
            onChange={handleChange}
          />
        </div>

        {/* 9. Workshop Image */}
        <div className="bordered-input-group" style={{ marginTop: "10px" }}>
          <label className="bordered-input-label">Workshop Image</label>
          <input
            type="text"
            className="bordered-input"
            placeholder="Upload a JPG or PNG file"
            value={isUploading ? "Uploading..." : imageName}
            readOnly
          />
          {uploadError && <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px" }}>{uploadError}</p>}
        </div>

        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        <button
          type="button"
          className="btn-upload"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Workshop Image"}
        </button>

        <button type="submit" className="btn-preview" style={{ marginTop: "20px" }} disabled={isUploading}>
          View Preview
        </button>
      </form>
    </div>
  );
};

export default HostWorkshopForm;
