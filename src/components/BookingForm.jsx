import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './BookingForm.module.css';
import BookingService from '../services/BookingService';

const BookingForm = ({ movieId, selectedSeats, onBookingSuccess }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!name || !phone || !email) {
      setError('Усі поля є обов’язковими!');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Неправильний формат email!');
      return false;
    }
    if (!/^\+?\d{10,12}$/.test(phone)) {
      setError('Неправильний формат телефону (10-12 цифр, опціонально з +)!');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && selectedSeats.length > 0) {
      const booking = { movieId, name, phone, email, seats: selectedSeats, timestamp: new Date().toISOString() };
      BookingService.saveBooking(booking);
      toast.success(`Бронювання для ${name} на ${selectedSeats.join(', ')} успішне!`);
      onBookingSuccess(booking);
      setName('');
      setPhone('');
      setEmail('');
    } else if (selectedSeats.length === 0) {
      setError('Оберіть хоча б одне місце!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}
      <input
        type="text"
        placeholder="Ваше ім’я"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className={styles.input}
      />
      <input
        type="tel"
        placeholder="Телефон (наприклад, +380xxxxxxxxx)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className={styles.input}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>Забронювати</button>
    </form>
  );
};

export default BookingForm;