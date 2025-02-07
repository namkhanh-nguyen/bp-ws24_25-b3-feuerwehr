import React from "react";

export default function Loading() {
  return (
    <div
      className="text-center"
      style={{
        fontSize: "4rem",
        fontFamily: "var(--font-berlin-type-bold)",
        color: "var(--red-primary)",
        marginTop: "5rem",
        padding: "2rem",
      }}
    >
      Lädt ...
    </div>
  );
}
