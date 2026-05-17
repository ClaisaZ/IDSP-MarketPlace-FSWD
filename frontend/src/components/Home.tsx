import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import EventCategoryChips from "./EventCategoryChips";
import FeaturedEventsCarousel from "./FeaturedEventsCarousel";
import HomeSearchBar from "./HomeSearchBar";
import NavBar from "./navbar";
import FilterModal from "./FilterModal";

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
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    date: "",
    minPrice: 0,
    maxPrice: 200,
  });

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
  const matchesSearch = (event.name || "").toLowerCase().includes(search.toLowerCase());

  const matchesCategory = !activeCategory || 
    event.category === activeCategory || 
    event.categories?.includes(activeCategory);

  const matchesLocation = !filters.location || 
    (event.location || "").toLowerCase().includes(filters.location.toLowerCase());
  
  const matchesDate = !filters.date || (() => {
  if (!event.date) return false;
  
  // Split the date string to avoid timezone issues
  const [year, month, day] = filters.date.split("-").map(Number);
  const filterDate = new Date(year, month - 1, day); // month is 0-indexed
  const filterFormatted = filterDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
  
  return event.date === filterFormatted;
  })();
  
  const price = parseFloat((event.ticketPrice || "0").replace(/[^0-9.]/g, ""));
  const matchesPrice = price >= filters.minPrice && price <= filters.maxPrice;
  return matchesSearch && matchesCategory && matchesLocation && matchesDate && matchesPrice;
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
      <HomeSearchBar value={search} onChange={setSearch} onFilterClick={() => setShowFilter(true)} />
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
      {showFilter && (
      <FilterModal
        onClose={() => setShowFilter(false)}
        onApply={(f) => setFilters(f)}
        initialValues={filters}
      />
      )}
      <NavBar />
    </div>
  );
}

export default Home;
