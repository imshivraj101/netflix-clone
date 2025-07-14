import React, { useEffect, useState } from 'react';
import './Player.css';
import { useParams, useNavigate } from 'react-router-dom'; // 👈 added useNavigate
import back_arrow_icon from '../../assets/back_arrow_icon.png';

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // 👈 init navigate hook

  const [movie, setMovie] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [loading, setLoading] = useState(true);

  const apiToken = import.meta.env.VITE_TMDB_TOKEN;

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiToken}`
    }
  };

  useEffect(() => {
    async function fetchMovieAndVideo() {
      try {
        const [movieRes, videoRes] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options),
          fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
        ]);

        const movieData = await movieRes.json();
        const videoData = await videoRes.json();

        setMovie(movieData);

        const trailer = videoData.results.find(
          video => video.type === 'Trailer' && video.site === 'YouTube'
        );
        if (trailer) setVideoKey(trailer.key);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movie or trailer:', error);
        setLoading(false);
      }
    }

    fetchMovieAndVideo();
  }, [id]);

  if (loading) {
    return (
      <div className="player loading">
        <p>Loading movie...</p>
      </div>
    );
  }

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="Back"
        className="back-icon"
        onClick={() => navigate(-1)} // 👈 go back to previous page
        style={{ cursor: 'pointer' }}
      />

      <iframe
        width="90%"
        height="500px"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>📅 Published Date: <strong>{movie.release_date}</strong></p>
        <p>🎬 Name: <strong>{movie.title}</strong></p>
        <p>🎞️ Type: <strong>{movie.genres?.[0]?.name || 'N/A'}</strong></p>
      </div>
    </div>
  );
};

export default Player;
