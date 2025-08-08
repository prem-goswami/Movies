import "./App.css";
import "./index.css";
import Search from "./components/search";
import { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import CardComponent from "./components/cradComponent";
import { use } from "react";
import { updateSearchCount } from "./appWrite";

const APP_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMovies(searchTerm);
  }, [searchTerm]);

  const fetchMovies = async (query = "") => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const endpoint = searchTerm
        ? `${APP_BASE_URL}/search/movie?query=${searchTerm}`
        : `${APP_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data:", data);
      if (data.Response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movies.");
        setMoviesList([]);
        return;
      }
      setMoviesList(data.results || []);

      updateSearchCount();
    } catch (error) {
      console.log(`Error fetching movies: ${error}`);
      setErrorMessage("Failed to fetch movies. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mainBackground">
      <div className="wrapper">
        <header className="headerContent">
          <img src="./public/hero-img.png" alt="Hero Image" />
          <h1>
            Find <span>Movies</span> you enjoy !
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <h1 className="allMoviesText">All Movies</h1>
        <section className="allMovies">
          {loading ? (
            <div className="loader">
              <ClipLoader color="#d667ff" size={50} loading={loading} />
            </div>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <ul className="moviesList">
              {moviesList.map((movie) => (
                <CardComponent key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
