import { IoSearch } from "react-icons/io5";

function HomeSearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div
      style={{
        background: "var(--passionfruit)",
        borderRadius: "20px",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <span
        style={{
          color: "var(--coconut-milk)",
          fontSize: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <IoSearch />
      </span>

      <input
        id="search"
        name="search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--coconut-milk)",
          fontSize: "18px",
          opacity: 1,
        }}
      />

      {value.length > 0 && (
        <button
          onClick={() => onChange("")}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--coconut-milk)",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default HomeSearchBar;