<?php
// register.php - User Registration Backend
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Include database connection
include_once 'db_connection.php';

$response = array('status' => 'error', 'message' => 'Unknown error');

try {
    // Get the request method
    $method = $_SERVER['REQUEST_METHOD'];

    if ($method == 'POST') {
        // Get form data
        $firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
        $lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
        $email = isset($_POST['registerEmail']) ? trim($_POST['registerEmail']) : '';
        $password = isset($_POST['registerPassword']) ? $_POST['registerPassword'] : '';
        $confirmPassword = isset($_POST['confirmPassword']) ? $_POST['confirmPassword'] : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $bio = isset($_POST['bio']) ? trim($_POST['bio']) : '';

        // Validation
        if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
            $response['message'] = 'All required fields must be filled';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Invalid email format';
        } elseif ($password !== $confirmPassword) {
            $response['message'] = 'Passwords do not match';
        } elseif (strlen($password) < 6) {
            $response['message'] = 'Password must be at least 6 characters long';
        } else {
            // Create database connection
            $database = new Database();
            $db = $database->getConnection();

            // Check if email already exists
            $checkQuery = "SELECT id FROM users WHERE email = ?";
            $checkStmt = $db->prepare($checkQuery);
            $checkStmt->execute([$email]);
            
            if ($checkStmt->rowCount() > 0) {
                $response['message'] = 'User with this email already exists';
            } else {
                // Hash password
                $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
                
                // Insert new user
                $insertQuery = "INSERT INTO users (first_name, last_name, email, password_hash, phone, bio) 
                               VALUES (?, ?, ?, ?, ?, ?)";
                $insertStmt = $db->prepare($insertQuery);
                
                // In register.php, after successful registration:
if ($insertStmt->execute([$firstName, $lastName, $email, $hashedPassword, $phone, $bio])) {
    $userId = $db->lastInsertId();
    
    // Create default preferences
    $prefQuery = "INSERT INTO user_preferences (user_id) VALUES (?)";
    $prefStmt = $db->prepare($prefQuery);
    $prefStmt->execute([$userId]);
    
    // Return COMPLETE user data
    $response['status'] = 'success';
    $response['message'] = 'Registration successful';
    $response['userId'] = $userId;
    $response['user'] = array(
        'id' => $userId,
        'firstName' => $firstName,
        'lastName' => $lastName,
        'email' => $email,
        'phone' => $phone,
        'bio' => $bio,
        'profile_picture' => ''
    );

                } else {
                    $response['message'] = 'Registration failed. Please try again.';
                }
            }
        }
    } else {
        $response['message'] = 'Invalid request method';
    }

} catch(PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
} catch(Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
}

// Return JSON response
echo json_encode($response);
?>