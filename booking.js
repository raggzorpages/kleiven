// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, onValue, push, set } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Initialize Firebase
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

// Reference to the bookings in Firebase database
const bookingsRef = ref(db, 'bookings/');

// Function to render bookings to the table
function renderBookings(bookingsData) {
  const bookingTableBody = document.getElementById('booking-table-body');
  bookingTableBody.innerHTML = ''; // Clear previous data

  for (let id in bookingsData) {
    const booking = bookingsData[id];

    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${booking.bookingName}</td>
      <td>${booking.contact}</td>
      <td>${booking.dateFrom} to ${booking.dateTo}</td>
    `;
    bookingTableBody.appendChild(row);
  }
}

// Real-time listener for bookings
onValue(bookingsRef, (snapshot) => {
  const bookingsData = snapshot.val();
  if (bookingsData) {
    renderBookings(bookingsData);  // Update the table with new data in real-time
  } else {
    console.log("No bookings available.");
  }
});

// Function to add a new booking (called by the contact form)
export function addBooking(bookingName, contact, dateFrom, dateTo) {
  const newBookingRef = push(bookingsRef);  // Create a new booking reference
  set(newBookingRef, {
    bookingName: bookingName,
    contact: contact,
    dateFrom: dateFrom,
    dateTo: dateTo
  });
}
