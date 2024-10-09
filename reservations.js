// reservations.js

// Function to display reservations
async function displayReservations() {
  let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

  if (reservations.length === 0) {
    document.getElementById('reservation-container').innerHTML = '<p>No items in your reservation basket.</p>';
    return;
  }

  // Fetch equipment details for each reservation
  const { data: equipment, error } = await supabase
    .from('equipment')
    .select('*')
    .in('id', reservations);

  if (error) {
    console.error('Error fetching equipment:', error);
    return;
  }

  const container = document.getElementById('reservation-container');
  container.innerHTML = '';

  equipment.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('nav-card');
    itemDiv.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <button onclick="removeFromReservation(${item.id})">Remove</button>
    `;
    container.appendChild(itemDiv);
  });
}

// Function to remove items from reservation
function removeFromReservation(equipmentId) {
  let reservations = JSON.parse(localStorage.getItem('reservations')) || [];
  reservations = reservations.filter(id => id !== equipmentId);
  localStorage.setItem('reservations', JSON.stringify(reservations));
  displayReservations();
}

// Initial call to display reservations
displayReservations();
