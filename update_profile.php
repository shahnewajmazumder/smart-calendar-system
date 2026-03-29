<?php
// update_profile.php - Update User Profile Backend
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
        $userId = isset($_POST['userId']) ? intval($_POST['userId']) : 0;
        $firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : '';
        $lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : '';
        $email = isset($_POST['email']) ? trim($_POST['email']) : '';
        $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
        $bio = isset($_POST['bio']) ? trim($_POST['bio']) : '';

        // Validation
        if ($userId <= 0) {
            $response['message'] = 'Invalid user ID';
        } elseif (empty($firstName) || empty($lastName) || empty($email)) {
            $response['message'] = 'Required fields cannot be empty';
        } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $response['message'] = 'Invalid email format';
        } else {
            // Create database connection
            $database = new Database();
            $db = $database->getConnection();

            // Check if email already exists for other users
            $checkQuery = "SELECT id FROM users WHERE email = ? AND id != ?";
            $checkStmt = $db->prepare($checkQuery);
            $checkStmt->execute([$email, $userId]);
            
            if ($checkStmt->rowCount() > 0) {
                $response['message'] = 'Email already exists for another user';
            } else {
                // Update user profile
                $updateQuery = "UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, bio = ? WHERE id = ?";
                $updateStmt = $db->prepare($updateQuery);
                
                if ($updateStmt->execute([$firstName, $lastName, $email, $phone, $bio, $userId])) {
                    $response['status'] = 'success';
                    $response['message'] = 'Profile updated successfully';
                    $response['user'] = array(
                        'id' => $userId,
                        'firstName' => $firstName,
                        'lastName' => $lastName,
                        'email' => $email,
                        'phone' => $phone,
                        'bio' => $bio
                    );
                } else {
                    $response['message'] = 'Failed to update profile. Please try again.';
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