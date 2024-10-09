// Import Firebase SDK and Firestore functions from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC3nmngHjP8vAlkfr_T9cw52ZyyJyoWmKU",
  authDomain: "kleiven-d995b.firebaseapp.com",
  projectId: "kleiven-d995b",
  storageBucket: "kleiven-d995b.appspot.com",
  messagingSenderId: "790753027743",
  appId: "1:790753027743:web:ab93c56a9671e6a4e9a4aa",
  measurementId: "G-Q14Q0XLGS6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch equipment from Firestore and display it in the HTML
async function fetchEquipment() {
  const equipmentContainer = document.getElementById('equipment-container');
  equipmentContainer.innerHTML = ''; // Clear any existing content

  try {
    // Fetch all documents from the 'equipment' collection
    const querySnapshot = await getDocs(collection(db, "equipment"));
    querySnapshot.forEach((doc) => {
      const item = doc.data(); // Extract data from Firestore document

      // Create a card for each equipment item
      const equipmentCard = document.createElement('div');
      equipmentCard.innerHTML = `
        <h3>${item.title}</h3>
        <p>Location: ${item.location}</p>
        <p>${item.description}</p>
        <img src="images/${item.image_url}" alt="${item.title}" style="width: 100px;">
      `;
      
      // Append the new equipment card to the container
      equipmentContainer.appendChild(equipmentCard);
    });
  } catch (error) {
    console.error("Error fetching equipment:", error);
  }
}

// Fetch and display equipment when the page loads
document.addEventListener("DOMContentLoaded", fetchEquipment);
