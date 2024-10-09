// Initialize Firebase with your config (this config should match the one in your Firebase project)
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
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Function to fetch and display equipment from Firestore
async function fetchEquipment() {
  const equipmentContainer = document.getElementById('equipment-container');
  equipmentContainer.innerHTML = ''; // Clear any existing content

  try {
    // Fetch all documents from the 'equipment' collection in Firestore
    const querySnapshot = await db.collection("equipment").get();
    querySnapshot.forEach((doc) => {
      const item = doc.data(); // Extract data from Firestore document

      // Create a card for each equipment item
      const equipmentCard = document.createElement('div');
      equipmentCard.classList.add('nav-card');
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
    // Add new document to the 'equipment' collection in Firestore
    await db.collection("equipment").add({
      title,
      description,
      location,
      image_url: imageUrl
    });

    // Refresh the equipment list
    fetchEquipment();

    // Clear the form after submission
    document.getElementById('equipment-form').reset();

    alert("Equipment added successfully!");

  } catch (error) {
    console.error("Error adding equipment:", error);
    alert("Failed to add equipment.");
  }
}

// Fetch equipment when the page loads
document.addEventListener("DOMContentLoaded", fetchEquipment);

// Listen for form submission
document.getElementById('equipment-form').addEventListener('submit', addEquipment);
