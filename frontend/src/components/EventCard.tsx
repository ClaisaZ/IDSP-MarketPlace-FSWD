import { useNavigate } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
import { CiImageOff } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";


type Event = {
    title: string;
    instructor: string;
    time: string;
    image: string;
    category: string;
    date?: string;
};

function EventCard({ event }: { event: Event }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/course")}
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
                src={event.image}
                alt={event.title}
                style={{
                    width: "120px",
                    height: "120px",
                    objectFit: "cover",
                    borderRadius: "8px",
                }}
            />

            <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                <h4
                    style={{
                        margin: 0,
                        fontSize: "14px",
                        lineHeight: "1.2",
                        fontWeight: "700",
                    }}
                >
                    {event.title}
                </h4>

                <p style={{ margin: 0, fontSize: "12px", fontWeight: "600" }}>
                    <CiImageOff style={{ marginRight: "3px",}}/>  {event.instructor}
                </p>

                <p style={{ margin: 0, fontSize: "12px" }}>
                    <FaRegCalendarAlt style= {{ marginRight: "6px" }}/>
                    {event.date || "Sunday, May 28"}
                </p>

                <p style={{ margin: 0, fontSize: "12px" }}>
                    <IoTimeOutline style= {{ marginRight: "3px" }}/> {event.time}
                </p>

                <button
                    className="primary-button"
                    onClick={(e) => {
                        e.stopPropagation();
                        navigate("/course");
                    }}
                    style={{
                        alignSelf: "flex-end",
                        padding: "5px 12px",
                        fontSize: "12px",
                        marginTop: "auto",
                    }}
                >
                    See More
                </button>
            </div>
        </div>
    );
}

export default EventCard;