import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import NavBar from "./navbar";

type Review = {
  name: string;
  comment: string;
  rating: number;
};

type Attendee = {
  _id: string;
  name: string;
  profilePicture: string | null;
};

type Host = {
  _id: string;
  name: string;
  profilePicture: string | null;
};

const WorkshopPreview: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currentUser, setCurrentUser] = useState<Host | null>(null);

  // Initialize data from navigation state.
  const data = location.state || {
    name: "Pottery and Sculpting Basics",
    date: "May 20, 2026",
    time: "10:00 AM - 11:35 AM",
    location: "33 W 8th Ave, Vancouver",
    about:
      "This workshop will cover the fundamental techniques of pottery and sculpting. Participants will learn hand-building methods such as pinch pots, coiling, and slab construction...",
    ticketPrice: "$50",
    applicationPeriod: "March 20, 2026 - April 27, 2026",
    seats: "35",
  };

  const [workshopData, setWorkshopData] = useState(data);
  const token = localStorage.getItem("token");

  // Decodes the JWT to identify the logged-in user for ownership and permission checks.
  const currentUserId = token ? JSON.parse(atob(token.split(".")[1])).id : null;

  // Verifies if the current user is the host by comparing IDs, handling both string and object formats.
  const isOwner =
    workshopData.hostedBy &&
    currentUserId &&
    (typeof workshopData.hostedBy === "object" ? workshopData.hostedBy._id : workshopData.hostedBy).toString() ===
      currentUserId;

  // Synchronizes the component with the backend to ensure reviews and attendee lists are current.
  useEffect(() => {
    let isMounted = true;
    const fetchWorkshop = async () => {
      if (!data._id) return;
      try {
        const res = await fetch(`http://localhost:3000/api/workshops/${data._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fresh = await res.json();

        // Only updating state if the user hasn't navigated away from the component.
        if (isMounted) setWorkshopData(fresh);
      } catch (err) {
        console.error("Workshop fetch failed", err);
      }
    };

    fetchWorkshop();
    // Cleanup - prevents memory leaks by stopping state updates on unmounted components.
    return () => {
      isMounted = false;
    };
  }, [data._id, token, location.key]);

  // Fetches the host's profile details specifically for preview mode when data isn't yet in the database.
  useEffect(() => {
    if (typeof workshopData.hostedBy !== "string" || !token) return;

    const fetchCurrentUser = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const user = await res.json();
        setCurrentUser({
          _id: user._id,
          name: user.name,
          profilePicture: user.profilePicture ?? null,
        });
      } catch {
        console.error("Failed to fetch current user");
      }
    };

    fetchCurrentUser();
  }, [workshopData.hostedBy, token]);

  const reviews: Review[] = workshopData.reviews || [];
  const avgRating =
    reviews.length > 0
      ? (reviews.reduce((sum: number, r: Review) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : "0.0";

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 3);
  const attendees: Attendee[] = workshopData.attendees || [];

  // Prioritizes populated host data from the backend, falling back to the current user during preview.
  const host: Host | null = typeof workshopData.hostedBy === "object" ? workshopData.hostedBy : currentUser;

  const totalSeats = parseInt(workshopData.seats) || 0;
  const capacityPercent = totalSeats > 0 ? attendees.length / totalSeats : 0;

  // Determines the visual status badge based on how many seats are remaining.
  const getStatusBadge = () => {
    if (capacityPercent >= 1)
      return { label: "Closed", color: "#fee2e2", borderColor: "#ff8b8b", textColor: "#ff8b8b" };
    if (capacityPercent >= 0.9)
      return { label: "Closing", color: "#fee2e2", borderColor: "#ff8b8b", textColor: "#ff8b8b" };
    if (capacityPercent >= 0.75)
      return { label: "Filling", color: "#fef9c3", borderColor: "#eab308", textColor: "#a16207" };
    return { label: "Open", color: "#dff7e2", borderColor: "var(--text-dark)", textColor: "var(--text-dark)" };
  };

  const badge = getStatusBadge();
  const isClosed = capacityPercent >= 1;

  // Submits the new workshop data to the server and redirects the user upon success.
  const handleHost = async () => {
    try {
      await fetch("http://localhost:3000/api/workshops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      setShowModal(false);
      toast.success("Workshop hosted successfully!");
      setTimeout(() => {
        navigate("/course/profile");
      }, 1000);
    } catch {
      toast.error("Failed to host workshop. Try again.");
    }
  };

  const handleAttend = () => {
    navigate("/course/register", { state: { workshopId: workshopData._id } });
  };

  return (
    <div className="host-page-container" style={{ padding: "0 20px 160px 20px" }}>
      <div
        className="screen-header"
        style={{ flexDirection: "row", alignItems: "center", paddingTop: "30px", marginBottom: "15px" }}
      >
        <button
          className="back-button"
          onClick={() => navigate(-1)}
          type="button"
          style={{ color: "var(--text-dark)" }}
        >
          ←
        </button>
        <h2 className="header-title" style={{ margin: 0, fontSize: "2rem" }}>
          Workshop Info
        </h2>
      </div>

      <img
        src={workshopData.imageUrl || "https://placehold.co/800x400?text=Workshop+Image"}
        alt={workshopData.name || "Workshop"}
        className="hero-image"
      />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
        <span
          style={{
            backgroundColor: badge.color,
            color: badge.textColor,
            padding: "6px 20px",
            borderRadius: "20px",
            border: `1px solid ${badge.borderColor}`,
            fontSize: "14px",
            fontWeight: "600",
          }}
        >
          {badge.label}
        </span>
        <span style={{ fontWeight: "600", fontSize: "16px" }}>
          ★ {avgRating} ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
        </span>
      </div>

      <h3 style={{ fontSize: "22px", margin: "0 0 20px 0", color: "var(--text-dark)" }}>{workshopData.name}</h3>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500", marginBottom: "8px" }}>Workshop Host</div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {host?.profilePicture ? (
            <img
              src={host.profilePicture}
              alt={host.name}
              style={{ width: "30px", height: "30px", borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                backgroundColor: "var(--primary-purple)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                fontWeight: "600",
              }}
            >
              {host?.name ? host.name[0].toUpperCase() : "?"}
            </div>
          )}
          <span style={{ fontSize: "14px", color: "var(--text-dark)" }}>{host?.name || "Unknown Host"}</span>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "20px" }}>
        <div>
          <div style={{ fontSize: "16px", fontWeight: "500" }}>Workshop Date</div>
          <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{workshopData.date}</div>
        </div>
        <div>
          <div style={{ fontSize: "16px", fontWeight: "500" }}>Workshop Time</div>
          <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{workshopData.time}</div>
        </div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>Workshop Location</div>
        <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{workshopData.location}</div>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>About This Workshop</div>
        <p style={{ fontSize: "14px", color: "var(--text-dark)", lineHeight: "1.5", margin: "5px 0 0 0" }}>
          {workshopData.about}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>Ticket Price</div>
        <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{workshopData.ticketPrice}</div>
      </div>

      <div style={{ marginBottom: "25px" }}>
        <div style={{ fontSize: "16px", fontWeight: "500" }}>Application Period</div>
        <div style={{ fontSize: "14px", color: "var(--text-dark)" }}>{workshopData.applicationPeriod}</div>
      </div>

      <div
        style={{
          backgroundColor: isClosed ? "#fee2e2" : capacityPercent >= 0.75 ? "#fef9c3" : "#dff7e2",
          border: `2px solid ${isClosed ? "#ff8b8b" : capacityPercent >= 0.75 ? "#eab308" : "#500aa0"}`,
          borderRadius: "12px",
          padding: "20px",
          marginBottom: "20px",
        }}
      >
        <div style={{ fontSize: "18px", fontWeight: "600", marginBottom: "10px" }}>
          Who is attending? ({attendees.length}/{workshopData.seats} Seats)
        </div>
        {attendees.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {attendees.slice(0, 6).map((attendee) => (
              <div
                key={attendee._id}
                style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "10px" }}
              >
                {attendee.profilePicture ? (
                  <img
                    src={attendee.profilePicture}
                    alt={attendee.name}
                    style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
                  />
                ) : (
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      backgroundColor: "var(--dark-purple)",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    {attendee.name ? attendee.name[0].toUpperCase() : "?"}
                  </div>
                )}
                <span style={{ fontSize: "13px", color: "var(--text-dark)" }}>@{attendee.name}</span>
              </div>
            ))}
            {attendees.length > 6 && (
              <div style={{ fontSize: "13px", color: "var(--text-gray)", alignSelf: "center" }}>
                +{attendees.length - 6} more
              </div>
            )}
          </div>
        ) : (
          <p style={{ fontSize: "14px", color: "var(--text-dark)", margin: 0 }}>No attendees yet.</p>
        )}
      </div>

      <div className="bordered-card-white">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div style={{ fontSize: "18px", fontWeight: "600" }}>Reviews ({reviews.length})</div>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--dark-purple)" }}>★ {avgRating}</div>
        </div>
        {reviews.length > 0 ? (
          visibleReviews.map((review: Review, index: number) => (
            <div key={index} className="review-card">
              <div className="review-header">
                <span style={{ fontWeight: "600", fontSize: "14px" }}>{review.name}</span>
                <span style={{ fontSize: "14px", color: "var(--text-gray)" }}>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </span>
              </div>
              <p style={{ fontSize: "14px", color: "var(--text-dark)", margin: 0 }}>{review.comment}</p>
            </div>
          ))
        ) : (
          <p style={{ fontSize: "14px", color: "var(--text-gray)" }}>No reviews yet.</p>
        )}
      </div>

      {reviews.length > 3 && (
        <button
          className="btn-dark-purple"
          style={{ marginBottom: "20px", marginTop: "10px" }}
          onClick={() => setShowAllReviews(!showAllReviews)}
        >
          {showAllReviews ? "Show Less" : `View All ${reviews.length} Reviews`}
        </button>
      )}

      <div className="floating-btn-stack">
        {isOwner ? (
          <>
            <button className="btn-dark-purple" onClick={() => navigate(-1)}>
              Edit Workshop
            </button>
            {!workshopData._id && (
              <button className="btn-dark-purple" onClick={() => setShowModal(true)}>
                Host Workshop
              </button>
            )}
          </>
        ) : isClosed ? (
          <button className="btn-dark-purple" disabled style={{ opacity: 0.5, cursor: "not-allowed" }}>
            Workshop Full
          </button>
        ) : (
          <>
            <button className="btn-dark-purple" onClick={handleAttend}>
              Attend Workshop
            </button>
            <button
              className="btn-dark-purple"
              onClick={() => navigate("/workshop/review", { state: { workshopId: workshopData._id } })}
            >
              Leave a Review
            </button>
          </>
        )}
      </div>

      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 200,
          }}
        >
          <div
            style={{
              backgroundColor: "#fbe9a2",
              borderRadius: "16px",
              padding: "32px 24px",
              width: "80%",
              maxWidth: "320px",
              textAlign: "center",
              border: "2px solid #ccc",
            }}
          >
            <h2 style={{ fontSize: "1.5rem", fontWeight: "800", marginBottom: "24px", color: "#1a1a1a" }}>
              Ready to host this workshop?
            </h2>
            <button className="btn-dark-purple" onClick={handleHost}>
              Yes
            </button>
            <button
              className="btn-dark-purple"
              style={{ marginTop: "12px", backgroundColor: "#3d0878" }}
              onClick={() => setShowModal(false)}
            >
              No
            </button>
          </div>
        </div>
      )}
      <NavBar/>
    </div>
  );
};

export default WorkshopPreview;
