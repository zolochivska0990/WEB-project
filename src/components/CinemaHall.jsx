import { useState } from 'react';
import styles from './CinemaHall.module.css';

const CinemaHall = ({ onSeatsSelected, bookedSeats = [], selectedSeats = [] }) => {
  const rows = 5;
  const seatsPerRow = 8;

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
    if (!bookedSeats.includes(seatId)) {
      const newSelected = selectedSeats.includes(seatId)
        ? selectedSeats.filter((id) => id !== seatId)
        : [...selectedSeats, seatId];
      onSeatsSelected(newSelected);
    }
  };

  return (
    <div className={styles.hall}>
      <h3 className={styles.title}>Виберіть місця</h3>
      <div className={styles.seats}>
        {Array.from({ length: rows }).map((_, row) => (
          <div key={row} className={styles.row}>
            {Array.from({ length: seatsPerRow }).map((_, seat) => {
              const seatId = `${row}-${seat}`;
              const isBooked = bookedSeats.includes(seatId);
              const isSelected = selectedSeats.includes(seatId);
              return (
                <button
                  key={seatId}
                  className={`${styles.seat} ${isBooked ? styles.booked : ''} ${
                    isSelected ? styles.selected : ''
                  } ${!isBooked && !isSelected ? styles.available : ''}`}
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
    </div>
  );
};

export default CinemaHall;