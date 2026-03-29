// User Authentication Functions
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    const rememberMe = document.getElementById("rememberMe").checked;
    
    // Simple validation
    if (!email || !password) {
        showNotification("Please fill in all fields", "error");
        return;
    }
    
    // Create form data for POST request
    const formData = new FormData();
    formData.append('loginEmail', email);
    formData.append('loginPassword', password);
    formData.append('rememberMe', rememberMe);
    
    // Show loading state
    const loginBtn = document.querySelector('#loginForm button[type="submit"]');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
    loginBtn.disabled = true;
    
    // Send login request to backend
    fetch('login.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Set login state
            isLoggedIn = true;
            currentUser = data.user;
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            if (data.sessionToken) {
                localStorage.setItem('sessionToken', data.sessionToken);
            }
            
            // Update UI - Hide login/register buttons, show user menu
            document.getElementById("userName").textContent = `${data.user.firstName} ${data.user.lastName}`;
            document.getElementById("userMenu").style.display = "flex";
            document.getElementById("loginBtn").style.display = "none";
            document.getElementById("registerBtn").style.display = "none";
            
            // Update profile
            document.getElementById("profileName").textContent = `${data.user.firstName} ${data.user.lastName}`;
            document.getElementById("profileEmail").textContent = data.user.email;
            
            // Show dashboard
            showDashboard();
            
            showNotification(`Welcome back, ${data.user.firstName}!`, "success");
        } else {
            showNotification(data.message, "error");
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        showNotification("Login failed. Please try again.", "error");
    })
    .finally(() => {
        // Reset button state
        loginBtn.innerHTML = originalText;
        loginBtn.disabled = false;
    });
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
    
    // Create form data for POST request
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('registerEmail', email);
    formData.append('registerPassword', password);
    formData.append('confirmPassword', confirmPassword);
    
    // Show loading state
    const registerBtn = document.querySelector('#registerForm button[type="submit"]');
    const originalText = registerBtn.innerHTML;
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';
    registerBtn.disabled = true;
    
    // Send registration request to backend
    fetch('register.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            // Set login state
            isLoggedIn = true;
            currentUser = data.user;
            
            // Save to localStorage
            localStorage.setItem('currentUser', JSON.stringify(data.user));
            
            // Update UI - Hide login/register buttons, show user menu
            document.getElementById("userName").textContent = `${data.user.firstName} ${data.user.lastName}`;
            document.getElementById("userMenu").style.display = "flex";
            document.getElementById("loginBtn").style.display = "none";
            document.getElementById("registerBtn").style.display = "none";
            
            // Update profile
            document.getElementById("profileName").textContent = `${data.user.firstName} ${data.user.lastName}`;
            document.getElementById("profileEmail").textContent = data.user.email;
            
            // Show dashboard
            showDashboard();
            
            showNotification("Registration successful!", "success");
        } else {
            showNotification(data.message, "error");
        }
    })
    .catch(error => {
        console.error('Registration error:', error);
        showNotification("Registration failed. Please try again.", "error");
    })
    .finally(() => {
        // Reset button state
        registerBtn.innerHTML = originalText;
        registerBtn.disabled = false;
    });
}

function logout() {
    // Send logout request to backend (if needed)
    fetch('logout.php', {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        // Clear local storage and state regardless of backend response
        isLoggedIn = false;
        currentUser = null;
        
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionToken');
        
        // Update UI - Show login/register buttons, hide user menu
        document.getElementById("userMenu").style.display = "none";
        document.getElementById("loginBtn").style.display = "inline-block";
        document.getElementById("registerBtn").style.display = "inline-block";
        
        // Show dashboard after logout
        showDashboard();
        
        showNotification("You have been logged out", "info");
    })
    .catch(error => {
        console.error('Logout error:', error);
        // Still clear local state even if backend call fails
        isLoggedIn = false;
        currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionToken');
        
        document.getElementById("userMenu").style.display = "none";
        document.getElementById("loginBtn").style.display = "inline-block";
        document.getElementById("registerBtn").style.display = "inline-block";
        showDashboard();
        showNotification("You have been logged out", "info");
    });
}
