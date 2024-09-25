import React from "react";
import "./BookCard.css";

function BookCard({ title, image }) {
  return (
    <div className="book-card">
      <img src={image} alt={title} />
      <h2>{title}</h2>
    </div>
  );
}

export default BookCard;
