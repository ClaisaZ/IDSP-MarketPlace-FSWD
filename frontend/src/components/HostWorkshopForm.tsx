import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavBar from "./navbar";

// data collected by the form, passed to preview and eventually the backend.
type WorkshopFormData = {
  name: string;
  categories: string[];
  date: string;
  time: string;
  endTime: string;
  location: string;
  about: string;
  ticketPrice: string;
  applicationPeriodStart: string;
  applicationPeriodEnd: string;
  seats: string;
  imageUrl: string;
  hostedBy?: string;
};

// Master list of selectable skill tags a host can attach to their workshop.
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

  // Tracks whether the image is mid-upload so the UI can show a spinner and block submission.
  const [isUploading, setIsUploading] = useState(false);
  // Holds any image upload error message to display beneath the upload zone.
  const [uploadError, setUploadError] = useState("");
  // Toggles the category grid between showing 8 items and the full list.
  const [showAllCategories, setShowAllCategories] = useState(false);
  // Pre-fills the form if the user navigated back from the preview screen to make edits.
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
    applicationPeriodStart: incoming?.applicationPeriodStart || "",
    applicationPeriodEnd: incoming?.applicationPeriodEnd || "",
    seats: incoming?.seats || "",
    imageUrl: incoming?.imageUrl || "",
  });

  // Stores the local object URL so the chosen image renders as a preview before the upload finishes.
  const [imagePreview, setImagePreview] = useState<string>(incoming?.imageUrl || "");

  const visibleCategories = showAllCategories ? categories : categories.slice(0, 8);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Adds a category to the selection if absent, or removes it if already chosen.
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
    setImagePreview(URL.createObjectURL(file));
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

      setFormData((prev) => ({ ...prev, imageUrl: data.imageUrl }));
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploadError("Image upload failed. Please try again.");
      toast.error("Image upload failed. Please try again.");
      setImagePreview("");
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || isUploading) return;
    const dt = new DataTransfer();
    dt.items.add(file);
    if (fileInputRef.current) {
      fileInputRef.current.files = dt.files;
      fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
    }
  };

  const handlePreview = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.categories.length === 0) {
      toast.error("Please select at least one category.");
      return;
    }

    if (!formData.applicationPeriodStart || !formData.applicationPeriodEnd) {
      toast.error("Please set both application period dates.");
      return;
    }

    if (formData.applicationPeriodEnd < formData.applicationPeriodStart) {
      toast.error("Closing date can't be before the opening date.");
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

      navigate("/host/preview", {
        state: { ...formData, hostedBy: decoded.id },
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

        {/* Categories */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Categories</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
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

        {/* Date */}
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

        {/* Start Time */}
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

        {/* End Time */}
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

        {/* Location */}
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

        {/* About */}
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
            type="number"
            min="0"
            name="ticketPrice"
            className="bordered-input"
            placeholder="Enter Price"
            value={formData.ticketPrice}
            onChange={handleChange}
          />
        </div>

        {/* Application Period — Opens */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Application Period — Opens</label>
          <input
            required
            type="date"
            name="applicationPeriodStart"
            className="bordered-input"
            value={formData.applicationPeriodStart}
            onChange={handleChange}
          />
        </div>

        {/* Application Period — Closes */}
        <div className="bordered-input-group">
          <label className="bordered-input-label">Application Period — Closes</label>
          <input
            required
            type="date"
            name="applicationPeriodEnd"
            className="bordered-input"
            value={formData.applicationPeriodEnd}
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
        <div className="bordered-input-group">
          <label className="bordered-input-label">Workshop Cover Image</label>

          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div
            className={`upload-zone${imagePreview ? " upload-zone--filled" : ""}`}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            {imagePreview ? (
              <>
                <img
                  src={imagePreview}
                  alt="Workshop cover preview"
                  className="upload-zone__preview"
                />
                {!isUploading && (
                  <div className="upload-zone__overlay">
                    <span className="upload-zone__overlay-icon">📷</span>
                    <span className="upload-zone__overlay-label">Change image</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="upload-zone__icon-wrap">
                  <span style={{ fontSize: "24px" }}>🖼️</span>
                </div>
                <p className="upload-zone__title">Click to upload</p>
                <p className="upload-zone__subtitle">or drag and drop your file here</p>
                <span className="upload-zone__pill">Browse files</span>
              </>
            )}

            {isUploading && <div className="upload-zone__uploading">Uploading…</div>}
          </div>

          <p className="upload-zone__hint">JPG, PNG or WEBP</p>

          {imagePreview && !isUploading && (
            <button
              type="button"
              className="upload-zone__remove"
              onClick={() => {
                setImagePreview("");
                setFormData((prev) => ({ ...prev, imageUrl: "" }));
              }}
            >
              Remove image
            </button>
          )}

          {uploadError && (
            <p style={{ color: "red", fontSize: "0.85rem", marginTop: "4px" }}>{uploadError}</p>
          )}
        </div>

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

      <style>{`
        .upload-zone {
          border: 1.5px dashed var(--passionfruit);
          border-radius: 14px;
          background: var(--coconut-milk);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: 180px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: border-color 0.2s, background 0.2s;
        }
        .upload-zone:hover {
          border-color: var(--dark-purple);
          background: #f0ebff;
        }
        .upload-zone--filled {
          border-style: solid;
          background: transparent;
          padding: 0;
        }
        .upload-zone--filled:hover .upload-zone__overlay {
          opacity: 1;
        }
        .upload-zone__preview {
          width: 100%;
          height: 220px;
          object-fit: cover;
          display: block;
          border-radius: 12px;
        }
        .upload-zone__overlay {
          position: absolute;
          inset: 0;
          background: rgba(38, 33, 92, 0.55);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border-radius: 12px;
          opacity: 0;
          transition: opacity 0.2s;
        }
        .upload-zone__overlay-icon { font-size: 28px; }
        .upload-zone__overlay-label {
          color: white;
          font-weight: 600;
          font-size: 14px;
        }
        .upload-zone__icon-wrap {
          width: 58px;
          height: 58px;
          border-radius: 50%;
          background: #ede8ff;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .upload-zone__title {
          margin: 0;
          font-weight: 700;
          font-size: 15px;
          color: var(--passionfruit);
        }
        .upload-zone__subtitle {
          margin: 0;
          font-size: 13px;
          color: var(--text-gray);
        }
        .upload-zone__pill {
          margin-top: 4px;
          padding: 6px 18px;
          border-radius: 99px;
          border: 1.5px solid var(--passionfruit);
          background: white;
          font-size: 13px;
          font-weight: 600;
          color: var(--passionfruit);
        }
        .upload-zone__uploading {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.85);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-weight: 600;
          font-size: 14px;
          color: var(--passionfruit);
        }
        .upload-zone__hint {
          margin: 6px 0 0;
          font-size: 14px;
          color: black;
        }
        .upload-zone__remove {
          margin-top: 6px;
          background: none;
          border: none;
          color: #c0392b;
          font-size: 16px;
          font-weight: 500;
          cursor: pointer;
          padding: 0;
        }
        .upload-zone__remove:hover { text-decoration: underline; }
      `}</style>
    </div>
  );
};

export default HostWorkshopForm;
