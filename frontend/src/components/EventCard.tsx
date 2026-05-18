import { FaRegCalendarAlt } from "react-icons/fa";
import { IoTimeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

type Event = {
  _id?: string;
  name?: string;
  time: string;
  image?: string;
  imageUrl?: string;
  category?: string;
  categories?: string[];
  // Need to change category to categories = string[] later just added ? to prevent errors while trying new system
  date?: string;
  hostedBy?: {
    _id: string;
    name: string;
    profilePicture: string | null;
  };
};

function EventCard({ event }: { event: Event }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    const token = localStorage.getItem("token");
    let currentUserId = null;

    if (token) {
      try {
        currentUserId = JSON.parse(atob(token.split(".")[1])).id;
      } catch (e) {
        console.error("Invalid or malformed token", e);
      }
    }

    const hostId = typeof event.hostedBy === "object" ? event.hostedBy?._id : event.hostedBy;
    const isOwner = currentUserId && hostId && hostId === currentUserId;

    navigate(isOwner ? "/host/preview" : "/workshop/preview", {
      state: { ...event },
    });
  };

  const displayName = event.hostedBy?.name || "Unknown Host";

  return (
    <div
      onClick={handleNavigate}
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: "8px",
        background: "var(--primary-purple)",
        borderRadius: "10px",
        padding: "8px",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 6px 14px rgba(0,0,0,0.22)",
      }}
    >
      <img
        src={event.imageUrl || event.image}
        alt={event.name}
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/120x120/3d0878/ffffff?text=Workshop";
        }}
        style={{
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <h4 style={{ margin: 0, fontSize: "14px", lineHeight: "1.2", fontWeight: "700" }}>
          {event.name}
        </h4>

        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {event.hostedBy?.profilePicture ? (
            <img
              src={event.hostedBy.profilePicture}
              alt={displayName}
              className="avatar"
              style={{ width: "24px", height: "24px", borderRadius: "50%", objectFit: "cover" }}
            />
          ) : (
            <div
              className="avatar-placeholder"
              style={{
                width: "24px",
                height: "24px",
                fontSize: "10px",
                borderRadius: "50%",
                backgroundColor: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
          <p style={{ margin: 0, fontSize: "12px", fontWeight: "600" }}>{displayName}</p>
        </div>

        <p style={{ margin: 0, fontSize: "12px" }}>
          <FaRegCalendarAlt style={{ marginRight: "6px", transform: "translateY(1px)" }} />
          {event.date || "Sunday, May 28"}
        </p>

        <p style={{ margin: 0, fontSize: "12px" }}>
          <IoTimeOutline style={{ marginRight: "3px", transform: "translateY(1px)" }} />{" "}
          {event.time}
        </p>

        <button
          className="primary-button"
          onClick={(e) => {
            e.stopPropagation();
            handleNavigate();
          }}
          style={{
            alignSelf: "flex-end",
            padding: "5px 12px",
            fontSize: "12px",
            marginTop: "auto",
            backgroundColor: "white",
            color: "var(--primary-purple)",
            border: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          See More
        </button>
      </div>
    </div>
  );
}

export default EventCard;
