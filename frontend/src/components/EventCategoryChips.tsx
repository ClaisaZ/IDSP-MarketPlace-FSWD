const categories = ["Design", "Coding", "Marketing", "UI/UX"];

function EventCategoryChips({
    activeCategory,
    onSelectCategory,
}: {
    activeCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}) {
    return (
        <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
            {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(isActive ? null : category)}
                        style={{
                            padding: "6px 12px",
                            borderRadius: "20px",
                            border: "none",
                            transition: "all 0.15s ease",
                            background: isActive
                                ? "var(--mangosteen)"
                                : "var(--passionfruit)",
                            color: isActive ? "black" : "white",
                            cursor: "pointer"
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