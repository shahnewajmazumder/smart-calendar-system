<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

$response = ['status' => 'error', 'message' => 'Unknown error', 'events' => []];

try {
    $conn = getDatabaseConnection();
    
    // Get current year and next year for filtering
    $currentYear = date('Y');
    $nextYear = $currentYear + 1;
    
    $sql = "SELECT * FROM system_events 
            WHERE is_public = TRUE 
            AND (
                YEAR(start_date) = ? OR 
                YEAR(start_date) = ? OR
                YEAR(end_date) = ? OR
                YEAR(end_date) = ?
            )
            ORDER BY start_date ASC, start_time ASC";
    
    $stmt = $conn->prepare($sql);
    $stmt->execute([$currentYear, $nextYear, $currentYear, $nextYear]);
    
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $response['status'] = 'success';
    $response['message'] = 'System events loaded successfully';
    $response['events'] = $events;

} catch (PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);
?>