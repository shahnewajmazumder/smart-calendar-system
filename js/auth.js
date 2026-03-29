// Authentication functions
document.addEventListener("DOMContentLoaded", function() {
    // Login form
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }

    // Register form
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", handleRegister);
    }

    // Logout button
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", handleLogout);
    }

    // Event forms
    const eventForm = document.getElementById("eventForm");
    if (eventForm) {
        eventForm.addEventListener("submit", handleEventSubmit);
    }

    const modalEventForm = document.getElementById("modalEventForm");
    if (modalEventForm) {
        modalEventForm.addEventListener("submit", handleModalEventSubmit);
    }

    // Check login status on page load
    checkAuthStatus();
});

function checkAuthStatus() {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        // User is logged in
        const user = JSON.parse(currentUser);
        updateUIForLoggedInUser(user);
        
        // Load user events
        loadUserEventsFromStorage();
    } else {
        // User is not logged in
        updateUIForLoggedOutUser();
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    
    // Simple validation
    if (!email || !password) {
        showNotification("Please fill in all fields", "error");
        return;
    }
    
    // In a real app, this would be an API call to the server
    // For demo purposes, we'll use localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        // Login successful
        const userData = {
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        showNotification("Login successful!", "success");
        
        // Redirect to homepage after a short delay
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1000);
    } else {
        showNotification("Invalid email or password", "error");
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const agreeTerms = document.getElementById("agreeTerms").checked;
    
    // Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
        showNotification("Please fill in all fields", "error");
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification("Passwords do not match", "error");
        return;
    }
    
    if (!agreeTerms) {
        showNotification("Please agree to the terms and conditions", "error");
        return;
    }
    
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
        showNotification("User already exists with this email", "error");
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        password, // In a real app, this would be hashed
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto-login after registration
    const userData = {
        id: newUser.id,
        name: `${firstName} ${lastName}`,
        email: email,
        firstName: firstName,
        lastName: lastName
    };
    
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    showNotification("Registration successful!", "success");
    
    // Redirect to homepage after a short delay
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

function handleLogout() {
    localStorage.removeItem('currentUser');
    showNotification("You have been logged out", "info");
    
    // Redirect to homepage after a short delay
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1000);
}

function updateUIForLoggedInUser(user) {
    const userMenu = document.getElementById("userMenu");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    
    if (userMenu) userMenu.style.display = "flex";
    if (loginBtn) loginBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";
    
    if (user && document.getElementById("userName")) {
        document.getElementById("userName").textContent = user.name;
    }
    
    // Update profile page if we're on it
    if (document.getElementById("profileName")) {
        document.getElementById("profileName").textContent = user.name;
        document.getElementById("profileEmail").textContent = user.email;
        document.getElementById("profileFirstName").value = user.firstName;
        document.getElementById("profileLastName").value = user.lastName;
        document.getElementById("profileEmailInput").value = user.email;
    }
}

function updateUIForLoggedOutUser() {
    const userMenu = document.getElementById("userMenu");
    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");
    
    if (userMenu) userMenu.style.display = "none";
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (registerBtn) registerBtn.style.display = "inline-block";
}

function handleEventSubmit(e) {
    e.preventDefault();
    
    if (!isLoggedIn) {
        showNotification("Please login to save events", "warning");
        window.location.href = "login.html";
        return;
    }
    
    const eventData = {
        id: Date.now(),
        title: document.getElementById("eventTitle").value,
        start_date: document.getElementById("startDate").value,
        end_date: document.getElementById("endDate").value,
        category: document.getElementById("eventCategory").value,
        priority: document.getElementById("eventPriority").value,
        description: document.getElementById("eventDescription").value,
        location: document.getElementById("eventLocation").value,
        userId: currentUser.id
    };
    
    userEvents.push(eventData);
    saveUserEvents();
    
    showNotification("Event saved successfully!", "success");
    
    // Reset form
    document.getElementById("eventForm").reset();
    
    // Redirect to calendar view
    showCalendarView();
}

function handleModalEventSubmit(e) {
    e.preventDefault();
    
    if (!isLoggedIn) {
        showNotification("Please login to save events", "warning");
        window.location.href = "login.html";
        return;
    }
    
    const eventData = {
        title: document.getElementById("modalEventTitle").value,
        start_date: document.getElementById("modalStartDate").value,
        end_date: document.getElementById("modalEndDate").value,
        category: document.getElementById("modalEventCategory").value,
        priority: document.getElementById("modalEventPriority").value,
        description: document.getElementById("modalEventDescription").value,
        location: document.getElementById("modalEventLocation").value,
        userId: currentUser.id
    };
    
    if (editingEventId) {
        // Update existing event
        const eventIndex = userEvents.findIndex(e => e.id == editingEventId);
        if (eventIndex !== -1) {
            eventData.id = editingEventId;
            userEvents[eventIndex] = eventData;
        }
    } else {
        // Create new event
        eventData.id = Date.now();
        userEvents.push(eventData);
    }
    
    saveUserEvents();
    
    showNotification(editingEventId ? "Event updated successfully!" : "Event saved successfully!", "success");
    
    closeEventModal();
    renderCalendar();
    updateDashboard();
}

// Make functions available globally
window.handleLogin = handleLogin;
window.handleRegister = handleRegister;
window.handleLogout = handleLogout;
