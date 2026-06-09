import { immigrantGroups } from "./data/groups";

const Legend = () => {
  return (
    <>
      {Object.keys(immigrantGroups).map((group) => {
        return (
          <div
            key={group}
            style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}
          >
            <div
              style={{
                backgroundColor: immigrantGroups[group].color,
                height: "1.5rem",
                width: "2em",
                borderRadius: "100%",
              }}
            ></div>
            <div style={{ fontSize: "1.1rem", color: "oklab(0 0 0 / 0.8)" }}>
              {immigrantGroups[group].label}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Legend;
