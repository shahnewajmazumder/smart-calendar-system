// Global variables
let events = [];
let userEvents = [];
let holidays = [];
let currentDate = new Date();
let selectedDate = "";
let editingEventId = null;
let isLoggedIn = false;
let currentUser = null;

// DOM Elements
const calendarGrid = document.getElementById("calendarGrid");
const currentMonthElement = document.getElementById("currentMonth");
const eventModal = document.getElementById("eventModal");
const userEventsList = document.getElementById("userEventsList");
const upcomingEventsList = document.getElementById("upcomingEventsList");

// Indian Festivals and Events Data
const indianFestivals = [
    {
        id: 1,
        title: "Republic Day",
        date: "2024-01-26",
        endDate: "2024-01-26",
        category: "national",
        priority: "high",
        description: "Celebration of the Constitution of India. Grand parade at Kartavya Path, New Delhi showcasing military might and cultural diversity.",
        location: "Nationwide, main event in New Delhi",
        photo: "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=300&fit=crop",
    },
    {
        id: 2,
        title: "Holi",
        date: "2024-03-25",
        endDate: "2024-03-25",
        category: "religious",
        priority: "high",
        description: "Festival of colors celebrating victory of good over evil and arrival of spring. People play with colored powder and water.",
        location: "Nationwide",
        photo: "https://images.unsplash.com/photo-1548869207-216df6c2dcc4?w=500&h=300&fit=crop",
    },
    {
        id: 3,
        title: "Diwali",
        date: "2024-11-01",
        endDate: "2024-11-01",
        category: "religious",
        priority: "high",
        description: "Festival of Lights celebrating Lord Rama's return to Ayodhya. Homes decorated with diyas, fireworks, and sweets exchange.",
        location: "Nationwide",
        photo: "https://images.unsplash.com/photo-1604591259957-7e1e7b2d258f?w=500&h=300&fit=crop",
    }
];

// Initialize application
document.addEventListener("DOMContentLoaded", function () {
    checkLoginStatus();
    setupEventListeners();
    
    if (document.getElementById("calendarGrid")) {
        renderCalendar();
    }
    
    if (document.getElementById("upcomingEventsList")) {
        updateDashboard();
    }
});

function setupEventListeners() {
    // Calendar navigation
    if (document.getElementById("prevMonth")) {
        document.getElementById("prevMonth").addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        document.getElementById("nextMonth").addEventListener("click", () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

        document.getElementById("todayBtn").addEventListener("click", () => {
            currentDate = new Date();
            renderCalendar();
        });
    }

    // View options
    document.querySelectorAll(".view-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            document.querySelectorAll(".view-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");
            switchView(this.getAttribute("data-view"));
        });
    });

    // Modal controls
    if (document.getElementById("closeModal")) {
        document.getElementById("closeModal").addEventListener("click", closeEventModal);
        document.getElementById("modalCancelBtn").addEventListener("click", closeEventModal);
    }

    // Profile menu
    document.querySelectorAll(".profile-menu-link").forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const section = this.getAttribute("data-section");
            showProfileSection(section);
        });
    });

    // Navigation links
    document.querySelectorAll('a[href="#add-event"]').forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            showAddEventSection();
        });
    });

    document.querySelectorAll('a[href="#my-events"]').forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            showMyEventsSection();
        });
    });
}

function checkLoginStatus() {
    const userData = localStorage.getItem('currentUser');
    if (userData) {
        currentUser = JSON.parse(userData);
        isLoggedIn = true;
        updateUIForLoggedInUser();
        loadUserEvents();
    }
}

function updateUIForLoggedInUser() {
    const userMenu = document.getElementById("userMenu");
    const loginBtn = document.getElementById("loginBtn");
    const myEventsLink = document.getElementById("myEventsLink");

    if (userMenu) userMenu.style.display = "flex";
    if (loginBtn) loginBtn.style.display = "none";
    if (myEventsLink) myEventsLink.style.display = "block";

    if (currentUser && document.getElementById("userName")) {
        document.getElementById("userName").textContent = currentUser.name;
    }
}

