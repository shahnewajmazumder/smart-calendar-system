<?php
// Script to update event images in bulk
header('Content-Type: application/json');
require_once 'db_connection.php';

$response = ['status' => 'error', 'message' => 'Unknown error'];

try {
    $conn = getDatabaseConnection();
    
    // Update images for specific events
    $updates = [
        // Republic Day
        ["Republic Day", "https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=600&h=400&fit=crop"],
        // Independence Day
        ["Independence Day", "https://images.unsplash.com/photo-1594736797933-d0401ba94693?w=600&h=400&fit=crop"],
        // Add more updates as needed
    ];
    
    $updatedCount = 0;
    foreach ($updates as $update) {
        $sql = "UPDATE system_events SET photo = ? WHERE title = ?";
        $stmt = $conn->prepare($sql);
        if ($stmt->execute([$update[1], $update[0]])) {
            $updatedCount++;
        }
    }
    
    $response['status'] = 'success';
    $response['message'] = "Updated $updatedCount event images";
    $response['updated_count'] = $updatedCount;

} catch (PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);
?>