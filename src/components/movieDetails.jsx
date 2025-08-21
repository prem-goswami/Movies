
import React, { useEffect, useState } from "react";
import "./movieDetails.css";
import { useParams, useNavigate } from "react-router-dom";

const APP_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const endpoint = `${APP_BASE_URL}/movie/${id}`;
        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
        // Store recent searches in localStorage
        if (data && data.id) {
          let recent = JSON.parse(localStorage.getItem("recentMovies") || "[]");
          // Remove if already present
          recent = recent.filter(m => m.id !== data.id);
          // Add to front
          recent.unshift({
            id: data.id,
            title: data.title,
            vote_average: data.vote_average,
            release_date: data.release_date,
            original_language: data.original_language,
            poster_path: data.poster_path
          });
          // Keep only 5
          if (recent.length > 5) recent = recent.slice(0, 5);
          localStorage.setItem("recentMovies", JSON.stringify(recent));
        }
      } catch (err) {
        setError("Could not load movie details.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <div className="movie-details-container"><h2>Loading...</h2></div>;
  }
  if (error) {
    return <div className="movie-details-container"><h2>{error}</h2></div>;
  }
  if (!movie) return null;

  return (
    <div className="movie-details-bg">
      <div className="movie-details-container">
        <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
        <div className="movie-details-content">
          <div className="movie-details-left">
            <img
              className="movie-details-poster"
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : ""}
              alt={movie.title}
            />
            <button className="play-btn">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="16" fill="#d667ff" />
                <polygon points="13,10 25,16 13,22" fill="#fff" />
              </svg>
              Play Trailer
            </button>
          </div>
          <div className="movie-details-right">
            <div className="movie-details-title">{movie.title}</div>
            <div className="movie-details-info">
              <span><strong>Release Date:</strong> {movie.release_date}</span>
              <span><strong>Language:</strong> {movie.original_language}</span>
              <span><strong>Rating:</strong> {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}</span>
            </div>
            <div className="movie-details-overview">
              <strong>Overview:</strong>
              <p>{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
