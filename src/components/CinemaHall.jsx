import { useState, useEffect } from 'react';
import { BookingService } from '../services/BookingService';
import styles from './CinemaHall.module.css';

const CinemaHall = ({ movieId, onSeatsBooked }) => {
  const rows = 5;
  const seatsPerRow = 8;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    // Завантажуємо заброньовані місця при завантаженні сторінки
    const bookings = BookingService.getBookingsForMovie(movieId);
    const booked = bookings.flatMap((booking) => booking.seats);
    setBookedSeats(booked);
  }, [movieId]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    if (bookedSeats.includes(seatId)) return; // Не дозволяємо вибирати заброньовані місця
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((id) => id !== seatId)
        : [...prev, seatId]
    );
  };

  return (
    <div className={styles.hall}>
      <h3 className={styles.title}>Виберіть місця</h3>
      <div className={styles.seats}>
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className={styles.row}>
            {Array.from({ length: seatsPerRow }).map((_, seat) => {
              const seatId = `${row}-${seat}`;
              const isSelected = selectedSeats.includes(seatId);
              const isBooked = bookedSeats.includes(seatId);
              return (
                <button
                  key={seatId}
                  className={`${styles.seat} ${isSelected ? styles.selected : ''} ${
                    isBooked ? styles.booked : ''
                  }`}
                  onClick={() => toggleSeat(row, seat)}
                  disabled={isBooked}
                >
                  {seat + 1}
                </button>
              );
            })}
          </div>
        ))}
      </div>
      <div className={styles.selectedSeats}>
        <p>Вибрані місця: {selectedSeats.length ? selectedSeats.join(', ') : 'Немає'}</p>
      </div>
      {onSeatsBooked && (
        <div className={styles.bookButton}>
          <button onClick={() => onSeatsBooked(selectedSeats)} className={styles.submitButton}>
            Підтвердити вибір
          </button>
        </div>
      )}
    </div>
  );
};

export default CinemaHall;