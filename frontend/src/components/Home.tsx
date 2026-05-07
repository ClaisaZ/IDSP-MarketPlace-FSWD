import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import EventCategoryChips from "./EventCategoryChips";
import HomeSearchBar from "./HomeSearchBar";
import FeaturedEventsCarousel from "./FeaturedEventsCarousel";

function Home() {
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    const sampleEvents = [
        {
            title: "Design Workshop With Our Special Guest X.",
            instructor: "Spooderman",
            time: "12:00PM - 2:00PM",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
            category: "Design",
        },
        {
            title: "Marketing Workshop With Our Special Guest X.",
            instructor: "Spooderman",
            time: "12:00PM - 2:00PM",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
            category: "Marketing",
        },
        {
            title: "Coding Workshop With Our Special Guest X.",
            instructor: "Spooderman",
            time: "12:00PM - 2:00PM",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
            category: "Coding",
        },
        {
            title: "Coding Workshop With Our Special Guest X.",
            instructor: "Spooderman",
            time: "12:00PM - 2:00PM",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
            category: "Coding",
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
                maxWidth: "500px",
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
            <FeaturedEventsCarousel events={sampleEvents} />

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
                    <p style={{ textAlign: "center", marginTop: "20px" }}>No events match your search</p>
                ) : (
                    filteredEvents.map((event) => <EventCard key={event.title} event={event} />)
                )}
            </div>
            <button
                className="btn-dark-purple"
                onClick={() =>
                    navigate("/host/preview", {
                        state: {
                            _id: "69fb8f6db6f62a3e9b79069b",
                            name: "sss",
                            date: "March 30th 2027",
                            time: "12pm to 3pm",
                            location: "Burnaby",
                            about: "asdasdas",
                            ticketPrice: "50",
                            applicationPeriod: "2 months",
                            seats: "222",
                            hostedBy: "69f8f00fe8ee06ed062afa0f",
                        },
                    })
                }
            >
                Test Workshop (remove me)
            </button>
        </div>
    );
}

export default Home;
