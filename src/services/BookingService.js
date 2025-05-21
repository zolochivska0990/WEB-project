const BOOKINGS_KEY = 'cinema_bookings';

export const BookingService = {
  // Отримати заброньовані місця для фільму за ID
  getBookingsForMovie(movieId) {
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || {};
    return bookings[movieId] || [];
  },

  // Зберегти бронювання
  saveBooking(movieId, seats, userData) {
    const bookings = JSON.parse(localStorage.getItem(BOOKINGS_KEY)) || {};
    if (!bookings[movieId]) {
      bookings[movieId] = [];
    }
    bookings[movieId].push({ seats, userData });
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  },
};