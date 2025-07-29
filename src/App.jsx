import { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [moviesData, setMoviesData] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  function handleSubmit(e) {
    e.preventDefault();

    const movies_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;

    fetch(movies_url)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setMoviesData(data.results);
      })
  }

  return (
    <>
      {/* Barra di ricerca */}
      <div className="p-4 mb-3 bg-light rounded">
        <div className="container d-flex align-items-center gap-3">
          <h1 className="h3 mb-0">Boolflix</h1>
          <form onSubmit={handleSubmit} className="d-flex gap-2 flex-grow-1">
            <input
              type="text"
              className="form-control"
              placeholder="Search a movie or TV show"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} />
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>

      {/* Sezione con le card */}
      <section>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {moviesData?.map(movie => (
              <div className="col" key={movie.id}>
                <div className="border rounded p-3 h-100">
                  <h5>{movie.title}</h5>
                  <p className="mb-1"><strong>Originale:</strong> {movie.original_title}</p>
                  <p className="mb-1"><strong>Lingua:</strong> {movie.original_language}</p>
                  <p><strong>Voto:</strong> {movie.vote_average}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default App;
