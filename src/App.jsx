import { useState } from "react";



function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState('')
  const [shows, setShows] = useState('')
  const [catalog, setCatalog] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  function handleSubmit(e) {
    e.preventDefault();

    const movies_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    const tvshows_url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery}`;

    // fetch dei film
    fetch(movies_url)
      .then(res => res.json())
      .then(data => {
        const movies = data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          language: movie.original_language,
          vote: movie.vote_average,
          type: 'film',
        }));

        // fetch delle serie tv
        fetch(tvshows_url)
          .then(res => res.json())
          .then(data => {
            const tvShows = data.results.map(tv => ({
              id: tv.id,
              title: tv.name,
              original_title: tv.original_name,
              language: tv.original_language,
              vote: tv.vote_average,
              type: 'serie tv',
            }));

            // spread nell'array con il catalogo completo
            setCatalog([...movies, ...tvShows]);
          });
      });
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
              placeholder="Cerca nel catalogo.."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} />
            <button className="btn btn-primary" type="submit">
              Cerca
            </button>
          </form>
        </div>
      </div>

      {/* Sezione con le card */}
      <section>
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
            {catalog.map(product => (
              <div className="col" key={`${product.type}-${product.id}`}>
                <div className="border rounded p-3 h-100">
                  <h5 className="text-center">{product.title}</h5>
                  <p className="text-center small text-muted text-uppercase">{product.type}</p>
                  <p className="mb-1"><strong>Titolo originale:</strong> {product.original_title}</p>
                  <p className="mb-1"><strong>Lingua:</strong> {product.language}</p>
                  <p><strong>Voto:</strong> {product.vote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
