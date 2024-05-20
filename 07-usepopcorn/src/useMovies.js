import { useEffect, useState } from "react";

export function useMovies(query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(
        function () {
            const controller = new AbortController();

            async function fetchMovies() {
                try {
                    setIsLoading(true);
                    setError("");
                    const res = await fetch(
                        `https://www.omdbapi.com/?apikey=b24491d4&s=${query}`,
                        { signal: controller.signal }
                    );

                    if (!res.ok)
                        throw new Error(
                            "Something went wrong with fetching movies"
                        );

                    const data = await res.json();

                    if (data.Response === "False")
                        throw new Error("Movie not found");

                    setMovies(data.Search);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setIsLoading(false);
                }
            }

            if (query.length < 3) {
                setMovies([]);
                setError("");
                return;
            }

            //handleCloseMovie();
            fetchMovies();
        },
        [query]
    );

    return { movies, isLoading, error };
}
