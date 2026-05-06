import EventCard from "./EventCard";
import HomeSearchBar from "./HomeSearchBar";
import EventCategoryChips from "./EventCategoryChips";
import { useState } from "react";

function Home() {
    const [search, setSearch] = useState("");

    const sampleEvents = [
        {
            title: "Design Workshop With Our Special Guest X.",
            instructor: "Spooderman",
            time: "12:00PM - 2:00PM",
            image:
                "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
            category: "Design"
        },
    ];

    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredEvents = sampleEvents.filter((event) => {
        const matchesSearch = event.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = !activeCategory || event.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

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
            <HomeSearchBar value={search} onChange={setSearch} />

            {/* Featured Events */}
            <div>
                <h3 style={{ marginBottom: "10px" }}>Featured Events</h3>

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

                <EventCategoryChips activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            </div>

            {/* Event Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {filteredEvents.length === 0 ? (
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                        No events match your search
                    </p>
                ) : (
                    filteredEvents.map((event) => (
                        <EventCard key={event.title} event={event} />
                    ))
                )}
            </div>
        </div>
    );
}

export default Home;