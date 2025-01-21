"use client";
import Link from "next/link";

type CardProps = {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  icon?: string;
  link?: string;
  variant?: "process" | "career";
};

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  image,
  icon,
  link,
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
        <a href={link} target="_blank" rel="noopener noreferrer">
          <h3 className="card-title">{title}</h3>
        </a>
        <p className="card-description">{description}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-button"
        >
          Erfahre mehr
          <span className="arrow">&rarr;</span>
        </a>
      </div>
    </div>
  );
};

export default Card;
