<?php
// login.php - User Login Backend
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
        $email = isset($_POST['loginEmail']) ? trim($_POST['loginEmail']) : '';
        $password = isset($_POST['loginPassword']) ? $_POST['loginPassword'] : '';
        $rememberMe = isset($_POST['rememberMe']) ? true : false;

        // Validation
        if (empty($email) || empty($password)) {
            $response['message'] = 'Email and password are required';
        } else {
            // Create database connection
            $database = new Database();
            $db = $database->getConnection();

            // Check if user exists - SIMPLIFIED QUERY
            $query = "SELECT id, first_name, last_name, email, password_hash, phone, bio, profile_picture 
                      FROM users 
                      WHERE email = ? AND is_active = 1";
            $stmt = $db->prepare($query);
            $stmt->execute([$email]);
            
            if ($stmt->rowCount() == 1) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                
                // Verify password
                if (password_verify($password, $user['password_hash'])) {
                    // Get user preferences if they exist
                    $preferencesQuery = "SELECT notification_preference, timezone, language, email_updates 
                                         FROM user_preferences 
                                         WHERE user_id = ?";
                    $prefStmt = $db->prepare($preferencesQuery);
                    $prefStmt->execute([$user['id']]);
                    $preferences = $prefStmt->fetch(PDO::FETCH_ASSOC);
                    
                    // Build complete user response with consistent structure
                    $userData = array(
                        'id' => $user['id'],
                        'firstName' => $user['first_name'],
                        'lastName' => $user['last_name'],
                        'email' => $user['email'],
                        'phone' => $user['phone'] ?: "",
                        'bio' => $user['bio'] ?: "",
                        'profile_picture' => $user['profile_picture'] ?: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                    );
                    
                    // Add preferences if they exist
                    if ($preferences) {
                        $userData['preferences'] = array(
                            'notifications' => $preferences['notification_preference'] ?: 'all',
                            'timezone' => $preferences['timezone'] ?: 'ist',
                            'language' => $preferences['language'] ?: 'en',
                            'emailUpdates' => (bool)($preferences['email_updates'] ?? true)
                        );
                    } else {
                        // Default preferences
                        $userData['preferences'] = array(
                            'notifications' => 'all',
                            'timezone' => 'ist',
                            'language' => 'en',
                            'emailUpdates' => true
                        );
                    }
                    
                    $response['status'] = 'success';
                    $response['message'] = 'Login successful';
                    $response['user'] = $userData;
                    
                    // If remember me is checked, create a session token
                    if ($rememberMe) {
                        $token = bin2hex(random_bytes(32));
                        $expires = date('Y-m-d H:i:s', strtotime('+30 days'));
                        
                        // Clean up old sessions
                        $cleanQuery = "DELETE FROM user_sessions WHERE user_id = ? OR expires_at < NOW()";
                        $cleanStmt = $db->prepare($cleanQuery);
                        $cleanStmt->execute([$user['id']]);
                        
                        $tokenQuery = "INSERT INTO user_sessions (user_id, session_token, expires_at) VALUES (?, ?, ?)";
                        $tokenStmt = $db->prepare($tokenQuery);
                        $tokenStmt->execute([$user['id'], $token, $expires]);
                        
                        $response['sessionToken'] = $token;
                    }
                } else {
                    $response['message'] = 'Invalid password';
                }
            } else {
                $response['message'] = 'User not found';
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