import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={styles.cardContainer}
    >
      <div
        className={`${styles.card} ${flipped ? styles.flipped : ''}`}
        onClick={() => setFlipped(!flipped)}
      >
        <div className={styles.inner}>
          <div className={styles.front}>
            <img src={movie.poster} alt={movie.title} className={styles.poster} />
          </div>
          <div className={styles.back}>
            <h3 className={styles.title}>{movie.title}</h3>
            <p className={styles.description}>{movie.description}</p>
            <div className={styles.details}>
              <span className={styles.genre}>{movie.genre}</span>
              <span className={styles.rating}>★ {movie.rating}</span>
            </div>
            <div className={styles.showtimes}>
              {movie.showtimes.map((time, idx) => (
                <Link
                  key={idx}
                  to={`/booking/${movie.id}`}
                  className={styles.showtime}
                  onClick={(e) => e.stopPropagation()}
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;