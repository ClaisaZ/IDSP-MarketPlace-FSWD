import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  posts: {
    _id: string;
    image: string;
    caption: string;
    createdAt: string;
  }[];
  enablePosts: boolean;
  position: string;
};

type Workshop = {
  _id: string;
  name: string;
  imageUrl: string;
};

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [hostedWorkshops, setHostedWorkshops] = useState<Workshop[]>([]);
  const [notLoggedIn, setNotLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
        setUser(null);
        setNotLoggedIn(true);
        return;
        }

        const response = await axios.get("http://localhost:3000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchHosted = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/workshops/mine", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHostedWorkshops(res.data);
      } catch (error) {
        console.error("Failed to fetch hosted workshops:", error);
      }
    };
    fetchHosted();
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
    }
  };
  if (notLoggedIn) {
    return (
      <div className="profile-page">
        <div className="purple-card">
          <h4>You don't have an account yet</h4>
          <p style={{ color: "white", marginBottom: "20px", textAlign:"center"}}>Want to sign up?</p>
          <button className="primary-button" onClick={() => navigate("/signup")}>
            Yes, Sign Up
          </button>
          <button className="primary-button" style={{ marginTop: "10px", background: "var(--dark-purple)" }} onClick={() => navigate("/course")}>
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

        <h2 className="header-title">Posts</h2>
        {user.enablePosts && (
          <div className="posts-grid">
            {user.posts.map((post) => (
              <div key={post._id} className="post-card">
                <img src={post.image} alt={post.caption} className="post-image" />
                <div className="post-overlay">
                  <span className="post-date">
                    {new Date(post.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="post-caption">{post.caption}</p>
              </div>
            ))}
          </div>
        )}

        <div className="section-header-row">
          <h2 className="header-title">Hosted Workshops</h2>
          <button className="btn-dark-purple" onClick={() => navigate("/host")}>
            🎓 Host
          </button>
        </div>
        <div className="posts-grid">
          {hostedWorkshops.map((workshop) => (
            <div
              key={workshop._id}
              className="post-card"
              onClick={() => navigate("/host/preview", { state: workshop })}
            >
              <img
                src={workshop.imageUrl || "https://placehold.co/400x200?text=Workshop"}
                alt={workshop.name}
                className="post-image"
              />
              <button
                className="delete-workshop-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(workshop._id);
                }}
              >
                🗑️
              </button>
              <p className="post-caption">{workshop.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
