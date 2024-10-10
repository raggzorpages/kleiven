// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize DayPilot Lite calendar
    var calendar = new DayPilot.Calendar("calendar");

    // Set the view type to show a weekly calendar
    calendar.viewType = "Week";  // You can change this to "Day" or "Month" as needed

    // Set calendar height
    calendar.heightSpec = "Full";

    // Add example events to the calendar
    calendar.events.list = [
        {
            id: "1",
            text: "Reservation 1",
            start: "2024-10-15T10:30:00",
            end: "2024-10-15T12:30:00"
        },
        {
            id: "2",
            text: "Reservation 2",
            start: "2024-10-22T09:00:00",
            end: "2024-10-22T11:00:00"
        }
    ];

    // Render the calendar
    calendar.init();

    // Optional: handle date/time selection to allow for user interaction
    calendar.onTimeRangeSelected = function(args) {
        var title = prompt("Enter the title of your reservation:");
        if (title) {
            calendar.events.add({
                id: DayPilot.guid(),
                text: title,
                start: args.start,
                end: args.end
            });
        }
        calendar.clearSelection();
    };
});
