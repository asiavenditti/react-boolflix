import { useState } from "react";
import './index.css';
import LanguageFlags from "./components/LanguageFlags";
import Stars from "./components/Stars";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState('')
  const [shows, setShows] = useState('')
  const [catalog, setCatalog] = useState([]);

  const API_KEY = import.meta.env.VITE_API_KEY;

  const img_size = "w342";
  const img_url = `https://image.tmdb.org/t/p/${img_size}`;

  function handleSubmit(e) {
    e.preventDefault();

    const movies_url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`;
    const tvshows_url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchQuery}`;

    fetch(movies_url)
      .then(res => res.json())
      .then(data => {
        const movies = data.results ? data.results.map(movie => ({
          id: movie.id,
          title: movie.title,
          original_title: movie.original_title,
          language: movie.original_language,
          vote: movie.vote_average,
          poster: movie.poster_path,
          type: 'film',
        })) : [];

        fetch(tvshows_url)
          .then(res => res.json())
          .then(data => {
            const tvShows = data.results ? data.results.map(tv => ({
              id: tv.id,
              title: tv.name,
              original_title: tv.original_name,
              language: tv.original_language,
              vote: tv.vote_average,
              poster: tv.poster_path,
              type: 'serie tv',
            })) : [];

            setCatalog([...movies, ...tvShows]);
          });
      });
  }

  return (
    <>
      {/* Barra di ricerca */}
      <div className="p-4 mb-3 bg-darkgray rounded">
        <div className="container d-flex align-items-center gap-3">
          <img src="./boolflix.png" alt="" />
          <form onSubmit={handleSubmit} className="d-flex gap-2 flex-grow-1">
            <input
              type="text"
              className="form-control"
              placeholder="Cerca nel catalogo.."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)} />
            <button className="btn btn-danger" type="submit">
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
                <div className="card h-100 bg-dark text-white">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-center">{product.title}</h5>
                    <p className="text-center small text-uppercase text-warning">
                      {product.type}
                    </p>
                    {product.poster ? (
                      <img
                        src={`${img_url}${product.poster}`}
                        alt={product.title}
                        className="card-img-top mb-3"
                      />
                    ) : (
                      <div className="card-img-top text-white fw-bold d-flex align-items-center justify-content-center" style={{ height: '500px' }}>
                        Nessuna immagine
                      </div>
                    )}
                    <p className="mb-1"><strong>Titolo originale:</strong> {product.original_title}</p>
                    <p className="mb-1">
                      <strong>Lingua:</strong> <LanguageFlags language={product.language} />
                    </p>
                    <p className="mt-auto"><strong>Voto:</strong> <Stars vote={product.vote} /></p>
                  </div>
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