function renderCalendar() {
    if (!calendarGrid) return;

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update current month display
    if (currentMonthElement) {
        currentMonthElement.textContent = `${currentDate.toLocaleString("default", { month: "long" })} ${year}`;
    }

    // Clear previous calendar
    calendarGrid.innerHTML = "";

    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Create empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement("div");
        emptyDay.classList.add("calendar-day");
        calendarGrid.appendChild(emptyDay);
    }

    // Create cells for each day of the month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day");

        // Format date for this day
        const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

        // Check if this day is today
        if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
            dayElement.classList.add("today");
        }

        // Day header with number and add button
        const dayHeader = document.createElement("div");
        dayHeader.classList.add("day-header");

        const dayNumber = document.createElement("span");
        dayNumber.classList.add("day-number");
        dayNumber.textContent = day;

        const addButton = document.createElement("button");
        addButton.classList.add("add-event-btn");
        addButton.innerHTML = "<i class='fas fa-plus'></i>";
        addButton.addEventListener("click", (e) => {
            e.stopPropagation();
            if (isLoggedIn) {
                openAddEventModal(dateStr);
            } else {
                showNotification("Please login to add events", "warning");
                window.location.href = "login.html";
            }
        });

        dayHeader.appendChild(dayNumber);
        dayHeader.appendChild(addButton);
        dayElement.appendChild(dayHeader);

        // Add events for this day
        const dayEvents = getEventsForDate(dateStr);

        // Show event count badge if there are events
        if (dayEvents.length > 0) {
            const eventCount = document.createElement("div");
            eventCount.classList.add("event-count");
            eventCount.textContent = dayEvents.length;
            dayElement.appendChild(eventCount);
        }

        // Check if this date has festivals
        const festivals = dayEvents.filter(event => 
            event.category === "festival" || event.category === "national"
        );

        if (festivals.length > 0) {
            const festivalBadge = document.createElement("div");
            festivalBadge.classList.add("festival-badge");
            festivalBadge.textContent = "🎉";
            dayElement.appendChild(festivalBadge);
        }

        // Events container
        const eventsContainer = document.createElement("div");
        eventsContainer.classList.add("events-container");

        if (dayEvents.length === 0) {
            const emptyState = document.createElement("div");
            emptyState.classList.add("empty-state");
            emptyState.textContent = "No events";
            eventsContainer.appendChild(emptyState);
        } else {
            dayEvents.forEach(event => {
                const eventElement = document.createElement("div");
                eventElement.classList.add("event", `event-${event.category}`);

                const eventTitle = document.createElement("span");
                eventTitle.textContent = event.title;

                eventElement.appendChild(eventTitle);

                // Add click event to view details
                eventElement.addEventListener("click", (e) => {
                    e.stopPropagation();
                    openEventDetails(event);
                });

                eventsContainer.appendChild(eventElement);
            });
        }

        dayElement.appendChild(eventsContainer);
        calendarGrid.appendChild(dayElement);
    }
}

function getEventsForDate(dateStr) {
    const allEvents = [...indianFestivals, ...userEvents];
    return allEvents.filter(event => {
        const eventDate = new Date(event.date || event.start_date);
        const eventEndDate = new Date(event.endDate || event.end_date);
        const currentDate = new Date(dateStr);

        return currentDate >= eventDate && currentDate <= eventEndDate;
    });
}

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

    eventModal.style.display = "flex";
}

function closeEventModal() {
    eventModal.style.display = "none";
    editingEventId = null;
}

function switchView(view) {
    showNotification(`Switching to ${view} view - This would show a specialized view for ${view}`, "info");
}

function showAddEventSection() {
    if (!isLoggedIn) {
        showNotification("Please login to add events", "warning");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("calendarView").style.display = "none";
    document.getElementById("addEventSection").style.display = "block";
    document.getElementById("myEventsSection").style.display = "none";
}

function showCalendarView() {
    document.getElementById("calendarView").style.display = "block";
    document.getElementById("addEventSection").style.display = "none";
    document.getElementById("myEventsSection").style.display = "none";
    renderCalendar();
}

function showMyEventsSection() {
    if (!isLoggedIn) {
        showNotification("Please login to view your events", "warning");
        window.location.href = "login.html";
        return;
    }

    document.getElementById("calendarView").style.display = "none";
    document.getElementById("addEventSection").style.display = "none";
    document.getElementById("myEventsSection").style.display = "block";
    loadUserEvents();
}

function loadUserEvents() {
    if (!userEventsList && !document.getElementById("profileEventsList")) return;

    const eventsContainer = userEventsList || document.getElementById("profileEventsList");
    eventsContainer.innerHTML = "";
    
    if (userEvents.length === 0) {
        eventsContainer.innerHTML = '<div class="empty-state">You haven\'t created any events yet</div>';
        return;
    }
    
    userEvents.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event-item");
        
        const eventDate = new Date(event.start_date || event.date);
        const formattedDate = eventDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric"
        });
        
        eventElement.innerHTML = `
            <div class="event-date">
                <div class="day">${eventDate.getDate()}</div>
                <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p>${formattedDate} • ${event.location || 'No location specified'}</p>
                <div class="event-actions">
                    <button class="event-action-btn edit-btn" data-id="${event.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="event-action-btn delete-btn" data-id="${event.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <div class="event-category">${event.category}</div>
        `;
        
        // Add event listeners for edit/delete buttons
        eventElement.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const eventId = e.target.closest('.edit-btn').dataset.id;
            editEvent(eventId);
        });
        
        eventElement.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const eventId = e.target.closest('.delete-btn').dataset.id;
            deleteEvent(eventId);
        });
        
        eventsContainer.appendChild(eventElement);
    });
}

