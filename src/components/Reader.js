// src/Reader.js

import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stories from "./Stories"; // Import your stories
import "./Reader.css"; // Ensure to style this for a book-like appearance
import bookOneImage from '../image/1.jpg';
import bookTwoImage from '../image/2.jpg';

function Reader() {
  const { bookId } = useParams();
  const navigate = useNavigate();

  // Directly get the story parts
  const fullStory = stories[bookId]; 

  // Initialize state
  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState([]);

  // Check if fullStory is a string and split the story into parts
  useEffect(() => {
    if (typeof fullStory === 'string') {
      const splitStoryIntoParts = (story) => {
        return story.split(/(?<=[.,!?])\s+/); // Split on punctuation followed by whitespace
      };

      // Set the pages state
      setPages(splitStoryIntoParts(fullStory));
    } else {
      console.error("Story is not a string:", fullStory);
    }
  }, [fullStory]);

  const readAloud = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.pitch = 1;
    utterance.rate = 0.8;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find(voice => voice.name === 'Google US English');
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  const handleSentenceClick = (sentence) => {
    readAloud(sentence);
  };

  const paragraphsPerPage = 2; // Number of paragraphs per page

  const nextPage = () => {
    if (currentPage < Math.ceil(pages.length / 15) - 1) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
    }
  };

  // This effect runs on mount to ensure voices are loaded
  useEffect(() => {
    const handleVoicesChanged = () => {
      window.speechSynthesis.getVoices();
    };
    
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  // Set background image based on story ID
  const backgroundImages = {
    "1": `url(${bookOneImage})`, // Assuming bookId is a string
    "2": `url(${bookTwoImage})`,
    // Add more stories and their respective background images
  };

  return (
    <div className="reading-mode" style={{ backgroundImage: backgroundImages[bookId], backgroundSize: 'cover', height: '100vh' }}>
      <button className="close-button" onClick={() => navigate("/")}>✖</button>
      <h1>The Enchanted Forest</h1>
      <div className="content" style={{ fontSize: '16px', whiteSpace: 'pre-line' }}>
        {/* Render paragraphs based on the sentences */}
        {pages.reduce((acc, sentence, index) => {
          if (index % 15 === 0) {
            acc.push([]); // Start a new paragraph
          }
          acc[acc.length - 1].push(sentence);
          return acc;
        }, []).slice(currentPage * paragraphsPerPage, (currentPage + 1) * paragraphsPerPage).map((paragraph, paragraphIndex) => (
          <p key={paragraphIndex}>
            {paragraph.map((sentence, sentenceIndex) => (
              <span
                key={sentenceIndex}
                onClick={() => handleSentenceClick(sentence)}
                style={{ cursor: 'pointer', display: 'inline-block', margin: '0 5px' }}
              >
                {sentence}
              </span>
            ))}
          </p>
        ))}
      </div>
      <div className="navigation">
        <p>Page {currentPage + 1} of {Math.ceil(pages.length / (15 * paragraphsPerPage))}</p>
        <button onClick={prevPage} disabled={currentPage === 0}>
          {"<"}
        </button>
        <button onClick={nextPage} disabled={currentPage >= Math.ceil(pages.length / (15 * paragraphsPerPage)) - 1}>
          {currentPage >= Math.ceil(pages.length / (15 * paragraphsPerPage)) - 1 ? "Home" : ">"}
        </button>
      </div>
    </div>
  );
}

export default Reader;
