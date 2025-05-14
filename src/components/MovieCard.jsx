import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.card}>
      <img src={movie.poster} alt={movie.title} className={styles.poster} />
      <div className={styles.content}>
        <h3 className={styles.title}>{movie.title}</h3>
        <p className={styles.description}>{movie.description}</p>
        <p className={styles.info}>Жанр: {movie.genre}</p>
        <p className={styles.info}>Сеанс: {movie.showtime}</p>
        <Link to={`/booking/${movie.id}`} className={styles.button}>
          Забронювати
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;