function editEvent(eventId) {
    const event = userEvents.find(e => e.id == eventId);
    
    if (event) {
        editingEventId = event.id;
        
        document.getElementById("modalEventId").value = event.id;
        document.getElementById("modalEventTitle").value = event.title;
        document.getElementById("modalStartDate").value = event.start_date || event.date;
        document.getElementById("modalEndDate").value = event.end_date || event.endDate;
        document.getElementById("modalEventCategory").value = event.category;
        document.getElementById("modalEventPriority").value = event.priority;
        document.getElementById("modalEventDescription").value = event.description || '';
        document.getElementById("modalEventLocation").value = event.location || '';
        
        document.getElementById("modalTitle").textContent = "Edit Event";
        eventModal.style.display = "flex";
    }
}

function deleteEvent(eventId) {
    if (confirm("Are you sure you want to delete this event?")) {
        userEvents = userEvents.filter(event => event.id != eventId);
        saveUserEvents();
        loadUserEvents();
        renderCalendar();
        updateDashboard();
        showNotification("Event deleted successfully", "success");
    }
}

function saveUserEvents() {
    if (currentUser) {
        localStorage.setItem(`userEvents_${currentUser.id}`, JSON.stringify(userEvents));
    }
}

function loadUserEventsFromStorage() {
    if (currentUser) {
        const storedEvents = localStorage.getItem(`userEvents_${currentUser.id}`);
        if (storedEvents) {
            userEvents = JSON.parse(storedEvents);
        }
    }
}

function updateDashboard() {
    if (!upcomingEventsList) return;

    const allEvents = [...indianFestivals, ...userEvents];
    document.getElementById("totalEvents").textContent = allEvents.length;
    document.getElementById("upcomingEvents").textContent = getUpcomingEvents().length;
    document.getElementById("festivalsCount").textContent = getThisMonthFestivals().length;
    document.getElementById("activeUsers").textContent = isLoggedIn ? "1" : "0";

    updateUpcomingEventsList();
}

function getUpcomingEvents() {
    const today = new Date();
    const allEvents = [...indianFestivals, ...userEvents];
    return allEvents.filter(event => {
        const eventDate = new Date(event.date || event.start_date);
        return eventDate >= today;
    }).slice(0, 5);
}

function getThisMonthFestivals() {
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const allEvents = [...indianFestivals, ...userEvents];
    
    return allEvents.filter(event => {
        const eventDate = new Date(event.date || event.start_date);
        return (event.category === "festival" || event.category === "national") &&
               eventDate.getMonth() === currentMonth &&
               eventDate.getFullYear() === currentYear;
    });
}

function updateUpcomingEventsList() {
    if (!upcomingEventsList) return;

    upcomingEventsList.innerHTML = "";
    const upcomingEvents = getUpcomingEvents();
    
    if (upcomingEvents.length === 0) {
        upcomingEventsList.innerHTML = '<div class="empty-state">No upcoming events</div>';
        return;
    }
    
    upcomingEvents.forEach(event => {
        const eventElement = document.createElement("div");
        eventElement.classList.add("event-item");
        
        const eventDate = new Date(event.date || event.start_date);
        const formattedDate = eventDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric"
        });
        
        eventElement.innerHTML = `
            <div class="event-date">
                <div class="day">${eventDate.getDate()}</div>
                <div class="month">${eventDate.toLocaleString('default', { month: 'short' })}</div>
            </div>
            <div class="event-details">
                <h4>${event.title}</h4>
                <p>${formattedDate} • ${event.location || 'No location specified'}</p>
            </div>
            <div class="event-category">${event.category}</div>
        `;
        
        upcomingEventsList.appendChild(eventElement);
    });
}

function showProfileSection(section) {
    document.querySelectorAll(".profile-section").forEach(s => {
        s.classList.remove("active");
    });

    document.querySelectorAll(".profile-menu-link").forEach(link => {
        link.classList.remove("active");
    });

    document.getElementById(`${section}-section`).classList.add("active");
    document.querySelector(`.profile-menu-link[data-section="${section}"]`).classList.add("active");

    if (section === "my-events") {
        loadUserEvents();
    }
}

// Notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });

    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}
