<?php
// Simple admin interface to manage system events
// This would be a separate admin panel
?>

<!DOCTYPE html>
<html>
<head>
    <title>System Events Management</title>
    <style>
        .admin-container { max-width: 1200px; margin: 0 auto; padding: 20px; }
        .event-list { border: 1px solid #ddd; padding: 15px; margin-bottom: 20px; }
        .event-item { padding: 10px; border-bottom: 1px solid #eee; }
        .system-badge { background: #ffd700; padding: 2px 8px; border-radius: 10px; }
    </style>
</head>
<body>
    <div class="admin-container">
        <h1>System Events Management</h1>
        <div id="systemEventsList">
            <!-- System events will be loaded here -->
        </div>
    </div>

    <script>
        // Load and display system events
        fetch('get_system_events.php')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    const eventsList = document.getElementById('systemEventsList');
                    eventsList.innerHTML = '<h3>System Events (' + data.events.length + ')</h3>';
                    
                    data.events.forEach(event => {
                        const eventItem = document.createElement('div');
                        eventItem.className = 'event-item';
                        eventItem.innerHTML = `
                            <strong>${event.title}</strong>
                            <span class="system-badge">${event.event_type}</span>
                            <br>Date: ${event.start_date} to ${event.end_date}
                            <br>Location: ${event.location}
                            <br>Category: ${event.category}
                        `;
                        eventsList.appendChild(eventItem);
                    });
                }
            });
    </script>
</body>
</html>