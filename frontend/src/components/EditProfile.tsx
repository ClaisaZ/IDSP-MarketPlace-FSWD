import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const INTERESTS = [
  "Design",
  "Creativity",
  "Tech",
  "Math",
  "Marketing",
  "Finance",
  "Fine Art",
  "Writing",
  "Sales",
  "Teaching",
  "Coding",
  "Research",
  "Fashion",
  "Hair",
  "Pottery",
  "Cooking",
  "Photography",
  "Music",
  "Video Editing",
  "Public Speaking",
  "Leadership",
  "UI/UX",
  "Animation",
  "Game Dev",
  "AI",
  "Data Science",
  "Fitness",
  "Nutrition",
  "Languages",
  "Entrepreneurship",
];

export default function EditProfile() {
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    position: "",
    instagram: "",
    facebook: "",
    interests: [] as string[],
    enablePosts: false,
    profilePicture: "",
  });

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/profile/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const user = response.data;
        setFormData({
          name: user.name || "",
          bio: user.bio || "",
          instagram: user.social?.instagram || "",
          facebook: user.social?.facebook || "",
          interests: user.interests || [],
          enablePosts: user.enablePosts || false,
          profilePicture: user.profilePicture || "",
          position: user.position || "",
        });
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        toast.error("Failed to load profile details.");
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, profilePicture: reader.result as string });
      toast.info("Image preview updated!"); // Instant feedback
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    setIsSaving(true);

    // Using toast.promise to handle the loading, success, and error states elegantly
    toast.promise(
      axios.post(
        "http://localhost:3000/api/profile/update",
        {
          ...formData,
          social: {
            instagram: formData.instagram,
            facebook: formData.facebook,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      ),
      {
        loading: "Saving your changes...",
        success: () => {
          setIsSaving(false);
          navigate("/course/profile");
          return "Profile updated successfully!";
        },
        error: (err) => {
          setIsSaving(false);
          return err.response?.data?.message || "Failed to save profile.";
        },
      },
    );
  };

  return (
    <div className="profile-page">
      <div className="screen-header">
        <button className="back-btn" onClick={() => navigate("/course/profile")}>
          ←
        </button>
        <h2 className="header-title">Edit Profile</h2>
      </div>

      <div className="purple-card">
        <div className="edit-avatar">
          {formData.profilePicture ? (
            <img src={formData.profilePicture} className="avatar" alt="profile" />
          ) : (
            <div className="avatar-placeholder edit-avatar-circle">👤</div>
          )}
          <label className="edit-avatar-label" style={{ cursor: "pointer" }}>
            Upload Profile Image
            <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
          </label>
        </div>

        <div className="input-group">
          <label className="input-label">User Name</label>
          <input
            type="text"
            className="text-input"
            placeholder="@username"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Position / Job Title</label>
          <input
            type="text"
            className="text-input"
            placeholder="e.g. Full Stack Developer"
            value={formData.position}
            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Describe Yourself</label>
          <input
            type="text"
            className="text-input"
            placeholder="A short bio..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Instagram Link</label>
          <input
            type="text"
            className="text-input"
            placeholder="https://instagram.com/username"
            value={formData.instagram}
            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Facebook Link</label>
          <input
            type="text"
            className="text-input"
            placeholder="https://facebook.com/username"
            value={formData.facebook}
            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label className="input-label">Choose Interests</label>
          <div className="interests-list">
            {INTERESTS.map((interest) => (
              <span
                key={interest}
                className={`interest-tag ${formData.interests.includes(interest) ? "interest-tag--selected" : ""}`}
                onClick={() => {
                  const already = formData.interests.includes(interest);
                  setFormData({
                    ...formData,
                    interests: already
                      ? formData.interests.filter((i) => i !== interest)
                      : [...formData.interests, interest],
                  });
                }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        <div className="enable-posts-row">
          <label className="input-label">Enable Posts</label>
          <input
            type="checkbox"
            checked={formData.enablePosts}
            onChange={(e) => setFormData({ ...formData, enablePosts: e.target.checked })}
          />
        </div>
      </div>

      <button className="primary-button" style={{ marginTop: "20px" }} onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Profile"}
      </button>
    </div>
  );
}
