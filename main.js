// main.js

console.log(supabase);

// Function to fetch equipment data from Supabase
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
      <p class="location">Location: ${item.location}</p>
      <p>${item.description}</p>
      <button onclick="addToReservation(${item.id})">Add to reservation</button>
      <img src="images/${item.image_url}" alt="${item.title}">
    `;

    equipmentContainer.appendChild(navCard);
  });
}

// Function to handle adding items to reservation
function addToReservation(equipmentId) {
  let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

  if (!reservations.includes(equipmentId)) {
    reservations.push(equipmentId);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    alert('Item added to reservation!');
  } else {
    alert('Item is already in your reservation!');
  }
}

// Event listener for Add Item modal and form submission
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

  // Handle form submission to add new equipment
  addItemForm.addEventListener('submit', async event => {
    event.preventDefault();

    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const location = document.getElementById('location').value.trim();
    const image_url = document.getElementById('image_url').value.trim();

    const { data, error } = await supabase
      .from('equipment')
      .insert([{ title, description, location, image_url }]);

    if (error) {
      console.error('Error adding item:', error);
      alert('There was an error adding the item.');
    } else {
      alert('Item added successfully!');
      modal.style.display = 'none';  // Close the modal
      addItemForm.reset();  // Reset the form
      fetchEquipment();  // Refresh the equipment list
    }
  });
});

// Call the function to fetch and display equipment
fetchEquipment();
