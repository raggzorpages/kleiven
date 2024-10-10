// Import the necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

// Your web app's Firebase configuration
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
const db = getDatabase(app);  // Initialize Realtime Database

// Function to generate unique IDs (could also use Firebase's built-in push IDs)
function generateId() {
    return 'id-' + Math.random().toString(36).substr(2, 9);
}

// DOMContentLoaded to ensure everything is loaded before running the script
document.addEventListener('DOMContentLoaded', function () {

    // Initialize the DayPilot Lite calendar
    const calendar = new DayPilot.Calendar("calendar");
    calendar.viewType = "Week";  // Set default view to Week
    calendar.heightSpec = "Full";  // Make it take full height

    // Function to load events from Firebase
    function loadEvents() {
        const eventsRef = ref(db, 'reservations');
        onValue(eventsRef, (snapshot) => {
            const events = [];
            snapshot.forEach((childSnapshot) => {
                const event = childSnapshot.val();
                events.push({
                    id: event.id,
                    text: event.text,
                    start: event.start,
                    end: event.end
                });
            });
            // Add the events to the calendar
            calendar.events.list = events;
            calendar.update();  // Update the calendar view
        });
    }

    // Render the calendar
    calendar.init();

    // Load events from Firebase on page load
    loadEvents();

    // Handle time range selection to create a new reservation
    calendar.onTimeRangeSelected = function (args) {
        const title = prompt("Enter the title of your reservation:");
        if (title) {
            const newEvent = {
                id: generateId(),
                text: title,
                start: args.start.toString(),
                end: args.end.toString()
            };

            // Add the event to Firebase
            const newEventRef = ref(db, 'reservations/' + newEvent.id);
            set(newEventRef, newEvent);

            // Add the event to the calendar
            calendar.events.add(newEvent);
        }
        calendar.clearSelection();  // Clear the selection after adding the event
    };

    // Function to remove events from Firebase
    calendar.onEventDelete = function (args) {
        const eventId = args.e.id();
        remove(ref(db, 'reservations/' + eventId));
        calendar.events.remove(eventId);
    };
});
