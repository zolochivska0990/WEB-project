import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './BookingForm.module.css';

const BookingForm = ({ movieId, selectedSeats, onBookingSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Ім'я є обов'язковим";
    if (!formData.phone.trim()) newErrors.phone = "Телефон є обов'язковим";
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Email має бути у правильному форматі";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm() && selectedSeats.length > 0) {
      onBookingSuccess(formData);
      toast.success('Бронювання успішно збережено!', {
        position: 'top-right',
      });
      setFormData({ name: '', phone: '', email: '' });
    } else if (selectedSeats.length === 0) {
      toast.error('Виберіть хоча б одне місце!', {
        position: 'top-right',
      });
    }
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.title}>Дані для бронювання</h3>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label htmlFor="name">Ім'я</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="phone">Телефон</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && <p className={styles.error}>{errors.email}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Забронювати
        </button>
      </form>
    </div>
  );
};

export default BookingForm;