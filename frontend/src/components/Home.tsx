import { useState } from "react";
import EventCard from "./EventCard";
import EventCategoryChips from "./EventCategoryChips";
import FeaturedEventsCarousel from "./FeaturedEventsCarousel";
import HomeSearchBar from "./HomeSearchBar";
import NavBar from "./navbar";

// bot hosts --> static bot users used showcasing workshop on homepages
const mockHosts = [
  { _id: "host1", name: "Alex Rivera", profilePicture: null },
  { _id: "host2", name: "Jordan Kim", profilePicture: null },
  { _id: "host3", name: "Taylor Brooks", profilePicture: null },
  { _id: "host4", name: "Morgan Lee", profilePicture: null },
];

// Review comment --> randomly sampled when generating reviews
const reviewComments = [
  "Absolutely loved this workshop, learned so much!",
  "Great instructor, very knowledgeable and engaging.",
  "Good content but felt a bit rushed at the end.",
  "Would definitely attend again, highly recommended!",
  "Very well organized and the material was clear.",
  "Exceeded my expectations, worth every penny.",
  "Decent workshop but could use more hands-on activities.",
  "The host was fantastic and answered all questions.",
  "Really practical skills I can apply right away.",
  "Amazing experience, met great people too!",
  "Good intro but could go deeper on advanced topics.",
  "Very professional setup and great energy in the room.",
  "Learned more in 2 hours than I did in weeks of self-study.",
  "Some parts were slow but overall a solid workshop.",
  "The host really knows their stuff, very impressive.",
];

const reviewerNames = [
  "Sarah M",
  "James T",
  "Linda K",
  "Carlos R",
  "Priya S",
  "Tom W",
  "Amy Z",
  "Kevin B",
  "Nina P",
  "David H",
  "Emma C",
  "Ryan F",
  "Sophie L",
  "Marcus J",
  "Claire N",
];

// Generating a random array of reviews with varied ratings (1-5 stars)
const generateReviews = (count: number) => {
  const reviews = [];
  for (let i = 0; i < count; i++) {
    reviews.push({
      name: reviewerNames[i % reviewerNames.length],
      comment: reviewComments[i % reviewComments.length],
      rating: Math.floor(Math.random() * 5) + 1, // 1-5 stars
    });
  }
  return reviews;
};

// Generating a random array of attendees with initials-based avatars
const generateAttendees = (count: number) => {
  const attendees = [];
  for (let i = 0; i < count; i++) {
    attendees.push({
      _id: `attendee-${i}`,
      name: reviewerNames[i % reviewerNames.length],
      profilePicture: null,
    });
  }
  return attendees;
};

// TODO: Replace with real API call to GET /api/workshops when backend is ready
const sampleEvents = [
  {
    title: "Design Fundamentals Workshop",
    name: "Design Fundamentals Workshop",
    instructor: mockHosts[0].name,
    time: "10:00AM - 12:00PM",
    date: "June 5, 2026",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=400&q=80",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    category: "Design",
    location: "123 Granville St, Vancouver",
    about:
      "A hands-on introduction to design principles including typography, color theory, and layout. Perfect for beginners and those looking to sharpen their eye for design.",
    ticketPrice: "$45",
    applicationPeriod: "May 1, 2026 - May 30, 2026",
    seats: "40",
    hostedBy: mockHosts[0],
    attendees: generateAttendees(28),
    reviews: generateReviews(42),
  },
  {
    title: "Marketing Strategy Masterclass",
    name: "Marketing Strategy Masterclass",
    instructor: mockHosts[1].name,
    time: "1:00PM - 3:30PM",
    date: "June 12, 2026",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    category: "Marketing",
    location: "456 Robson St, Vancouver",
    about:
      "Dive deep into modern marketing strategies including social media, content marketing, and data-driven campaigns. Walk away with an actionable marketing plan.",
    ticketPrice: "$60",
    applicationPeriod: "May 10, 2026 - June 5, 2026",
    seats: "35",
    hostedBy: mockHosts[1],
    attendees: generateAttendees(27),
    reviews: generateReviews(67),
  },
  {
    title: "Intro to Web Development",
    name: "Intro to Web Development",
    instructor: mockHosts[2].name,
    time: "9:00AM - 12:00PM",
    date: "June 18, 2026",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    category: "Coding",
    location: "789 Burrard St, Vancouver",
    about:
      "Learn the basics of HTML, CSS, and JavaScript in this beginner-friendly workshop. By the end you will have built your first webpage from scratch.",
    ticketPrice: "$55",
    applicationPeriod: "May 15, 2026 - June 10, 2026",
    seats: "100",
    hostedBy: mockHosts[2],
    attendees: generateAttendees(100),
    reviews: generateReviews(83),
  },
  {
    title: "Advanced React Patterns",
    name: "Advanced React Patterns",
    instructor: mockHosts[3].name,
    time: "2:00PM - 5:00PM",
    date: "June 25, 2026",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=400&q=80",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80",
    category: "Coding",
    location: "321 West Georgia St, Vancouver",
    about:
      "For developers already familiar with React. Covers advanced patterns like compound components, render props, custom hooks, and performance optimization techniques.",
    ticketPrice: "$75",
    applicationPeriod: "May 20, 2026 - June 18, 2026",
    seats: "25",
    hostedBy: mockHosts[3],
    attendees: generateAttendees(25),
    reviews: generateReviews(31),
  },
  {
    title: "UI/UX Design Sprint",
    name: "UI/UX Design Sprint",
    instructor: mockHosts[0].name,
    time: "10:00AM - 4:00PM",
    date: "July 3, 2026",
    image: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=400&q=80",
    imageUrl: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=80",
    category: "UI/UX",
    location: "555 Seymour St, Vancouver",
    about:
      "A full-day intensive workshop where you will go from problem definition to a tested prototype using the Google Design Sprint methodology.",
    ticketPrice: "$90",
    applicationPeriod: "June 1, 2026 - June 25, 2026",
    seats: "20",
    hostedBy: mockHosts[0],
    attendees: generateAttendees(16),
    reviews: generateReviews(55),
  },
];

function Home() {
  const [search, setSearch] = useState("");
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
      <HomeSearchBar value={search} onChange={setSearch} />
      <FeaturedEventsCarousel events={sampleEvents} />

      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Event Categories</h3>
          <span style={{ fontSize: "12px" }}>View All</span>
        </div>
        <EventCategoryChips activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {filteredEvents.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>No events match your search</p>
        ) : (
          filteredEvents.map((event, index) => <EventCard key={`${event.title}-${index}`} event={event} />)
        )}
      </div>
      <NavBar/>
    </div>
  );
}

export default Home;
