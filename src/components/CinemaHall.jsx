import { useState } from 'react';
import styles from './CinemaHall.module.css';

const CinemaHall = () => {
  const rows = 5;
  const seatsPerRow = 8;
  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, seat) => {
    const seatId = `${row}-${seat}`;
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
              return (
                <button
                  key={seatId}
                  className={`${styles.seat} ${isSelected ? styles.selected : ''}`}
                  onClick={() => toggleSeat(row, seat)}
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