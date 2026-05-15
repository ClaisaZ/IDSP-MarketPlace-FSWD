import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavBar from "./navbar";

type WorkshopFormData = {
  name: string;
  categories: string[];
  date: string;
  time: string;
  endTime: string;
  location: string;
  about: string;
  ticketPrice: string;
  applicationPeriod: string;
  seats: string;
  imageUrl: string;
  hostedBy?: string;
};

const categories = [
  "AI",
  "Coding",
  "Tech",
  "UI/UX",
  "Design",
  "Data Science",
  "Marketing",
  "Entrepreneurship",
  "Photography",
  "Music",
  "Video Editing",
  "Game Dev",
  "Fitness",
  "Leadership",
  "Public Speaking",
  "Finance",
  "Creativity",
  "Animation",
  "Writing",
  "Teaching",
  "Research",
  "Fashion",
  "Cooking",
  "Languages",
  "Math",
  "Nutrition",
  "Sales",
  "Fine Art",
  "Pottery",
  "Hair",
];

const HostWorkshopForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);

  // Pre-filling the form if user returns from preview to edit
  const incoming = location.state as WorkshopFormData | null;
  const [formData, setFormData] = useState<WorkshopFormData>({
    name: incoming?.name || "",
    categories: incoming?.categories || [],
    date: incoming?.date || "",
    time: incoming?.time || "",
    endTime: incoming?.endTime || "",
    location: incoming?.location || "",
    about: incoming?.about || "",
    ticketPrice: incoming?.ticketPrice || "",
    applicationPeriod: incoming?.applicationPeriod || "",
    seats: incoming?.seats || "",
    imageUrl: incoming?.imageUrl || "",
  });

  // restoring the img name display if an image was already uploaded
  const [imageName, setImageName] = useState(incoming?.imageUrl ? "Previously uploaded" : "");

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 8);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category],
    }));
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

      if (!response.ok) throw new Error("Upload failed");

      const data = await response.json();

      if (!data.imageUrl) throw new Error("No image URL returned");

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

    if (formData.categories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

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

        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Categories</label>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {visibleCategories.map((category) => {
              const isSelected = formData.categories.includes(category);

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleCategory(category)}
                  style={{
                    padding: "10px",
                    borderRadius: "20px",
                    border: "2px solid var(--passionfruit)",
                    background: isSelected ? "var(--passionfruit)" : "var(--coconut-milk)",
                    color: isSelected ? "var(--coconut-milk)" : "var(--text-dark)",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowAllCategories(!showAllCategories)}
            style={{
              marginTop: "12px",
              background: "none",
              border: "none",
              color: "var(--coconut-milk)",
              fontWeight: "700",
              cursor: "pointer",
              alignSelf: "center",
            }}
          >
            {showAllCategories ? "Show Less" : "Show More"}
          </button>
        </div>

        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Date</label>

          <input
            required
            type="date"
            name="date"
            className="bordered-input"
            value={formData.date}
            onChange={handleChange}
          />
        </div>

        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Start Time</label>

          <input
            required
            type="time"
            name="time"
            className="bordered-input"
            value={formData.time}
            onChange={handleChange}
          />
        </div>

        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop End Time</label>

          <input
            required
            type="time"
            name="endTime"
            className="bordered-input"
            value={formData.endTime}
            onChange={handleChange}
          />
        </div>

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

        <div className="bordered-input-group">
          <label className="bordered-input-label">Ticket Price</label>

          <input
            required
            type="number"
            min="0"
            name="ticketPrice"
            className="bordered-input"
            placeholder="Enter Price"
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </div>

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
            <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px" }}>{uploadError}</p>
          )}
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

        <button
          type="submit"
          className="btn-preview"
          style={{ marginTop: "20px" }}
          disabled={isUploading}
        >
          View Preview
        </button>
      </form>

      <NavBar />
    </div>
  );
};

export default HostWorkshopForm;