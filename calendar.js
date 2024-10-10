// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize Flatpickr on the input element with id "calendar"
    flatpickr("#calendar", {
        dateFormat: "Y-m-d", // Set the date format to Year-Month-Day
        minDate: "today",    // Prevent past dates from being selectable
        defaultDate: null,   // No default date, allows the user to pick any future date
        onChange: function(selectedDates, dateStr, instance) {
            // This function is triggered whenever a date is selected
            console.log('Selected date: ' + dateStr); // Log the selected date
            alert('You have selected: ' + dateStr);   // Alert the user of the selected date
        }
    });
});
