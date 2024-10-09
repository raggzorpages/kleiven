// Import Firebase SDK and Firestore functions from the CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getFirestore, collection, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

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

// Function to fetch and display equipment from Firestore
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

// Function to handle adding new equipment
async function addEquipment(event) {
  event.preventDefault(); // Prevent the form from refreshing the page

  // Get form values
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const location = document.getElementById('location').value.trim();
  const imageUrl = document.getElementById('image_url').value.trim();

  try {
    // Add new document to the 'equipment' collection
    await addDoc(collection(db, "equipment"), {
      title,
      description,
      location,
      image_url: imageUrl
    });

    // Close the modal
    closeModal();

    // Refresh the equipment list
    fetchEquipment();
    
    alert("Equipment added successfully!");

  } catch (error) {
    console.error("Error adding equipment:", error);
    alert("Failed to add equipment.");
  }
}

// Modal Handling
const modal = document.getElementById("equipmentModal");
const openModalButton = document.getElementById("openModalButton");
const closeModalButton = document.getElementsByClassName("close-button")[0];

function openModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}

// Open modal when button is clicked
openModalButton.addEventListener('click', openModal);

// Close modal when 'x' button is clicked
closeModalButton.addEventListener('click', closeModal);

// Close modal if clicking outside the modal content
window.addEventListener('click', (event) => {
  if (event.target == modal) {
    closeModal();
  }
});

// Fetch equipment when the page loads
document.addEventListener("DOMContentLoaded", fetchEquipment);

// Listen for form submission
document.getElementById('equipment-form').addEventListener('submit', addEquipment);
