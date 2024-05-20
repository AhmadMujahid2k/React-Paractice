import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
    const [query, setQuery] = useState("inception");
    const [selectedId, setSelectedId] = useState(null);
    const { movies, isLoading, error } = useMovies(query);

    const [watched, setWatched] = useState(function () {
        const storeValue = localStorage.getItem("watched");
        return JSON.parse(storeValue);
    });

    function handleSelectMovie(id) {
        setSelectedId((selectedId) => (id === selectedId ? null : id));
    }

    function handleCloseMovie() {
        setSelectedId(null);
    }

    function handleAddWatched(movie) {
        setWatched((watched) => [...watched, movie]);

        // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
    }

    useEffect(
        function () {
            localStorage.setItem("watched", JSON.stringify(watched));
        },
        [watched]
    );

    return (
        <>
            <NavBar>
                <Logo />
                <Search query={query} setQuery={setQuery} />
                <NumResults movies={movies} />
            </NavBar>
            <Main>
                <Box>
                    {isLoading && <Loader />}
                    {!isLoading && !error && (
                        <MoviesList
                            movies={movies}
                            onSelectMovie={handleSelectMovie}
                        />
                    )}
                    {error && <ErrorMessage message={error} />}
                </Box>
                <Box>
                    {selectedId ? (
                        <MovieDetails
                            selectedId={selectedId}
                            onCloseMovie={handleCloseMovie}
                            onAddWatch={handleAddWatched}
                            watched={watched}
                        />
                    ) : (
                        <>
                            <WatchedSummary watched={watched} />
                            <WatchedMoviesList
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

function ErrorMessage({ message }) {
    return <p className='error'>{message}</p>;
}

function Loader() {
    return <p className='loader'>Loading...</p>;
}

function Main({ children }) {
    return <main className='main'>{children}</main>;
}

function Box({ children }) {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className='box'>
            <Button openFunc={setIsOpen} openVar={isOpen}></Button>
            {isOpen && children}
        </div>
    );
}

function MoviesList({ movies, onSelectMovie }) {
    return (
        <ul className='list list-movies'>
            {movies?.map((movie) => (
                <Movie
                    movie={movie}
                    key={movie.imdbID}
                    onSelectMovie={onSelectMovie}
                />
            ))}
        </ul>
    );
}

function Movie({ movie, onSelectMovie }) {
    return (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
            <img src={movie.Poster} alt={`${movie.Title} poster`} />
            <h3>{movie.Title}</h3>
            <div>
                <p>
                    <span>🗓</span>
                    <span>{movie.Year}</span>
                </p>
            </div>
        </li>
    );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatch, watched }) {
    const [movie, setMovie] = useState({});
    const [userRating, setUserRating] = useState("");

    const {
        Title: title,
        Year: year,
        Poster: poster,
        Runtime: runtime,
        imdbRating,
        Plot: plot,
        Released: released,
        Actors: actors,
        Director: director,
        Genre: genre,
    } = movie;

    const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
    const watchedUserrating = watched.find(
        (movie) => movie.imdbID === selectedId
    )?.userRating;

    function handleAdd() {
        const newWatchedMovie = {
            imdbID: selectedId,
            title,
            year,
            poster,
            imdbRating: Number(imdbRating),
            runtime,
            userRating,
        };
        onAddWatch(newWatchedMovie);
        onCloseMovie();
    }

    useEffect(
        function () {
            async function getMovieDetails() {
                const res = await fetch(
                    `https://www.omdbapi.com/?apikey=b24491d4&i=${selectedId}`
                );
                const data = await res.json();
                setMovie(data);
            }
            getMovieDetails();
        },
        [selectedId]
    );

    useEffect(
        function () {
            if (!title) return;
            document.title = `Movie | ${title}`;

            return function () {
                document.title = "usePopcorn";
            };
        },
        [title]
    );

    useEffect(
        function () {
            document.addEventListener("keydown", function (e) {
                if (e.code === "Escape") {
                    onCloseMovie();
                }
            });

            return function () {
                document.removeEventListener("keydown", function (e) {
                    if (e.code === "Escape") {
                        onCloseMovie();
                    }
                });
            };
        },
        [onCloseMovie]
    );

    return (
        <div className='details'>
            <header>
                <button className='btn-back' onClick={onCloseMovie}>
                    &larr;
                </button>
                <img src={poster} alt={`poster of ${movie} movie`} />
                <div className='details-overview'>
                    <h2>{title}</h2>
                    <p>
                        {released} &bull; {runtime}
                    </p>
                    <p>{genre}</p>
                    <p>{imdbRating} IMDb rating</p>
                    <p>{year}</p>
                </div>
            </header>
            <section>
                <div className='rating'>
                    {!isWatched ? (
                        <>
                            <StarRating
                                maxRating={10}
                                size={24}
                                onSetRating={setUserRating}
                            />

                            {userRating > 0 && (
                                <button className='btn-add' onClick={handleAdd}>
                                    + Add to list
                                </button>
                            )}
                        </>
                    ) : (
                        <p>You rated this movie {watchedUserrating} stars</p>
                    )}
                </div>
                <p>
                    <em>{plot}</em>
                </p>
                <p>Starring {actors}</p>
                <p>Directed by {director}</p>
            </section>
        </div>
    );
}

function WatchedSummary({ watched }) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));
    return (
        <div className='summary'>
            <h2>Movies you watched</h2>
            <div>
                <p>
                    <span>#️⃣</span>
                    <span>{watched.length} movies</span>
                </p>
                <p>
                    <span>⭐️</span>
                    <span>{avgImdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{avgUserRating.toFixed(2)}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{avgRuntime} min</span>
                </p>
            </div>
        </div>
    );
}

function WatchedMoviesList({ watched, onDeleteWatched }) {
    return (
        <ul className='list'>
            {watched.map((movie) => (
                <WatchedMovie
                    movie={movie}
                    key={movie.imdbID}
                    onDeleteWatched={onDeleteWatched}
                />
            ))}
        </ul>
    );
}

function WatchedMovie({ movie, onDeleteWatched }) {
    return (
        <li key={movie.imdbID}>
            <img src={movie.poster} alt={`${movie.title} poster`} />
            <h3>{movie.title}</h3>
            <div>
                <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                </p>
                <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                </p>
                <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                    <button
                        className='btn-delete'
                        onClick={() => onDeleteWatched(movie.imdbID)}>
                        X
                    </button>
                </p>
            </div>
        </li>
    );
}

function Button({ openFunc, openVar }) {
    return (
        <button
            className='btn-toggle'
            onClick={() => openFunc((open) => !open)}>
            {openVar ? "–" : "+"}
        </button>
    );
}

function NavBar({ children }) {
    return <nav className='nav-bar'>{children}</nav>;
}

function Logo() {
    return (
        <div className='logo'>
            <span role='img'>🍿</span>
            <h1>usePopcorn</h1>
        </div>
    );
}

function Search({ query, setQuery }) {
    const inputEl = useRef(null);

    useEffect(
        function () {
            function callback(e) {
                if (document.activeElement === inputEl.current) return;
                if (e.code === "Enter") {
                    inputEl.current.focus();
                    setQuery("");
                }
            }
            document.addEventListener("keydown", callback);
            return () => document.addEventListener("keydown", callback);
        },
        [setQuery]
    );

    return (
        <input
            className='search'
            type='text'
            placeholder='Search movies...'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            ref={inputEl}
        />
    );
}

function NumResults({ movies }) {
    return (
        <p className='num-results'>
            Found <strong>{movies?.length}</strong> results
        </p>
    );
}
