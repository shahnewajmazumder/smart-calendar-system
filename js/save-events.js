// Enhanced saveEvent function
function saveEvent(e) {
    e.preventDefault();

    if (!currentUser) {
        showNotification("Please login to save events", "error");
        showLoginPage();
        return;
    }

    const eventData = {
        eventId: document.getElementById("eventId")?.value || 0,
        eventTitle: document.getElementById("eventTitle").value,
        startDate: document.getElementById("startDate").value,
        endDate: document.getElementById("endDate").value,
        startTime: document.getElementById("startTime")?.value || "09:00",
        endTime: document.getElementById("endTime")?.value || "17:00",
        eventCategory: document.getElementById("eventCategory").value,
        eventPriority: document.getElementById("eventPriority").value,
        eventDescription: document.getElementById("eventDescription").value,
        eventLocation: document.getElementById("eventLocation").value,
        userId: currentUser.id
    };

    console.log("Saving event:", eventData);

    // Handle photo upload
    const photoFile = document.getElementById("eventPhoto").files[0];
    
    // Create form data for PHP
    const formData = new FormData();
    Object.keys(eventData).forEach(key => {
        formData.append(key, eventData[key]);
    });
    
    if (photoFile) {
        formData.append('eventPhoto', photoFile);
    }

    // Show loading state
    const saveBtn = document.querySelector('#eventForm button[type="submit"]');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;

    // Send to PHP backend
    fetch('save_event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Save response:", data);
        if (data.status === 'success') {
            // Add to user events array
            if (data.event) {
                const newEvent = {
                    id: data.eventId,
                    title: data.event.title,
                    description: data.event.description,
                    date: data.event.date,
                    endDate: data.event.endDate,
                    startTime: data.event.startTime,
                    endTime: data.event.endTime,
                    category: data.event.category,
                    priority: data.event.priority,
                    location: data.event.location,
                    photo: data.event.photo,
                    userId: currentUser.id
                };

                // Remove existing event if editing
                userEvents = userEvents.filter(e => e.id != data.eventId);
                userEvents.push(newEvent);

                // Update events array for calendar
                events = [...indianFestivals, ...userEvents];

                // Save to localStorage as backup
                saveEventsToStorage();

                // Update UI
                renderCalendar();
                updateDashboard();
                loadUserEvents();
                loadProfileEvents();
                
                // Reset form
                document.getElementById("eventForm").reset();
                document.getElementById("photoPreview").style.display = "none";

                showNotification("Event saved successfully!", "success");
                
                // Return to dashboard
                showDashboard();
            }
        } else {
            showNotification(data.message || "Failed to save event", "error");
        }
    })
    .catch(error => {
        console.error('Save event error:', error);
        showNotification("Failed to save event. Please try again.", "error");
    })
    .finally(() => {
        // Reset button state
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    });
}

// Enhanced saveModalEvent function
function saveModalEvent(e) {
    e.preventDefault();

    if (!currentUser) {
        showNotification("Please login to save events", "error");
        return;
    }

    const eventData = {
        eventId: document.getElementById("modalEventId").value || 0,
        modalEventTitle: document.getElementById("modalEventTitle").value,
        modalStartDate: document.getElementById("modalStartDate").value,
        modalEndDate: document.getElementById("modalEndDate").value,
        modalStartTime: document.getElementById("modalStartTime").value || "09:00",
        modalEndTime: document.getElementById("modalEndTime").value || "17:00",
        modalEventCategory: document.getElementById("modalEventCategory").value,
        modalEventPriority: document.getElementById("modalEventPriority").value,
        modalEventDescription: document.getElementById("modalEventDescription").value,
        modalEventLocation: document.getElementById("modalEventLocation").value,
        userId: currentUser.id
    };

    console.log("Saving modal event:", eventData);

    // Handle photo upload for modal
    const photoFile = document.getElementById("modalEventPhoto").files[0];
    
    // Create form data for PHP
    const formData = new FormData();
    Object.keys(eventData).forEach(key => {
        formData.append(key, eventData[key]);
    });
    
    if (photoFile) {
        formData.append('modalEventPhoto', photoFile);
    }

    // Show loading state
    const saveBtn = document.querySelector('#modalEventForm button[type="submit"]');
    const originalText = saveBtn.innerHTML;
    saveBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    saveBtn.disabled = true;

    // Send to PHP backend
    fetch('save_event.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log("Modal save response:", data);
        if (data.status === 'success') {
            if (data.event) {
                const newEvent = {
                    id: data.eventId,
                    title: data.event.title,
                    description: data.event.description,
                    date: data.event.date,
                    endDate: data.event.endDate,
                    startTime: data.event.startTime,
                    endTime: data.event.endTime,
                    category: data.event.category,
                    priority: data.event.priority,
                    location: data.event.location,
                    photo: data.event.photo,
                    userId: currentUser.id
                };

                // Remove existing event if editing
                userEvents = userEvents.filter(e => e.id != data.eventId);
                userEvents.push(newEvent);

                // Update events array for calendar
                events = [...indianFestivals, ...userEvents];

                // Save to localStorage as backup
                saveEventsToStorage();

                // Update UI
                renderCalendar();
                updateDashboard();
                loadUserEvents();
                loadProfileEvents();
                
                closeEventModal();
                showNotification("Event saved successfully!", "success");
            }
        } else {
            showNotification(data.message || "Failed to save event", "error");
        }
    })
    .catch(error => {
        console.error('Modal save event error:', error);
        showNotification("Failed to save event. Please try again.", "error");
    })
    .finally(() => {
        // Reset button state
        saveBtn.innerHTML = originalText;
        saveBtn.disabled = false;
    });
}

