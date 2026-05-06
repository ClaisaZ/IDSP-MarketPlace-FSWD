import { useNavigate } from "react-router-dom";

type Event = {
    title: string;
    instructor: string;
    time: string;
    image: string;
};

function EventCard({ event }: { event: Event }) {
    const navigate = useNavigate();
    return (
        <div className="purple-card" style={{ display: "flex", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/course")}>
            {/* Image */}
            <img
                src={event.image}
                alt={event.title}
                style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "10px",
                    objectFit: "cover",
                }}
            />

            {/* Info */}
            <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0 }}>{event.title}</h4>
                <p style={{ fontSize: "12px" }}>{event.instructor}</p>
                <p style={{ fontSize: "12px" }}>{event.time}</p>

                <button
                    className="primary-button"
                    style={{ marginTop: "10px" }}
                    onClick={() => navigate("/course")}
                >
                See More
                </button>
            </div>
        </div>
    );
}

export default EventCard;