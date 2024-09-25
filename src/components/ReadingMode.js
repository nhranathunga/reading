import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import './Home.css';

const storyPages = {
  1: [
    "They're coming! - a woman shrieked...",
    "The road grows narrow and black...",
    "For my own part, I remember nothing..."
  ],
  2: [
    "The Martians seemed invincible...",
    "One day I saw them gathering...",
    "And then everything went quiet..."
  ]
};

const ReadingMode = () => {
  const { id } = useParams(); // Get the book ID from the URL
  const history = useHistory(); // Access navigation
  const [currentPage, setCurrentPage] = useState(0); // Track the current page

  const pages = storyPages[id]; // Get the pages for the current book

  const readAloud = (sentence) => {
    const utterance = new SpeechSynthesisUtterance(sentence);
    window.speechSynthesis.speak(utterance);
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goBackHome = () => {
    history.push('/'); // Navigate back to the home page
  };

  return (
    <div className="reading-mode">
      <h1>Reading Mode - Book {id}</h1>
      <div className="content">
        {pages[currentPage].split('. ').map((sentence, idx) => (
          <span
            key={idx}
            onClick={() => readAloud(sentence)}
            className="clickable-sentence"
          >
            {sentence}.
          </span>
        ))}
      </div>
      <div className="navigation">
        <button onClick={prevPage}>Previous Page</button>
        <button onClick={nextPage}>Next Page</button>
      </div>
      <button onClick={goBackHome}>Back to Home</button>
    </div>
  );
};

export default ReadingMode;
