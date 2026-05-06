import EventCard from "./EventCard";
import HomeSearchBar from "./HomeSearchBar";
import EventCategoryChips from "./EventCategoryChips";

const sampleEvents = [
    {
        title: "Design Workshop With Our Special Guest X.",
        instructor: "Spooderman",
        time: "12:00PM - 2:00PM",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
    },
];

function Home() {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "390px",
                margin: "0 auto",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                gap: "16px",
            }}
        >
            {/* Search Bar */}
            <HomeSearchBar />

            {/* Featured Events */}
            <div>
                <h3 style={{ marginBottom: "10px" }}>Featured Events</h3>

                {/* Placeholder for carousel */}
                <div
                    className="purple-card"
                    style={{
                        height: "200px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    Carousel Coming Soon
                </div>
            </div>

            {/* Categories */}
            <div>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <h3>Event Categories</h3>
                    <span style={{ fontSize: "12px" }}>View All</span>
                </div>

                <EventCategoryChips />
            </div>

            {/* Event Card */}
            <div className="purple-card" style={{ display: "flex", gap: "10px" }}>
                <div
                    style={{
                        width: "100px",
                        height: "100px",
                        background: "#ccc",
                        borderRadius: "10px",
                    }}
                />

                <div style={{ flex: 1 }}>
                    {sampleEvents.map((event) => (
                        <EventCard key={event.title} event={event} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;