import React from "react";
import { Link } from "react-router-dom";
import BookCard from "./BookCard";
import "./Home.css";
import homeImage from '../image/home.jpg';
import bookOneImage from '../image/1.jpg';
import bookTwoImage from '../image/2.jpg';

const books = [
  { id: 1, title: "Daydreams", image: bookOneImage },
  { id: 2, title: "Soy", image: bookTwoImage },
];

function Home() {
  return (
    <div className="home" style={{ backgroundImage: `url(${homeImage})`, backgroundSize: 'cover', height: '100vh' }}>
      <h1>Select a Book to Read</h1>
      <div className="book-grid">
        {books.map((book) => (
          <Link key={book.id} to={`/reader/${book.id}`}>
            <BookCard title={book.title} image={book.image} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
