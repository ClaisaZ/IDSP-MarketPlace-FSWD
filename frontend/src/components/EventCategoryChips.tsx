import { useState } from "react";

const categories = ["Design", "Coding", "Marketing", "UI/UX"];

function EventCategoryChips() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            {categories.map((category) => {
                const isActive = active === category;

                return (
                    <button
                        key={category}
                        onClick={() =>
                            setActive(active === category ? null : category) 
                        }
                        style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            border: "none",
                            cursor: "pointer",
                            transition: "all 0.15s ease",
                            background: isActive ? "#facc15" : "#46148c", 
                            color: isActive ? "black" : "white",
                            transform: isActive ? "scale(0.95)" : "scale(1)",
                        }}
                    >
                        {category}
                    </button>
                );
            })}
        </div>
    );
}

export default EventCategoryChips;