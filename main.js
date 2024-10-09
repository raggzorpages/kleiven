// main.js

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

  // Add the new equipment ID to the reservations
  reservations.push(equipmentId);

  // Save back to localStorage
  localStorage.setItem('reservations', JSON.stringify(reservations));

  // Provide feedback to the user
  alert('Item added to reservation!');
}

// Call the function to fetch and display equipment
fetchEquipment();
