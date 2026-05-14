import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventCategoryChips from "./EventCategoryChips";
import FeaturedEventsCarousel from "./FeaturedEventsCarousel";
import HomeSearchBar from "./HomeSearchBar";
import NavBar from "./navbar";

type Workshop = {
  _id: string;
  name?: string;
  title?: string;
  instructor?: string;
  time: string;
  date?: string;
  image?: string;
  imageUrl?: string;
  category?: string;
  categories?: string[];
  location?: string;
  about?: string;
  ticketPrice?: string;
  applicationPeriod?: string;
  seats?: string;
  hostedBy?: { _id: string; name: string; profilePicture: string | null };
  attendees?: { _id: string; name: string; profilePicture: string | null }[];
  reviews?: { name: string; comment: string; rating: number }[];
};

function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [events, setEvents] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/workshops", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvents(Array.isArray(data) ? data : []);
      })
      .catch(() => console.error("Failed to fetch workshops"))
      .finally(() => setLoading(false));
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearch = (event.name || event.title || "")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      !activeCategory ||
      event.category === activeCategory ||
      event.categories?.includes(activeCategory);
    return matchesSearch && matchesCategory;
  });

  // Use first 5 events for the featured carousel
  const featuredEvents = events.slice(0, 5);

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
      <HomeSearchBar value={search} onChange={setSearch} />
      <h3
        style={{
          margin: "0",
          marginTop: "4px",
          fontSize: "24px",
          fontWeight: "700",
          color: "var(--text-dark)",
          textAlign: "left",
        }}
      >
        Featured Workshops
      </h3>

      {/* Carousel only renders once we have real data */}
      {featuredEvents.length > 0 && <FeaturedEventsCarousel events={featuredEvents} />}

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Event Categories</h3>
          <span style={{ fontSize: "12px" }}>View All</span>
        </div>
        <EventCategoryChips activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>Loading events...</p>
        ) : filteredEvents.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No events match your search</p>
        ) : (
          filteredEvents.map((event, index) => <EventCard key={event._id || index} event={event} />)
        )}
      </div>

      <NavBar />
    </div>
  );
}

export default Home;
