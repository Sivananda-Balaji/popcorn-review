import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import StarRating from "../star-component/StarRating";
import Loader from "../utils/Loader";
import ErrorMessage from "../utils/ErrorMesage";

const api_key = "d7f06f82";
const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const countRef = useRef(0);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const userRated = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  const {
    Title: title,
    Poster: poster,
    Released: released,
    Runtime: runTime,
    Genre: genre,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
    Year: year,
  } = movie;
  useEffect(() => {
    const getMovieDetail = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${api_key}&i=${selectedId}`
        );
        setMovie(response.data);
      } catch (err) {
        console.log(err);
        setError(err.message);
        setMovie([]);
      } finally {
        setIsLoading(false);
      }
    };
    getMovieDetail();
  }, [selectedId]);
  useEffect(() => {
    if (!title) {
      return;
    }
    document.title = `${title} | Movie`;
    return () => {
      document.title = "Popcorn Review";
    };
  }, [title]);
  useEffect(() => {
    const handleEvents = (event) => {
      if (event.code === "Backspace") {
        onCloseMovie();
      }
    };
    document.addEventListener("keydown", handleEvents);
    return () => {
      document.removeEventListener("keydown", handleEvents);
    };
  }, [onCloseMovie]);
  useEffect(() => {
    if (userRating) {
      countRef.current = countRef.current + 1;
    }
  }, [userRating]);
  const handleAdd = () => {
    const newMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runTime: Number(runTime.split(" ").at(0)),
      userRating,
      count: countRef.current,
    };
    onAddWatched(newMovie);
    onCloseMovie();
  };

  return (
    <div className="details">
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runTime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onUserRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      Add to the list
                    </button>
                  )}
                </>
              ) : (
                <p>You have already rated this movie ⭐{userRated}</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring : {actors}</p>
            <p>Directed By : {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
