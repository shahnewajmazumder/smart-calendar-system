<?php
// update_photo.php - Update User Profile Photo Backend
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

        // Validation
        if ($userId <= 0) {
            $response['message'] = 'Invalid user ID';
        } elseif (!isset($_FILES['profilePhotoUpload']) || $_FILES['profilePhotoUpload']['error'] != UPLOAD_ERR_OK) {
            $response['message'] = 'Please select a valid photo to upload';
        } else {
            $photoFile = $_FILES['profilePhotoUpload'];
            
            // Validate file type
            $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
            $fileType = mime_content_type($photoFile['tmp_name']);
            
            if (!in_array($fileType, $allowedTypes)) {
                $response['message'] = 'Only JPG, PNG, and GIF images are allowed';
            } else {
                // Validate file size (max 5MB)
                if ($photoFile['size'] > 5 * 1024 * 1024) {
                    $response['message'] = 'Image size should be less than 5MB';
                } else {
                    // Create uploads directory if it doesn't exist
                    $uploadDir = 'uploads/profile_photos/';
                    if (!file_exists($uploadDir)) {
                        mkdir($uploadDir, 0777, true);
                    }

                    // Generate unique filename
                    $fileExtension = strtolower(pathinfo($photoFile['name'], PATHINFO_EXTENSION));
                    $fileName = 'user_' . $userId . '_' . time() . '.' . $fileExtension;
                    $filePath = $uploadDir . $fileName;

                    // Move uploaded file
                    if (move_uploaded_file($photoFile['tmp_name'], $filePath)) {
                        // Create database connection
                        $database = new Database();
                        $db = $database->getConnection();

                        // First, get old photo path to delete it later
                        $getOldPhotoQuery = "SELECT profile_picture FROM users WHERE id = ?";
                        $getOldPhotoStmt = $db->prepare($getOldPhotoQuery);
                        $getOldPhotoStmt->execute([$userId]);
                        $oldPhoto = $getOldPhotoStmt->fetch(PDO::FETCH_ASSOC);
                        
                        // Update user profile photo in database
                        $updateQuery = "UPDATE users SET profile_picture = ? WHERE id = ?";
                        $updateStmt = $db->prepare($updateQuery);
                        
                        if ($updateStmt->execute([$filePath, $userId])) {
                            // Delete old photo if it exists and is not the default one
                            if ($oldPhoto && $oldPhoto['profile_picture'] && 
                                !filter_var($oldPhoto['profile_picture'], FILTER_VALIDATE_URL) &&
                                file_exists($oldPhoto['profile_picture'])) {
                                unlink($oldPhoto['profile_picture']);
                            }
                            
                            $response['status'] = 'success';
                            $response['message'] = 'Profile photo updated successfully';
                            $response['photo_url'] = $filePath;
                            
                            // Also return updated user data
                            $getUserQuery = "SELECT id, first_name, last_name, email, phone, bio, profile_picture FROM users WHERE id = ?";
                            $getUserStmt = $db->prepare($getUserQuery);
                            $getUserStmt->execute([$userId]);
                            $user = $getUserStmt->fetch(PDO::FETCH_ASSOC);
                            $response['user'] = $user;
                        } else {
                            // Delete the uploaded file if database update failed
                            unlink($filePath);
                            $response['message'] = 'Failed to update profile photo in database';
                        }
                    } else {
                        $response['message'] = 'Failed to upload photo. Please try again.';
                    }
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