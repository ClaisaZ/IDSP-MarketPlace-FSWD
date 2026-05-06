function HomeSearchBar() {
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
      <span style={{ color: "white", fontSize: "14px" }}>⌕</span>

      <input
        placeholder="Search..."
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          fontSize: "12px",
        }}
      />

      <span style={{ color: "white", fontSize: "14px" }}>⚙</span>
    </div>
  );
}

export default HomeSearchBar;