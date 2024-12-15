"use client";

type CardProps = {
  title: string;
  subtitle?: string; // Optional, z. B. für "Ausbildung" oder "Schritt 1"
  description: string;
  image?: string; // Optional, für Karten mit Bildern
  icon?: string; // Optional, für Karten mit Icons
  variant?: "process" | "career"; // Steuert das Styling
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  image,
  icon,
  variant = "career",
}) => {
  return (
    <div
      className={`card ${
        variant === "process" ? "card-process" : "card-career"
      }`}
    >
      {variant === "career" && image && (
        <img src={image} alt={title} className="card-image" />
      )}
      {variant === "process" && icon && (
        <img src={icon} alt={title} className="card-icon" />
      )}
      <div className="card-content">
        {subtitle && <p className="card-subtitle">{subtitle}</p>}
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        <button className="card-button">
          Erfahre mehr
          <span className="arrow">&rarr;</span>
        </button>
      </div>
    </div>
  );
};

export default Card;
