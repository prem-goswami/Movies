import React from "react";
import "./cardComponent.css";

const CardComponent = ({
  movie: { title, vote_average, release_date, original_language, poster_path },
}) => {
  return (
    <div className="moviesCard">
      <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} />
      <div className="title">
        <h3>{title}</h3>
      </div>
      <div className="content">
        <div className="rating">
          <img src="star.png" alt="Star Icon" />
          <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          <p> • </p>
          <p>{original_language ? original_language : ""}</p>
          <p> • </p>
          <p>{release_date ? release_date.split("-")[0] : ""}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
//
