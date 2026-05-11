import { FaLocationDot } from "react-icons/fa6";

type Event = {
  title: string;
  instructor: string;
  time: string;
  image: string;
  category: string;
  location?: string;
  date?: string;
  hostedBy?: {
    _id: string;
    name: string;
    profilePicture: string | null;
  };
};

function FeaturedEventCard({ event }: { event: Event }) {
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
        src={event.image}
        alt={event.title}
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
        {event.title}
      </h3>

      <p style={{ color: "pink", fontSize: "16px", margin: "0 0 8px" }}>
        {event.date || "Friday, August 8"} | {event.time}
      </p>

      <p style={{ fontSize: "16px", margin: "4px 0" }}>
        <FaLocationDot style={{ marginRight: "4px", marginTop: "1px" }} />
        {event.location || "Burnaby, Metro"}
      </p>

      <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "16px", margin: "4px 0" }}>
        {event.hostedBy?.profilePicture ? (
          <img
            src={event.hostedBy.profilePicture}
            alt={event.hostedBy.name}
            className="avatar"
            style={{ width: "24px", height: "24px" }}
          />
        ) : (
          <div className="avatar-placeholder"
            style={{ width: "24px", height: "24px", fontSize: "10px" }}>
            {(event.hostedBy?.name || event.instructor)[0].toUpperCase()}
          </div>
        )}
        <span>{event.hostedBy?.name || event.instructor}</span>
      </div>
    </div>
  );
}

export default FeaturedEventCard;