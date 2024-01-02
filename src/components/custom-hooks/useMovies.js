import { useState, useEffect } from "react";
import axios from "axios";

const api_key = "d7f06f82";

const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        setError("");
        const response = await axios.get(
          `http://www.omdbapi.com/?apikey=${api_key}&s=${query}`
        );
        if (response.data && response.data.Search) {
          setMovies(response.data.Search);
          setError("");
        } else {
          setError(response.data.Error);
          setMovies([]);
        }
      } catch (err) {
        console.log(err);
        setError(err.message);
        setMovies([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    getData();
  }, [query]);
  return { movies, isLoading, error };
};

export default useMovies;
