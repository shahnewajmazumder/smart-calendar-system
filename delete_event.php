<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

$response = ['status' => 'error', 'message' => 'Unknown error'];

try {
    $conn = getDatabaseConnection();
    
    $eventId = $_POST['eventId'] ?? null;
    $userId = $_POST['userId'] ?? null;
    
    if (empty($eventId) || empty($userId)) {
        $response['message'] = 'Event ID and User ID are required';
        echo json_encode($response);
        exit;
    }

    $sql = "DELETE FROM events WHERE id = :id AND user_id = :user_id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $eventId);
    $stmt->bindParam(':user_id', $userId);
    
    if ($stmt->execute()) {
        $response['status'] = 'success';
        $response['message'] = 'Event deleted successfully';
    } else {
        $response['message'] = 'Failed to delete event';
    }

} catch (PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);
?>