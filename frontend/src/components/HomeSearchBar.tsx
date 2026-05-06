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
        background: "#08000e",
        borderRadius: "20px",
        padding: "10px 14px",
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span style={{ color: "white"}}><IoSearch /></span>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
        }}
      />

      {value.length > 0 && (
        <button
          onClick={() => onChange("")}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default HomeSearchBar