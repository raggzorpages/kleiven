// Import the functions you need from the SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";

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
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Render equipment to the page
function renderEquipment(equipmentData) {
  const equipmentContainer = document.getElementById('equipment-container');
  equipmentContainer.innerHTML = '';  // Clear previous content

  for (let id in equipmentData) {
    const item = equipmentData[id];
    const equipmentCard = document.createElement('div');
    equipmentCard.classList.add('nav-card');
    equipmentCard.innerHTML = `
      <h3>${item.title}</h3>
      <p>Price per day: ${item.price_per_day}</p>
      <p>Amount: ${item.amount}</p>
      <p>Product Info: ${item.product_info}</p>
      <p>Category: ${item.category}</p>
      <p>Location: ${item.location}</p>
      <img src="images/${item.image_url}" alt="${item.title}" style="width: 150px;">
      <button class="remove-button" data-id="${id}">Remove</button>
    `;
    equipmentContainer.appendChild(equipmentCard);
  }

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach(button => {
    button.addEventListener('click', function () {
      const equipmentId = this.getAttribute('data-id');
      removeEquipment(equipmentId);
    });
  });
}

// Remove equipment from Firebase
function removeEquipment(equipmentId) {
  const equipmentRef = ref(db, 'equipment/' + equipmentId);
  remove(equipmentRef)
    .then(() => {
      console.log(`Equipment with ID: ${equipmentId} removed successfully.`);
      alert('Equipment removed successfully!');
    })
    .catch((error) => {
      console.error("Error removing equipment:", error);
      alert('Failed to remove equipment.');
    });
}

// Real-time listener for equipment data
function setupRealtimeListener() {
  const equipmentRef = ref(db, 'equipment/');
  onValue(equipmentRef, (snapshot) => {
    const equipmentData = snapshot.val();
    if (equipmentData) {
      renderEquipment(equipmentData);  // Update the UI with new data in real-time
    } else {
      console.log("No equipment data available");
    }
  });
}

// Add new equipment to Firebase
async function addEquipment(title, pricePerDay, amount, productInfo, category, location, imageUrl) {
  try {
    const newEquipmentRef = push(ref(db, 'equipment/'));
    await set(newEquipmentRef, {
      title: title,
      price_per_day: pricePerDay,
      amount: amount,
      product_info: productInfo,
      category: category,
      location: location,
      image_url: imageUrl
    });

    alert('Equipment added successfully!');
  } catch (error) {
    console.error("Error adding equipment:", error);
    alert("Failed to add equipment.");
  }
}

// Event listener for form submission
document.getElementById('equipment-form').addEventListener('submit', async function (event) {
  event.preventDefault();
  const title = document.getElementById('title').value.trim();
  const pricePerDay = document.getElementById('price_per_day').value.trim();
  const amount = document.getElementById('amount').value.trim();
  const productInfo = document.getElementById('product_info').value.trim();
  const category = document.getElementById('category').value.trim();
  const location = document.getElementById('location').value.trim();
  const imageUrl = document.getElementById('image_url').value.trim();

  await addEquipment(title, pricePerDay, amount, productInfo, category, location, imageUrl);
  document.getElementById('equipment-form').reset();
});

// Fetch and display equipment in real-time on page load
document.addEventListener("DOMContentLoaded", setupRealtimeListener);
