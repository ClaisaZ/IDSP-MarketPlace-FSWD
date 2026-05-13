import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavBar from "./navbar";

type User = {
  name: string;
  role: string;
  profilePicture: string | null;
  workshopsAttended: number;
  friends: string[];
  bio: string;
  interests: string[];
  social: {
    instagram: string;
    facebook: string;
  };
  position: string;
};

type Workshop = {
  _id: string;
  name: string;
  imageUrl: string;
  date: string;
  time: string;
  hostedBy: {
    name: string;
    profilePicture: string | null;
  };
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [hostedWorkshops, setHostedWorkshops] = useState<Workshop[]>([]);
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<"registered" | "hosting">("registered");
  const [registeredWorkshops, setRegisteredWorkshops] = useState<Workshop[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUser(null);
        setNotLoggedIn(true);
        return;
      }

      try {
        const [profileRes, workshopsRes] = await Promise.all([
          axios.get("http://localhost:3000/api/profile/me", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:3000/api/workshops/mine", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setUser(profileRes.data);
        setHostedWorkshops(workshopsRes.data);
      } catch (err: unknown) {
        console.error("Failed to fetch profile:", err);

        // Type Guard that safely checks if it's an Axios error
        if (axios.isAxiosError(err)) {
          if (err.response?.status === 401) {
            setNotLoggedIn(true);
          } else {
            // safely accessing err.response.data
            const message = err.response?.data?.error || "Failed to load profile.";
            toast.error(message);
          }
        } else {
          toast.error("An unexpected error occurred.");
        }
      }
    };

    fetchAll();
  }, []);

  useEffect(() => {
    const fetchRegistered = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setUser(null);
          setNotLoggedIn(true);
          return;
        }
        const res = await axios.get("http://localhost:3000/api/workshops/attending", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRegisteredWorkshops(res.data);
      } catch (error) {
        console.error("Failed to fetch registered workshops:", error);
      }
    };
    fetchRegistered();
  }, []);

  const handleDelete = async (workshopId: string) => {
    if (!confirm("Are you sure you want to delete this workshop?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:3000/api/workshops/${workshopId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHostedWorkshops((prev) => prev.filter((w) => w._id !== workshopId));
    } catch (error) {
      console.error("Failed to delete workshop:", error);
      toast.error("Failed to delete workshop. Please try again.");
    }
  };
  if (notLoggedIn) {
    return (
      <div className="profile-page">
        <div className="purple-card">
          <h4>You don't have an account yet</h4>
          <p style={{ color: "white", marginBottom: "20px", textAlign: "center" }}>
            Want to sign up?
          </p>
          <button className="primary-button" onClick={() => navigate("/signup")}>
            Yes, Sign Up
          </button>
          <button
            className="primary-button"
            style={{ marginTop: "10px", background: "var(--dark-purple)" }}
            onClick={() => navigate("/course")}
          >
            No, Go Back
          </button>
        </div>
      </div>
    );
  }
  if (!user) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="screen-header">
        <h2 className="header-title">Profile</h2>
        <div className="header-actions">
          <button
            className="signout-btn"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            🚪 Sign Out
          </button>
          <button className="edit-btn" onClick={() => navigate("/course/profile/edit")}>
            ✏️ Edit
          </button>
        </div>
      </div>
      <div className="profile-info">
        <div className="avatar-wrapper">
          {user.profilePicture ? (
            <img src={user.profilePicture} alt="avatar" className="avatar" />
          ) : (
            <div className="avatar-placeholder">{user.name ? user.name[0].toUpperCase() : "?"}</div>
          )}
        </div>
        <div className="profile-meta">
          <p className="profile-username">@{user.name}</p>
          <p className="profile-role">{user.position}</p>
        </div>
      </div>
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-number">{user.workshopsAttended}</span>
          <span className="stat-label">Workshops attended</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{user.friends.length}</span>
          <span className="stat-label">Friends</span>
        </div>
      </div>
      <div className="purple-card">
        <h4>About me</h4>
        <p className="about-bio">{user.bio}</p>
        <p className="interests-title">Interests</p>
        <div className="interests-list">
          {user.interests.map((interest) => (
            <span key={interest} className="interest-tag">
              {interest}
            </span>
          ))}
        </div>
      </div>
      <div className="posts-section">
        {(user.social?.instagram || user.social?.facebook) && (
          <div className="contact-section">
            <h2 className="header-title">Contact Me</h2>
            <div className="social-links">
              {user.social?.instagram && (
                <a href={user.social.instagram} target="_blank">
                  <img src="https://cdn.simpleicons.org/instagram/E4405F" className="social-icon" />
                </a>
              )}
              {user.social?.facebook && (
                <a href={user.social.facebook} target="_blank">
                  <img src="https://cdn.simpleicons.org/facebook/1877F2" className="social-icon" />
                </a>
              )}
            </div>
          </div>
        )}

        <div className="workshops-section">
          <h2 className="header-title">Workshops</h2>

          <div className="workshop-tabs">
            <button
              className={`workshop-tab ${activeTab === "registered" ? "workshop-tab--active" : ""}`}
              onClick={() => setActiveTab("registered")}
            >
              Registered
            </button>
            <button
              className={`workshop-tab ${activeTab === "hosting" ? "workshop-tab--active" : ""}`}
              onClick={() => setActiveTab("hosting")}
            >
              Hosting
            </button>
          </div>

          <div className="workshop-list">
            {activeTab === "hosting" &&
              hostedWorkshops.map((workshop) => (
                <div
                  key={workshop._id}
                  className="workshop-card"
                  onClick={() => navigate("/host/preview", { state: workshop })}
                >
                  <img
                    src={workshop.imageUrl || "https://placehold.co/400x200?text=Workshop"}
                    alt={workshop.name}
                    className="workshop-thumbnail"
                  />
                  <div className="workshop-info">
                    <p className="workshop-name">{workshop.name}</p>
                    <div className="workshop-host">
                      <div
                        className="avatar-placeholder"
                        style={{ width: "20px", height: "20px", fontSize: "10px" }}
                      >
                        {workshop.hostedBy?.name[0].toUpperCase()}
                      </div>
                      <span>{workshop.hostedBy?.name}</span>
                    </div>
                    <div style={{ fontSize: "12px", opacity: 0.85 }}>
                      <p style={{ margin: 0 }}>📅 {workshop.date}</p>
                      <p style={{ margin: 0 }}>🕐 {workshop.time}</p>
                    </div>
                  </div>
                  <button
                    className="delete-workshop-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(workshop._id);
                    }}
                  >
                    🗑️
                  </button>
                </div>
              ))}

            {activeTab === "registered" &&
              (registeredWorkshops.length === 0 ? (
                <p style={{ color: "var(--text-gray)", textAlign: "center", marginTop: "20px" }}>
                  No registered workshops yet
                </p>
              ) : (
                registeredWorkshops.map((workshop) => (
                  <div
                    key={workshop._id}
                    className="workshop-card"
                    onClick={() => navigate("/host/preview", { state: workshop })}
                  >
                    <img
                      src={workshop.imageUrl || "https://placehold.co/400x200?text=Workshop"}
                      alt={workshop.name}
                      className="workshop-thumbnail"
                    />
                    <div className="workshop-info">
                      <p className="workshop-name">{workshop.name}</p>
                      <div className="workshop-host">
                        <div
                          className="avatar-placeholder"
                          style={{ width: "20px", height: "20px", fontSize: "10px" }}
                        >
                          {workshop.hostedBy?.name[0].toUpperCase()}
                        </div>
                        <span>{workshop.hostedBy?.name}</span>
                      </div>
                      <div style={{ fontSize: "12px", opacity: 0.85 }}>
                        <p style={{ margin: 0 }}>📅 {workshop.date}</p>
                        <p style={{ margin: 0 }}>🕐 {workshop.time}</p>
                      </div>
                    </div>
                    <button
                      className="delete-workshop-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(workshop._id);
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ))}
          </div>

          <button
            className="btn-dark-purple"
            onClick={() => navigate("/host")}
            style={{ marginTop: "16px", width: "100%" }}
          >
            🎓 Host a Workshop
          </button>
        </div>
      </div>
      <NavBar />
    </div>
  );
}