// Enhanced loadUserEvents function
function loadUserEvents() {
    const userEventsList = document.getElementById("userEventsList");
    userEventsList.innerHTML = "";
    
    if (!userEvents || userEvents.length === 0) {
        userEventsList.innerHTML = '<div class="empty-state">You haven\'t created any events yet</div>';
        return;
    }
    
    // Sort events by date
    const sortedEvents = userEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    sortedEvents.forEach(event => {
        const eventElement = createEventElement(event);
        userEventsList.appendChild(eventElement);
    });
}

// Helper function to create event element
function createEventElement(event) {
    const eventElement = document.createElement("div");
    eventElement.classList.add("event-item");
    
    let eventDate;
    try {
        eventDate = new Date(event.date);
        if (isNaN(eventDate.getTime())) {
            throw new Error('Invalid date');
        }
    } catch (error) {
        console.error('Invalid date for event:', event);
        eventDate = new Date(); // Fallback to current date
    }
    
    const formattedDate = eventDate.toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric"
    });
    
    // Format time
    const startTime = event.startTime ? formatTime(event.startTime) : 'All Day';
    const endTime = event.endTime ? formatTime(event.endTime) : '';
    const timeDisplay = endTime ? `${startTime} - ${endTime}` : startTime;
    
    eventElement.innerHTML = `
        <div class="event-date">
            <div class="day">${eventDate.getDate()}</div>
            <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
        </div>
        <div class="event-details">
            <h4>${event.title || 'Untitled Event'}</h4>
            <p>${formattedDate} • ${timeDisplay}</p>
            <p>${event.location || 'No location specified'}</p>
            <small>${event.description || 'No description'}</small>
        </div>
        <div class="event-category ${event.category}">${event.category || 'personal'}</div>
        <button class="btn btn-danger btn-sm" onclick="deleteEvent(${event.id})">
            <i class="fas fa-trash"></i>
        </button>
    `;
    
    return eventElement;
}

// Enhanced formatTime function
function formatTime(timeString) {
    if (!timeString || timeString === '00:00' || timeString === '23:59') {
        return 'All Day';
    }
    
    try {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        
        return `${formattedHour}:${minutes} ${ampm}`;
    } catch (error) {
        return timeString;
    }
}

// Enhanced openAddEventModal function
function openAddEventModal(dateStr) {
    selectedDate = dateStr;
    document.getElementById("modalSelectedDate").value = dateStr;
    document.getElementById("modalEventId").value = "";
    document.getElementById("modalTitle").textContent = "Add New Event";
    editingEventId = null;

    // Reset form
    document.getElementById("modalEventForm").reset();
    document.getElementById("modalStartDate").value = dateStr;
    document.getElementById("modalEndDate").value = dateStr;
    document.getElementById("modalStartTime").value = "09:00";
    document.getElementById("modalEndTime").value = "17:00";
    document.getElementById("modalEventLocation").value = "";
    document.getElementById("modalEventDescription").value = "";

    eventModal.style.display = "flex";
}

// Enhanced loadEventsFromDatabase function
function loadEventsFromDatabase() {
    if (!currentUser) return;
    
    fetch(`get_events.php?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(data => {
        console.log("Loaded events from database:", data);
        if (data.status === 'success') {
            // Convert database events to frontend format
            const dbEvents = data.events.map(event => ({
                id: event.id,
                title: event.title,
                date: event.date,
                endDate: event.endDate,
                startTime: event.startTime,
                endTime: event.endTime,
                category: event.category,
                priority: event.priority,
                description: event.description,
                location: event.location,
                photo: event.photo,
                userId: event.userId
            }));
            
            userEvents = dbEvents;
            events = [...indianFestivals, ...userEvents];
            
            // Update localStorage with database events
            saveEventsToStorage();
            
            // Update UI
            renderCalendar();
            updateDashboard();
            loadUserEvents();
            loadProfileEvents();
            
            showNotification(`Loaded ${dbEvents.length} events from database`, "success");
        } else {
            console.error('Failed to load events:', data.message);
            // Fallback to localStorage
            loadEventsFromStorage();
        }
    })
    .catch(error => {
        console.error('Load events error:', error);
        // Fallback to localStorage
        loadEventsFromStorage();
    });
}

function testDatabaseConnection() {
    if (!currentUser) {
        console.log("Please login first");
        return;
    }
    
    console.log("Testing database connection...");
    
    fetch(`get_events.php?userId=${currentUser.id}`)
    .then(response => response.json())
    .then(data => {
        console.log("Database Response:", data);
        if (data.status === 'success') {
            console.log("✅ Database connection successful!");
            console.log("Events found:", data.events.length);
            data.events.forEach(event => {
                console.log(`- ${event.title} (${event.date})`);
            });
        } else {
            console.error("❌ Database error:", data.message);
        }
    })
    .catch(error => {
        console.error("❌ Connection failed:", error);
    });
}

// Call this after login to test
// testDatabaseConnection();
