class BookingService {
  static saveBooking(booking) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));
  }

  static getBookingsByMovieId(movieId) {
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    return bookings.filter((b) => b.movieId === movieId);
  }
}

export default BookingService;