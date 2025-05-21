import { useParams } from 'react-router-dom';
import { useState } from 'react';
import CinemaHall from '../components/CinemaHall';
import BookingForm from '../components/BookingForm';
import { movies } from '../data/movies';
import { BookingService } from '../services/BookingService';
import styles from './Booking.module.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id));
  const [showForm, setShowForm] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  if (!movie) {
    return <div className={styles.error}>Фільм не знайдено</div>;
  }

  const handleSeatsSelected = (seats) => {
    setSelectedSeats(seats);
    setShowForm(true);
  };

  const handleBooking = (userData) => {
    BookingService.saveBooking(movie.id, selectedSeats, userData);
    setShowForm(false);
    setSelectedSeats([]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Бронювання: {movie.title}</h2>
      <CinemaHall movieId={movie.id} onSeatsBooked={handleSeatsSelected} />
      {showForm && (
        <BookingForm
          movieId={movie.id}
          selectedSeats={selectedSeats}
          onBookingSuccess={handleBooking}
        />
      )}
    </div>
  );
};

export default Booking;