// Enhanced Calendar functionality
class SmartCalendar {
    constructor() {
        this.currentDate = new Date();
        this.events = [];
        this.userEvents = [];
        this.holidays = [];
        this.isLoggedIn = false;
        this.currentUser = null;
    }

    init() {
        this.checkLoginStatus();
        this.setupEventListeners();
        this.loadHolidays();
        this.renderCalendar();
    }

    checkLoginStatus() {
        const userData = localStorage.getItem('currentUser');
        if (userData) {
            this.currentUser = JSON.parse(userData);
            this.isLoggedIn = true;
            this.loadUserEvents();
        }
    }

    setupEventListeners() {
        // Calendar navigation
        document.getElementById('prevMonth')?.addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth')?.addEventListener('click', () => this.nextMonth());
        document.getElementById('todayBtn')?.addEventListener('click', () => this.goToToday());

        // Quick event actions
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-add-event')) {
                this.handleQuickAddEvent(e);
            }
        });
    }

    async loadHolidays() {
        try {
            const response = await fetch('php/events.php');
            const data = await response.json();
            
            if (data.success) {
                this.holidays = data.holidays;
                this.renderCalendar();
            }
        } catch (error) {
            console.error('Error loading holidays:', error);
            this.showNotification('Error loading holidays', 'error');
        }
    }

    async loadUserEvents() {
        if (!this.currentUser) return;

        try {
            const response = await fetch(`php/user_events.php?user_id=${this.currentUser.id}`);
            const data = await response.json();
            
            if (data.success) {
                this.userEvents = data.events;
                this.renderCalendar();
                this.updateDashboard();
            }
        } catch (error) {
            console.error('Error loading user events:', error);
            // Fallback to localStorage
            this.loadUserEventsFromStorage();
        }
    }

    loadUserEventsFromStorage() {
        if (this.currentUser) {
            const storedEvents = localStorage.getItem(`userEvents_${this.currentUser.id}`);
            if (storedEvents) {
                this.userEvents = JSON.parse(storedEvents);
                this.renderCalendar();
                this.updateDashboard();
            }
        }
    }

    renderCalendar() {
        const calendarGrid = document.getElementById('calendarGrid');
        if (!calendarGrid) return;

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Update current month display
        const currentMonthElement = document.getElementById('currentMonth');
        if (currentMonthElement) {
            currentMonthElement.textContent = this.formatMonthYear(this.currentDate);
        }

        // Clear previous calendar
        calendarGrid.innerHTML = '';

        // Get calendar data
        const calendarData = this.generateCalendarData(year, month);

        // Render calendar
        calendarData.forEach(day => {
            const dayElement = this.createDayElement(day);
            calendarGrid.appendChild(dayElement);
        });
    }

    generateCalendarData(year, month) {
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const today = new Date();
        
        const calendarData = [];

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDay; i++) {
            calendarData.push({ isEmpty: true });
        }

        // Add days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const date = new Date(year, month, day);
            const isToday = this.isSameDate(date, today);
            const events = this.getEventsForDate(dateStr);

            calendarData.push({
                date,
                dateStr,
                day,
                isToday,
                events,
                isEmpty: false
            });
        }

        return calendarData;
    }

    createDayElement(dayData) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        if (dayData.isEmpty) {
            return dayElement;
        }

        if (dayData.isToday) {
            dayElement.classList.add('today');
        }

        // Day header
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';

        const dayNumber = document.createElement('span');
        dayNumber.className = 'day-number';
        dayNumber.textContent = dayData.day;

        const addButton = document.createElement('button');
        addButton.className = 'add-event-btn';
        addButton.innerHTML = '<i class="fas fa-plus"></i>';
        addButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.handleAddEvent(dayData.dateStr);
        });

        dayHeader.appendChild(dayNumber);
        dayHeader.appendChild(addButton);
        dayElement.appendChild(dayHeader);

        // Events container
        const eventsContainer = this.createEventsContainer(dayData);
        dayElement.appendChild(eventsContainer);

        return dayElement;
    }

    createEventsContainer(dayData) {
        const eventsContainer = document.createElement('div');
        eventsContainer.className = 'events-container';

        if (dayData.events.length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.textContent = 'No events';
            eventsContainer.appendChild(emptyState);
        } else {
            // Show event count badge
            if (dayData.events.length > 0) {
                const eventCount = document.createElement('div');
                eventCount.className = 'event-count';
                eventCount.textContent = dayData.events.length;
                eventsContainer.parentElement.appendChild(eventCount);
            }

            // Check for festivals
            const festivals = dayData.events.filter(event => 
                event.category === 'festival' || event.category === 'national'
            );

            if (festivals.length > 0) {
                const festivalBadge = document.createElement('div');
                festivalBadge.className = 'festival-badge';
                festivalBadge.textContent = '🎉';
                eventsContainer.parentElement.appendChild(festivalBadge);
            }

            // Add events
            dayData.events.forEach(event => {
                const eventElement = this.createEventElement(event);
                eventsContainer.appendChild(eventElement);
            });
        }

        return eventsContainer;
    }

    createEventElement(event) {
        const eventElement = document.createElement('div');
        eventElement.className = `event event-${event.category}`;
        
        const eventTitle = document.createElement('span');
        eventTitle.textContent = event.title;
        eventElement.appendChild(eventTitle);

        eventElement.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showEventDetails(event);
        });

        return eventElement;
    }

    getEventsForDate(dateStr) {
        const allEvents = [...this.holidays, ...this.userEvents];
        return allEvents.filter(event => {
            const eventDate = new Date(event.date || event.start_date);
            const eventEndDate = new Date(event.endDate || event.end_date);
            const currentDate = new Date(dateStr);

            return currentDate >= eventDate && currentDate <= eventEndDate;
        });
    }

    isSameDate(date1, date2) {
        return date1.getDate() === date2.getDate() &&
               date1.getMonth() === date2.getMonth() &&
               date1.getFullYear() === date2.getFullYear();
    }

    formatMonthYear(date) {
        return date.toLocaleString('default', { month: 'long', year: 'numeric' });
    }

    previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.renderCalendar();
    }

    goToToday() {
        this.currentDate = new Date();
        this.renderCalendar();
    }

    handleAddEvent(dateStr) {
        if (!this.isLoggedIn) {
            this.showNotification('Please login to add events', 'warning');
            window.location.href = 'login.html';
            return;
        }

        // Open event modal with pre-filled date
        if (typeof openAddEventModal === 'function') {
            openAddEventModal(dateStr);
        }
    }

    handleQuickAddEvent(e) {
        const dateStr = e.target.dataset.date;
        this.handleAddEvent(dateStr);
    }

    showEventDetails(event) {
        // Create and show event details modal
        const modal = this.createEventDetailsModal(event);
        document.body.appendChild(modal);
    }

    createEventDetailsModal(event) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.display = 'flex';

        const formattedDate = this.formatEventDate(event);

        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-info-circle"></i> ${event.title}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="event-details">
                    ${event.photo ? `<img src="${event.photo}" class="event-image" alt="${event.title}" />` : ''}
                    <div class="event-info">
                        <h4>Event Information</h4>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">Date</span>
                                <span class="info-value">${formattedDate}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Category</span>
                                <span class="info-value">${this.capitalizeFirst(event.category)}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Location</span>
                                <span class="info-value">${event.location || 'Not specified'}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Priority</span>
                                <span class="info-value">${this.capitalizeFirst(event.priority)}</span>
                            </div>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Description</label>
                        <div style="padding: 15px; background: #f8f9fa; border-radius: 8px; min-height: 100px;">
                            ${event.description || 'No description available.'}
                        </div>
                    </div>
                    ${event.user_id ? `
                    <div class="form-actions">
                        <button type="button" class="btn btn-primary" id="editEventBtn">
                            <i class="fas fa-edit"></i> Edit Event
                        </button>
                        <button type="button" class="btn btn-danger" id="deleteEventBtn">
                            <i class="fas fa-trash"></i> Delete Event
                        </button>
                    </div>
                    ` : ''}
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        if (event.user_id) {
            modal.querySelector('#editEventBtn').addEventListener('click', () => {
                this.editEvent(event);
                modal.remove();
            });

            modal.querySelector('#deleteEventBtn').addEventListener('click', () => {
                this.deleteEvent(event);
                modal.remove();
            });
        }

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        return modal;
    }

    formatEventDate(event) {
        const startDate = new Date(event.start_date || event.date);
        const endDate = new Date(event.end_date || event.endDate);

        if ((event.start_date || event.date) === (event.end_date || event.endDate)) {
            return startDate.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } else {
            return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    async editEvent(event) {
        if (typeof openEditEventModal === 'function') {
            openEditEventModal(event);
        }
    }

    async deleteEvent(event) {
        if (confirm('Are you sure you want to delete this event?')) {
            try {
                if (this.currentUser) {
                    const response = await fetch('php/user_events.php', {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: event.id,
                            user_id: this.currentUser.id
                        })
                    });

                    const result = await response.json();
                    
                    if (result.success) {
                        this.showNotification('Event deleted successfully', 'success');
                        this.loadUserEvents();
                    } else {
                        throw new Error(result.message);
                    }
                }
            } catch (error) {
                console.error('Error deleting event:', error);
                // Fallback to localStorage
                this.userEvents = this.userEvents.filter(e => e.id !== event.id);
                this.saveUserEventsToStorage();
                this.showNotification('Event deleted successfully', 'success');
                this.renderCalendar();
                this.updateDashboard();
            }
        }
    }

    saveUserEventsToStorage() {
        if (this.currentUser) {
            localStorage.setItem(`userEvents_${this.currentUser.id}`, JSON.stringify(this.userEvents));
        }
    }

    updateDashboard() {
        const upcomingEventsList = document.getElementById('upcomingEventsList');
        if (!upcomingEventsList) return;

        const allEvents = [...this.holidays, ...this.userEvents];
        
        // Update stats
        const totalEvents = document.getElementById('totalEvents');
        const upcomingEvents = document.getElementById('upcomingEvents');
        const festivalsCount = document.getElementById('festivalsCount');
        const activeUsers = document.getElementById('activeUsers');

        if (totalEvents) totalEvents.textContent = allEvents.length;
        if (upcomingEvents) upcomingEvents.textContent = this.getUpcomingEvents().length;
        if (festivalsCount) festivalsCount.textContent = this.getThisMonthFestivals().length;
        if (activeUsers) activeUsers.textContent = this.isLoggedIn ? '1' : '0';

        this.updateUpcomingEventsList();
    }

    getUpcomingEvents() {
        const today = new Date();
        const allEvents = [...this.holidays, ...this.userEvents];
        return allEvents.filter(event => {
            const eventDate = new Date(event.date || event.start_date);
            return eventDate >= today;
        }).slice(0, 5);
    }

    getThisMonthFestivals() {
        const currentMonth = this.currentDate.getMonth();
        const currentYear = this.currentDate.getFullYear();
        const allEvents = [...this.holidays, ...this.userEvents];
        
        return allEvents.filter(event => {
            const eventDate = new Date(event.date || event.start_date);
            return (event.category === 'festival' || event.category === 'national') &&
                   eventDate.getMonth() === currentMonth &&
                   eventDate.getFullYear() === currentYear;
        });
    }

    updateUpcomingEventsList() {
        const upcomingEventsList = document.getElementById('upcomingEventsList');
        if (!upcomingEventsList) return;

        upcomingEventsList.innerHTML = '';
        const upcomingEvents = this.getUpcomingEvents();
        
        if (upcomingEvents.length === 0) {
            upcomingEventsList.innerHTML = '<div class="empty-state">No upcoming events</div>';
            return;
        }
        
        upcomingEvents.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.className = 'event-item';
            
            const eventDate = new Date(event.date || event.start_date);
            const formattedDate = eventDate.toLocaleDateString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
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

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => {
            notification.remove();
        });

        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
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
}

// Initialize calendar when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.smartCalendar = new SmartCalendar();
    window.smartCalendar.init();
});
