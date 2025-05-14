import MovieList from './components/MovieList';
import { movies } from './data/movies';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Кінотеатр</h1>
      </header>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;