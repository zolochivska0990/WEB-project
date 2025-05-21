import { useState } from 'react';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import styles from './BookingForm.module.css';
import BookingService from '../services/BookingService';

const BookingForm = ({ movieId, selectedSeats, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Введіть ім'я";
    if (!formData.phone.trim()) newErrors.phone = "Введіть телефон";
    else if (!/^\+?\d{10,12}$/.test(formData.phone)) {
      newErrors.phone = "Невірний формат телефону";
    }
    if (!formData.email.trim()) newErrors.email = "Введіть email";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      const booking = {
        movieId,
        ...formData,
        seats: selectedSeats,
        timestamp: new Date().toISOString()
      };
      
      await BookingService.saveBooking(booking);
      toast.success(`Бронювання на ${formData.name} успішне!`);
      onBookingSuccess(booking);
      setFormData({ name: '', phone: '', email: '' });
    } catch (error) {
      toast.error('Помилка при бронюванні');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      className={styles.form}
    >
      <h3 className={styles.formTitle}>Оформлення бронювання</h3>
      
      <div className={styles.inputGroup}>
        <label htmlFor="name">Ім'я</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={`${styles.input} ${errors.name ? styles.errorInput : ''}`}
          placeholder="Ваше ім'я"
        />
        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone">Телефон</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className={`${styles.input} ${errors.phone ? styles.errorInput : ''}`}
          placeholder="+380XXXXXXXXX"
        />
        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`${styles.input} ${errors.email ? styles.errorInput : ''}`}
          placeholder="your@email.com"
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.selectedSeats}>
        <h4>Вибрані місця:</h4>
        <div className={styles.seatsList}>
          {selectedSeats.map((seatId, index) => {
            const [row, seat] = seatId.split('-');
            return (
              <span key={index} className={styles.seatBadge}>
                Ряд {parseInt(row) + 1}, Місце {parseInt(seat) + 1}
              </span>
            );
          })}
        </div>
      </div>

      <motion.button
        type="submit"
        className={styles.submitButton}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Обробка...' : 'Підтвердити бронювання'}
      </motion.button>
    </motion.form>
  );
};

export default BookingForm;