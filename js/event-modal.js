// Event Modal functionality
class EventModal {
    constructor() {
        this.modal = document.getElementById('eventModal');
        this.form = document.getElementById('modalEventForm');
        this.editingEventId = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Form submission
        this.form?.addEventListener('submit', (e) => this.handleSubmit(e));

        // Modal controls
        document.getElementById('closeModal')?.addEventListener('click', () => this.close());
        document.getElementById('modalCancelBtn')?.addEventListener('click', () => this.close());

        // Date validation
        const startDateInput = document.getElementById('modalStartDate');
        const endDateInput = document.getElementById('modalEndDate');

        startDateInput?.addEventListener('change', () => this.validateDates());
        endDateInput?.addEventListener('change', () => this.validateDates());
    }

    open(event = null) {
        if (event) {
            this.edit(event);
        } else {
            this.create();
        }
        
        this.modal.style.display = 'flex';
        this.setDefaultDates();
    }

    close() {
        this.modal.style.display = 'none';
        this.reset();
    }

    create() {
        this.editingEventId = null;
        document.getElementById('modalTitle').textContent = 'Add New Event';
        this.form.reset();
    }

    edit(event) {
        this.editingEventId = event.id;
        document.getElementById('modalTitle').textContent = 'Edit Event';
        
        // Fill form with event data
        document.getElementById('modalEventId').value = event.id;
        document.getElementById('modalEventTitle').value = event.title;
        document.getElementById('modalStartDate').value = event.start_date || event.date;
        document.getElementById('modalEndDate').value = event.end_date || event.endDate;
        document.getElementById('modalEventCategory').value = event.category;
        document.getElementById('modalEventPriority').value = event.priority;
        document.getElementById('modalEventDescription').value = event.description || '';
        document.getElementById('modalEventLocation').value = event.location || '';
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        const formData = this.getFormData();
        
        if (!this.validateForm(formData)) {
            return;
        }

        try {
            if (this.editingEventId) {
                await this.updateEvent(formData);
            } else {
                await this.createEvent(formData);
            }
            
            this.close();
            this.showSuccessNotification();
            
            // Refresh calendar and dashboard
            if (window.smartCalendar) {
                window.smartCalendar.loadUserEvents();
            }
            
        } catch (error) {
            this.showErrorNotification('Failed to save event');
            console.error('Error saving event:', error);
        }
    }

    getFormData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        
        return {
            id: this.editingEventId,
            title: document.getElementById('modalEventTitle').value,
            start_date: document.getElementById('modalStartDate').value,
            end_date: document.getElementById('modalEndDate').value,
            category: document.getElementById('modalEventCategory').value,
            priority: document.getElementById('modalEventPriority').value,
            description: document.getElementById('modalEventDescription').value,
            location: document.getElementById('modalEventLocation').value,
            user_id: currentUser.id
        };
    }

    validateForm(formData) {
        if (!formData.title.trim()) {
            this.showErrorNotification('Event title is required');
            return false;
        }

        if (!formData.start_date) {
            this.showErrorNotification('Start date is required');
            return false;
        }

        if (!formData.end_date) {
            this.showErrorNotification('End date is required');
            return false;
        }

        if (new Date(formData.end_date) < new Date(formData.start_date)) {
            this.showErrorNotification('End date cannot be before start date');
            return false;
        }

        return true;
    }

    validateDates() {
        const startDate = document.getElementById('modalStartDate').value;
        const endDate = document.getElementById('modalEndDate').value;
        
        if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
            document.getElementById('modalEndDate').value = startDate;
            this.showErrorNotification('End date adjusted to match start date');
        }
    }

    setDefaultDates() {
        const today = new Date().toISOString().split('T')[0];
        const startDateInput = document.getElementById('modalStartDate');
        const endDateInput = document.getElementById('modalEndDate');
        
        if (!startDateInput.value) {
            startDateInput.value = today;
        }
        
        if (!endDateInput.value) {
            endDateInput.value = today;
        }
    }

    async createEvent(formData) {
        if (window.smartCalendar?.currentUser) {
            // Try to save to server first
            try {
                const response = await fetch('php/events.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.message);
                }
                
                return result;
            } catch (error) {
                // Fallback to localStorage
                console.log('Server save failed, using localStorage fallback:', error);
                this.saveToLocalStorage(formData);
                return { success: true };
            }
        } else {
            // Save to localStorage
            this.saveToLocalStorage(formData);
            return { success: true };
        }
    }

    async updateEvent(formData) {
        if (window.smartCalendar?.currentUser) {
            // Try to update on server
            try {
                const response = await fetch('php/user_events.php', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (!result.success) {
                    throw new Error(result.message);
                }
                
                return result;
            } catch (error) {
                // Fallback to localStorage
                console.log('Server update failed, using localStorage fallback:', error);
                this.updateInLocalStorage(formData);
                return { success: true };
            }
        } else {
            // Update in localStorage
            this.updateInLocalStorage(formData);
            return { success: true };
        }
    }

    saveToLocalStorage(formData) {
        if (!window.smartCalendar?.currentUser) return;

        formData.id = formData.id || Date.now();
        window.smartCalendar.userEvents.push(formData);
        window.smartCalendar.saveUserEventsToStorage();
    }

    updateInLocalStorage(formData) {
        if (!window.smartCalendar?.currentUser) return;

        const eventIndex = window.smartCalendar.userEvents.findIndex(e => e.id == formData.id);
        if (eventIndex !== -1) {
            window.smartCalendar.userEvents[eventIndex] = formData;
            window.smartCalendar.saveUserEventsToStorage();
        }
    }

    reset() {
        this.editingEventId = null;
        this.form.reset();
    }

    showSuccessNotification() {
        const message = this.editingEventId ? 'Event updated successfully!' : 'Event created successfully!';
        this.showNotification(message, 'success');
    }

    showErrorNotification(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
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

// Global functions for backward compatibility
function openAddEventModal(dateStr = null) {
    if (!window.eventModal) {
        window.eventModal = new EventModal();
    }
    
    if (dateStr) {
        document.getElementById('modalStartDate').value = dateStr;
        document.getElementById('modalEndDate').value = dateStr;
    }
    
    window.eventModal.open();
}

function openEditEventModal(event) {
    if (!window.eventModal) {
        window.eventModal = new EventModal();
    }
    
    window.eventModal.open(event);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.eventModal = new EventModal();
});
