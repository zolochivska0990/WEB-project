import React from 'react';
import MovieList from '../components/MovieList';
import { movies } from '../data/movies';
import styles from './Home.module.css';

const Home = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.cinemaTitle}>
          <span className={styles.letter}>К</span>
          <span className={styles.letter}>І</span>
          <span className={styles.letter}>Н</span>
          <span className={styles.letter}>О</span>
          <span className={styles.letter}>Т</span>
          <span className={styles.letter}>Е</span>
          <span className={styles.letter}>А</span>
          <span className={styles.letter}>Т</span>
          <span className={styles.letter}>Р</span>
          <span className={styles.space}></span>
          <span className={styles.highlight}>BA</span>
        </h1>
        <div className={styles.marquee}>
          <div className={styles.track}>
            {movies.map((m, idx) => (
              <span key={idx} className={styles.movieName}>
                🎬 {m.title} • 
              </span>
            ))}
          </div>
        </div>
      </header>
      <div className={styles.moviesContainer}>
        <MovieList movies={movies} />
      </div>
    </div>
  );
};

export default Home;