import React from "react";
import "../styles/visitButton.scss";

const VisitButton = ({ url, text = "Visit Link" }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="visit-btn"
    >
      <span className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3z" />
          <path d="M5 5h6v2H7v10h10v-4h2v6H5z" />
        </svg>
      </span>

      <span className="text">{text}</span>
    </a>
  );
};

export default VisitButton;