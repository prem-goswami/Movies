import { useState, useEffect } from "react";
import "./recentSearches.css";
import RecentSearchCard from "./recentSearchesCard";
const RecentSearches = () => {
  const [recentMovies, setRecentMovies] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentMovies");
    if (stored) {
      setRecentMovies(JSON.parse(stored));
    }
    // Listen for changes from other tabs/windows
    const onStorage = (e) => {
      if (e.key === "recentMovies") {
        setRecentMovies(e.newValue ? JSON.parse(e.newValue) : []);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Only render markup and styling if there are recent movies
  if (!recentMovies || recentMovies.length === 0) return null;

  return (
    <section className={recentMovies.length > 0 ? "recentMoviesSection" : ""}>
      <h2 className="recentMoviesTitle">Recent Searches</h2>
      <ul className="recentMoviesList">
        {recentMovies.map((movie) => (
          <RecentSearchCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </section>
  );
};

export default RecentSearches;
