// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, get, child, push } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3nmngHjP8vAlkfr_T9cw52ZyyJyoWmKU",
  authDomain: "kleiven-d995b.firebaseapp.com",
  databaseURL: "https://kleiven-d995b-default-rtdb.europe-west1.firebasedatabase.app",  // Updated to correct region
  projectId: "kleiven-d995b",
  storageBucket: "kleiven-d995b.appspot.com",
  messagingSenderId: "790753027743",
  appId: "1:790753027743:web:ab93c56a9671e6a4e9a4aa",
  measurementId: "G-Q14Q0XLGS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);  // Initialize Firebase Analytics (optional)
const db = getDatabase(app);  // Initialize Realtime Database

// Function to add new equipment to the database
async function addEquipment(title, description, location, imageUrl) {
  try {
    const newEquipmentRef = push(ref(db, 'equipment/'));
    await set(newEquipmentRef, {
      title: title,
      description: description,
      location: location,
      image_url: imageUrl
    });
    alert('Equipment added successfully!');
  } catch (error) {
    console.error("Error adding equipment:", error);
    alert("Failed to add equipment.");
  }
}

// Function to fetch and display equipment from the database
async function fetchEquipment() {
  const dbRef = ref(db);
  try {
    const snapshot = await get(child(dbRef, `equipment/`));
    if (snapshot.exists()) {
      const equipmentData = snapshot.val();
      const equipmentContainer = document.getElementById('equipment-container');
      equipmentContainer.innerHTML = '';  // Clear previous content

      for (let id in equipmentData) {
        const item = equipmentData[id];
        const equipmentCard = document.createElement('div');
        equipmentCard.classList.add('nav-card');
        equipmentCard.innerHTML = `
          <h3>${item.title}</h3>
          <p>Location: ${item.location}</p>
          <p>${item.description}</p>
          <img src="images/${item.image_url}" alt="${item.title}" style="width: 100px;">
        `;
        equipmentContainer.appendChild(equipmentCard);
      }
    } else {
      console.log("No equipment data available");
    }
  } catch (error) {
    console.error("Error fetching equipment:", error);
  }
}

// Fetch equipment on page load
document.addEventListener("DOMContentLoaded", fetchEquipment);

// Add event listener to the equipment form
document.getElementById('equipment-form').addEventListener('submit', function (event) {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const location = document.getElementById('location').value.trim();
  const imageUrl = document.getElementById('image_url').value.trim();
  addEquipment(title, description, location, imageUrl);
  document.getElementById('equipment-form').reset();
});
