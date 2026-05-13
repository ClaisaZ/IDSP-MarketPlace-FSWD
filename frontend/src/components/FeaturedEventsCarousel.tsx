import { useRef, useState } from "react";
import FeaturedEventCard from "./FeaturedEventCard";

type Event = {
  _id?: string;
  name?: string;
  time: string;
  image?: string;
  imageUrl?: string;
  category: string;
  location?: string;
  date?: string;
  hostedBy?: {
    _id: string;
    name: string;
    profilePicture: string | null;
  };
};

function FeaturedEventsCarousel({ events }: { events: Event[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const centerCard = (card: HTMLDivElement) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    container.scrollTo({
      left: card.offsetLeft - container.clientWidth / 2 + card.clientWidth / 2,
      behavior: "smooth",
    });
  };

  return (
    <div
      style={{ position: "relative", overflow: "hidden", width: "100%" }}
      onClick={(e) => {
        if (!scrollRef.current) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const isLeftSide = clickX < rect.width / 2;
        scrollRef.current.scrollBy({
          left: isLeftSide ? -120 : 120,
          behavior: "smooth",
        });
      }}
    >
      <div
        ref={scrollRef}
        className="hide-scrollbar"
        style={{
          display: "flex",
          gap: "15px",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "12px 45px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollBehavior: "smooth",
        }}
      >
        {events.map((event, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              // 👇 Updated safe key handling right here!
              key={event._id || event.name || index}
              onMouseEnter={(e) => {
                setActiveIndex(index);
                centerCard(e.currentTarget);
              }}
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex(index);
                centerCard(e.currentTarget);
              }}
              onTouchStart={(e) => {
                setActiveIndex(index);
                centerCard(e.currentTarget);
              }}
              style={{
                minWidth: "280px",
                transform: isActive ? "scale(1.05)" : "scale(0.9)",
                opacity: isActive ? 1 : 0.7,
                zIndex: isActive ? 5 : 1,
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
            >
              <FeaturedEventCard event={event} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FeaturedEventsCarousel;
