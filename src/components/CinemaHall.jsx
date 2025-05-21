import { useState } from 'react';
import styles from './CinemaHall.module.css';

const CinemaHall = ({ onSeatsSelected, bookedSeats = [], selectedSeats = [], movieTitle }) => {
  const rows = 5;
  const seatsPerRow = 8;
  const prices = [120, 150, 180, 220, 260]; // Ціни за рядами

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
      <h3 className={styles.movieTitle}>{movieTitle}</h3>
      <div className={styles.screen}>ЕКРАН</div>
      
      <div className={styles.seatsContainer}>
        {Array.from({ length: rows }).map((_, row) => (
          <div key={`row-${row}`} className={styles.row}>
            <div className={styles.rowLabel}>
              <span className={styles.rowNumber}>Ряд {row + 1}</span>
              <span className={styles.rowPrice}>{prices[row]} грн</span>
            </div>
            <div className={styles.seatsRow}>
              {Array.from({ length: seatsPerRow }).map((_, seat) => {
                const seatId = `${row}-${seat}`;
                const isBooked = bookedSeats.includes(seatId);
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <button
                    key={seatId}
                    className={`${styles.seat} ${
                      isBooked 
                        ? styles.booked 
                        : isSelected 
                          ? styles.selected 
                          : styles.available
                    }`}
                    onClick={() => toggleSeat(row, seat)}
                    disabled={isBooked}
                    aria-label={`Місце ${seat + 1}, Ряд ${row + 1}`}
                  >
                    {seat + 1}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.available}`}></div>
          <span>Вільні</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.selected}`}></div>
          <span>Вибрані</span>
        </div>
        <div className={styles.legendItem}>
          <div className={`${styles.legendColor} ${styles.booked}`}></div>
          <span>Зайняті</span>
        </div>
      </div>
    </div>
  );
};

export default CinemaHall;