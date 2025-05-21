import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CinemaHall from '../components/CinemaHall';
import BookingForm from '../components/BookingForm';
import { movies } from '../data/movies';
import BookingService from '../services/BookingService';
import styles from './Booking.module.css';

const Booking = () => {
  const { id } = useParams();
  const movie = movies.find((m) => m.id === Number(id)) || null;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (movie) {
      const bookings = BookingService.getBookingsByMovieId(movie.id);
      const seats = bookings.flatMap((b) => b.seats);
      setBookedSeats(seats);
    }
  }, [movie]);

  const handleSeatsSelected = (seats) => {
    setSelectedSeats(seats);
  };

  const handleBookingSuccess = (booking) => {
    setBookedSeats((prev) => [...prev, ...booking.seats]);
    setSelectedSeats([]);
  };

  if (!movie) {
    return <div className={styles.error}>Фільм не знайдено</div>;
  }

  return (
    <div className={styles.container}>
      <CinemaHall
        onSeatsSelected={handleSeatsSelected}
        bookedSeats={bookedSeats}
        selectedSeats={selectedSeats}
        movieTitle={movie.title}
      />
      {selectedSeats.length > 0 && (
        <BookingForm
          movieId={movie.id}
          selectedSeats={selectedSeats}
          onBookingSuccess={handleBookingSuccess}
        />
      )}
    </div>
  );
};

export default Booking;