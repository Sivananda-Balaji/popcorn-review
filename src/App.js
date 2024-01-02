import { useState } from "react";
import NavBar from "./components/nav-bar/NavBar";
import Main from "./components/main/Main";
import NumResults from "./components/nav-bar/NumResults";
import Box from "./components/main/Box";
import MovieList from "./components/main/MovieList";
import WatchedSummary from "./components/main/WatchedSummary";
import WatchedList from "./components/main/WatchedList";
import Loader from "./components/utils/Loader";
import ErrorMessage from "./components/utils/ErrorMesage";
import MovieDetails from "./components/main/MovieDetails";
import useMovies from "./components/custom-hooks/useMovies";
import useLocalStorage from "./components/custom-hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [watched, setWatched] = useLocalStorage([], "watched");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);

  const handleQuery = (term) => {
    setQuery(term);
  };
  const handleSelectMovie = (id) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const handleAddWatched = (newMovie) => {
    setWatched([...watched, newMovie]);
  };
  const handleDeleteWatched = (deleteId) => {
    const filterMovies = watched.filter((movie) => movie.imdbID !== deleteId);
    setWatched(filterMovies);
  };

  return (
    <>
      <NavBar handleQuery={handleQuery}>
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <ErrorMessage message={error} />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
