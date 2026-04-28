import { useState, useEffect } from "react";
import axios from "axios";

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
    id: string;
    image: string;
    caption: string;
    date: string;
  }[];
};

export default function Profile() {

    const [user, setUser] = useState<User | null>(null);

useEffect(() => {
  const fetchProfile = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profile/69f0c62ed1f804225dc9851d");
      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };
  fetchProfile();
   }, []);

   if (!user) {
    return <div className="profile-page">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="screen-header">
      <h2 className="header-title">Profile</h2>
      <button className="edit-btn">✏️ Edit</button>
      </div>
      <div className="profile-info">
      <div className="avatar-wrapper">
       {user.profilePicture ? (
       <img src={user.profilePicture} alt="avatar" className="avatar" />
        ) : (
       <div className="avatar-placeholder">
        {user.name[0].toUpperCase()}
       </div>
        )}
        </div>
        <div className="profile-meta">
        <p className="profile-username">@{user.name}</p>
        <p className="profile-role">{user.role}</p>
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
        <div className="contact-section">
     <h2 className="header-title">Contact Me</h2>
     <div className="social-links">
       <a href={user.social.instagram} target="_blank"><img src="https://cdn.simpleicons.org/instagram/E4405F" className="social-icon" /></a>
       <a href={user.social.facebook} target="_blank"><img src="https://cdn.simpleicons.org/facebook/1877F2" className="social-icon" /></a>
      </div>
      </div>
     <h2 className="header-title">Posts</h2>
      <div className="posts-grid">
       {user.posts.map((post) => (
       <div key={post.id} className="post-card">
        <img src={post.image} alt={post.caption} className="post-image" />
        <div className="post-overlay">
          <span className="post-date">{post.date}</span>
        </div>
        <p className="post-caption">{post.caption}</p>
      </div>
      ))}
      </div>
     </div>
    </div>
  );
}