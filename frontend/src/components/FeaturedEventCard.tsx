import { FaLocationDot } from "react-icons/fa6";

type Event = {
  _id?: string;
  name?: string;
  time: string;
  image?: string;
  imageUrl?: string;
  category?: string;
  categories?: string[];
  location?: string;
  date?: string;
  hostedBy?: {
    _id: string;
    name: string;
    profilePicture: string | null;
  };
};

function FeaturedEventCard({ event }: { event: Event }) {
  const displayName = event.hostedBy?.name || "Unknown Host";

  return (
    <div
      style={{
        width: "300px",
        height: "440px",
        background: "black",
        borderRadius: "10px",
        padding: "7px",
        color: "white",
        overflow: "hidden",
      }}
    >
      <img
        src={event.imageUrl || event.image}
        alt={event.name}
        onError={(e) => {
          e.currentTarget.src = "https://placehold.co/400x250/3d0878/ffffff?text=Featured";
        }}
        style={{
          width: "100%",
          height: "250px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <h3
        style={{
          fontSize: "30px",
          fontWeight: "500",
          margin: "8px 0 4px",
          lineHeight: "1.1",
        }}
      >
        {event.name}
      </h3>

      <p style={{ color: "pink", fontSize: "16px", margin: "0 0 8px" }}>
        {event.date || "Friday, August 8"} | {event.time}
      </p>

      <p style={{ fontSize: "16px", margin: "4px 0" }}>
        <FaLocationDot style={{ marginRight: "4px", marginTop: "1px" }} />
        {event.location || "Vancouver"}
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "16px",
          margin: "4px 0",
        }}
      >
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
              backgroundColor: "#1a237e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
        <span>{displayName}</span>
      </div>
    </div>
  );
}

export default FeaturedEventCard;
