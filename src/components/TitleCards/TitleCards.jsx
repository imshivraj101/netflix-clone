import React, { useRef, useEffect, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data.js'; // fallback data
import { Link } from 'react-router-dom';

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const [movies, setMovies] = useState([]);

  const apiToken = import.meta.env.VITE_TMDB_TOKEN || '';

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    const container = cardsRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  useEffect(() => {
    const endpoint = category ? category : "now_playing";

    fetch(`https://api.themoviedb.org/3/movie/${endpoint}?language=en-US&page=1`, options)
      .then(response => response.json())
      .then(data => {
        if (data.results) {
          setMovies(data.results);
        }
      })
      .catch(err => {
        console.error("Failed to fetch from TMDB:", err);
        setMovies(cards_data); // fallback
      });
  }, [category]);

  return (
    <div className='titlecards'>
      <h2>{title || "Popular on TrailerPark"}</h2>
      <div className='card-list' ref={cardsRef}>
        {(movies.length > 0 ? movies : cards_data).map((card, index) => (
          <Link
            to={`/player/${card.id}`}
            key={index}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className='card'>
              <img
                src={
                  card.image
                    ? card.image
                    : `https://image.tmdb.org/t/p/w500${card.poster_path}`
                }
                alt={card.title || card.name || 'Movie Poster'}
              />
              <p>{card.original_title || card.title || card.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TitleCards;
