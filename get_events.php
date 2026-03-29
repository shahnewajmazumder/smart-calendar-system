<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

$response = ['status' => 'error', 'message' => 'Unknown error', 'events' => []];

try {
    $conn = getDatabaseConnection();
    
    $userId = $_GET['userId'] ?? null;
    
    if (empty($userId)) {
        $response['message'] = 'User ID is required';
        echo json_encode($response);
        exit;
    }

    $sql = "SELECT * FROM events WHERE user_id = :user_id ORDER BY start_date ASC, start_time ASC";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user_id', $userId);
    $stmt->execute();
    
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $response['status'] = 'success';
    $response['message'] = 'Events loaded successfully';
    $response['events'] = $events;

} catch (PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);
?>