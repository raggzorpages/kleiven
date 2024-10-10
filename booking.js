// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, onValue, push, set, remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3nmngHjP8vAlkfr_T9cw52ZyyJyoWmKU",
  authDomain: "kleiven-d995b.firebaseapp.com",
  databaseURL: "https://kleiven-d995b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kleiven-d995b",
  storageBucket: "kleiven-d995b.appspot.com",
  messagingSenderId: "790753027743",
  appId: "1:790753027743:web:ab93c56a9671e6a4e9a4aa",
  measurementId: "G-Q14Q0XLGS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Reference to bookings in Firebase
const bookingsRef = ref(db, 'bookings/');

// Export function to add a booking
export function addBooking(bookingName, contact, dateFrom, dateTo) {
  const newBookingRef = push(bookingsRef);  // Create a new booking reference
  set(newBookingRef, {
    bookingName: bookingName,
    contact: contact,
    dateFrom: dateFrom,
    dateTo: dateTo
  }).then(() => {
    console.log("Booking added to Firebase:", bookingName, contact, dateFrom, dateTo);
  }).catch((error) => {
    console.error("Error adding booking to Firebase:", error);
  });
}

// Function to delete a booking from Firebase
export function deleteBooking(bookingId) {
  const bookingRef = ref(db, 'bookings/' + bookingId);
  remove(bookingRef)
    .then(() => {
      console.log(`Booking with ID: ${bookingId} deleted successfully.`);
    })
    .catch((error) => {
      console.error("Error deleting booking:", error);
    });
}

// Function to render bookings in the booking table
export function renderBookings(bookingsData) {
  const bookingTableBody = document.getElementById('booking-table-body');
  bookingTableBody.innerHTML = '';  // Clear previous data

  for (let id in bookingsData) {
    const booking = bookingsData[id];

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${booking.bookingName}</td>
      <td>${booking.contact}</td>
      <td>${booking.dateFrom} to ${booking.dateTo}</td>
      <td><button class="delete-button" data-id="${id}">Delete</button></td>  <!-- Add delete button -->
    `;
    bookingTableBody.appendChild(row);
  }

  // Add event listeners to the delete buttons
  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function () {
      const bookingId = this.getAttribute('data-id');
      deleteBooking(bookingId);  // Call delete function
    });
  });
}

// Real-time listener to update the booking table and calendar
onValue(bookingsRef, (snapshot) => {
  const bookingsData = snapshot.val();
  if (bookingsData) {
    renderBookings(bookingsData);  // Update the booking table with new data
    renderCalendar(bookingsData);  // Pass bookings data to the calendar
  } else {
    console.log("No bookings available.");
  }
});
