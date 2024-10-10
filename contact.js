// Import the addBooking function from booking.js
import { addBooking } from './booking.js';

// Form submission handler
document.getElementById('contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  
  const bookingName = document.getElementById('bookingName').value;
  const contact = document.getElementById('contact').value;
  const dateFrom = document.getElementById('dateFrom').value;
  const dateTo = document.getElementById('dateTo').value;

  // Add the new booking to Firebase
  addBooking(bookingName, contact, dateFrom, dateTo);

  // Display success message
  alert('Booking submitted!');
  
  // Reset the form after submission
  document.getElementById('contact-form').reset();
});
