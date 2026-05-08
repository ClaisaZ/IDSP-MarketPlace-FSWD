import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

type WorkshopFormData = {
  name: string;
  date: string;
  time: string;
  location: string;
  about: string;
  ticketPrice: string;
  applicationPeriod: string;
  seats: string;
  imageUrl: string;
  hostedBy?: string;
};

const HostWorkshopForm: React.FC = () => {
  const navigate = useNavigate();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageName, setImageName] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const [formData, setFormData] = useState<WorkshopFormData>({
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

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

      if (!data.imageUrl) {
        throw new Error("No image URL returned");
      }

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.imageUrl,
      }));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);

      setUploadError("Image upload failed. Please try again.");

      toast.error("Image upload failed. Please try again.");

      setImageName("");

      setFormData((prev) => ({
        ...prev,
        imageUrl: "",
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handlePreview = (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You must be logged in.");
      return;
    }

    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));

      if (!decoded.id) {
        toast.error("Invalid user session.");
        return;
      }

      const previewData: WorkshopFormData = {
        ...formData,
        hostedBy: decoded.id,
      };

      navigate("/host/preview", {
        state: previewData,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to verify user session.");
    }
  };

  return (
    <div className="host-page-container">
      <h1 className="host-title">Host Workshop</h1>

      <form onSubmit={handlePreview} className="host-form-card">
        {/* Workshop Name */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Name</label>

          <input
            required
            type="text"
            name="name"
            className="bordered-input"
            placeholder="Enter Workshop Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        {/* Workshop Date */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Date</label>

          <input
            required
            type="text"
            name="date"
            className="bordered-input"
            placeholder="Enter Date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        {/* Workshop Time */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Time</label>

          <input
            required
            type="text"
            name="time"
            className="bordered-input"
            placeholder="Enter Start and End Time"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        {/* Workshop Location */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Location</label>

          <input
            required
            type="text"
            name="location"
            className="bordered-input"
            placeholder="Enter Location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        {/* About Workshop */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">About This Workshop</label>

          <textarea
            required
            name="about"
            className="bordered-input"
            placeholder="Enter information about this workshop (150 characters maximum)"
            maxLength={150}
            value={formData.about}
            onChange={handleChange}
          />
        </div>

        {/* Ticket Price */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Ticket Price</label>

          <input
            required
            type="text"
            name="ticketPrice"
            className="bordered-input"
            placeholder="Enter Price"
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </div>

        {/* Application Period */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Application Period</label>

          <input
            required
            type="text"
            name="applicationPeriod"
            className="bordered-input"
            placeholder="Enter the application period"
            value={formData.applicationPeriod}
            onChange={handleChange}
          />
        </div>

        {/* Seats */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Seats Available</label>

          <input
            required
            type="number"
            name="seats"
            className="bordered-input"
            placeholder="Enter Number of Seats Available"
            value={formData.seats}
            onChange={handleChange}
          />
        </div>

        {/* Workshop Image */}
        <div className="bordered-input-group" style={{ marginTop: "10px" }}>
          <label className="bordered-input-label">Workshop Image</label>

          <input
            type="text"
            className="bordered-input"
            placeholder="Upload a JPG or PNG file"
            value={isUploading ? "Uploading..." : imageName}
            readOnly
          />

          {uploadError && (
            <p
              style={{
                color: "red",
                fontSize: "0.85rem",
                marginTop: "4px",
              }}
            >
              {uploadError}
            </p>
          )}
        </div>

        {/* Hidden File Input */}
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />

        {/* Upload Button */}
        <button
          type="button"
          className="btn-upload"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload Workshop Image"}
        </button>

        {/* Preview Button */}
        <button type="submit" className="btn-preview" style={{ marginTop: "20px" }} disabled={isUploading}>
          View Preview
        </button>
      </form>
    </div>
  );
};

export default HostWorkshopForm;
