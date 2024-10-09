// main.js

// Existing functions...

// Function to fetch equipment data
async function fetchEquipment() {
  const { data: equipment, error } = await supabase
    .from('equipment')
    .select('*');

  if (error) {
    console.error('Error fetching equipment:', error);
    return;
  }

  const equipmentContainer = document.getElementById('equipment-container');
  equipmentContainer.innerHTML = ''; // Clear existing content

  equipment.forEach(item => {
    // Create nav-card div
    const navCard = document.createElement('div');
    navCard.classList.add('nav-card');

    // Add content to nav-card
    navCard.innerHTML = `
      <h3>${item.title}</h3>
      <p class="location">Loc: ${item.location}</p>
      <p>${item.description}</p>
      <button onclick="addToReservation(${item.id})">Add to reservation</button>
      <img src="images/${item.image_url}" alt="${item.title}">
    `;

    equipmentContainer.appendChild(navCard);
  });
}

// Function to handle adding items to reservation
function addToReservation(equipmentId) {
  // Retrieve existing reservations from localStorage
  let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

  // Add the new equipment ID to the reservations if not already present
  if (!reservations.includes(equipmentId)) {
    reservations.push(equipmentId);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    alert('Item added to reservation!');
  } else {
    alert('Item is already in your reservation!');
  }
}

// Event listeners for Add Item modal
document.addEventListener('DOMContentLoaded', () => {
  const addItemButton = document.getElementById('add-item-button');
  const modal = document.getElementById('modal');
  const closeModal = document.getElementById('close-modal');
  const addItemForm = document.getElementById('add-item-form');

  // Open modal when Add Item button is clicked
  addItemButton.addEventListener('click', () => {
    modal.style.display = 'block';
  });

  // Close modal when close button is clicked
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside the modal content
  window.addEventListener('click', event => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Handle form submission
  addItemForm.addEventListener('submit', async event => {
    event.preventDefault();

    // Get form values
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const location = document.getElementById('location').value.trim();
    const image_url = document.getElementById('image_url').value.trim();

    // Insert new item into Supabase
    const { data, error } = await supabase
      .from('equipment')
      .insert([{ title, description, location, image_url }]);

    if (error) {
      console.error('Error adding item:', error);
      alert('There was an error adding the item.');
    } else {
      alert('Item added successfully!');
      // Close the modal
      modal.style.display = 'none';
      // Reset the form
      addItemForm.reset();
      // Refresh the equipment list
      fetchEquipment();
    }
  });
});

// Call the function to fetch and display equipment
fetchEquipment();
