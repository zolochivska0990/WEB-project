import MovieList from '../components/MovieList';
import { movies } from '../data/movies';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Актуальні фільми</h2>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;