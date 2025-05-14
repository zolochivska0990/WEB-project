import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import { movies } from '../data/movies';
import styles from './Booking.module.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));

  if (!movie) {
    return <div className={styles.error}>Фільм не знайдено</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Бронювання: {movie.title}</h2>
      <CinemaHall />
    </div>
  );
};

export default Booking;