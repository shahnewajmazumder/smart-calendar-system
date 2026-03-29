<?php
// logout.php - User Logout Backend
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$response = array('status' => 'success', 'message' => 'Logout successful');

// In a real application, you would invalidate the session token here
// For now, we'll just return success

echo json_encode($response);
?>