<?php
header('Content-Type: application/json');
require_once 'db_connection.php';

$response = ['status' => 'error', 'message' => 'Unknown error'];

try {
    $conn = getDatabaseConnection();
    
    // Get form data
    $eventId = $_POST['eventId'] ?? null;
    $userId = $_POST['userId'] ?? null;
    $title = $_POST['eventTitle'] ?? '';
    $description = $_POST['eventDescription'] ?? '';
    $startDate = $_POST['startDate'] ?? '';
    $endDate = $_POST['endDate'] ?? '';
    $startTime = $_POST['startTime'] ?? '09:00:00';
    $endTime = $_POST['endTime'] ?? '17:00:00';
    $category = $_POST['eventCategory'] ?? 'personal';
    $priority = $_POST['eventPriority'] ?? 'medium';
    $location = $_POST['eventLocation'] ?? '';

    // Validate required fields
    if (empty($title) || empty($startDate) || empty($endDate) || empty($userId)) {
        $response['message'] = 'Required fields are missing';
        echo json_encode($response);
        exit;
    }

    // Handle file upload
    $photoPath = '';
    if (isset($_FILES['eventPhoto']) && $_FILES['eventPhoto']['error'] === UPLOAD_ERR_OK) {
        $uploadDir = 'uploads/events/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0777, true);
        }
        
        $fileExtension = pathinfo($_FILES['eventPhoto']['name'], PATHINFO_EXTENSION);
        $fileName = uniqid() . '.' . $fileExtension;
        $photoPath = $uploadDir . $fileName;
        
        if (move_uploaded_file($_FILES['eventPhoto']['tmp_name'], $photoPath)) {
            $photoPath = $photoPath;
        }
    }

    if ($eventId && is_numeric($eventId)) {
        // Update existing event
        $sql = "UPDATE events SET 
                title = :title, 
                description = :description, 
                start_date = :start_date, 
                end_date = :end_date, 
                start_time = :start_time, 
                end_time = :end_time, 
                category = :category, 
                priority = :priority, 
                location = :location, 
                photo = :photo,
                updated_at = NOW() 
                WHERE id = :id AND user_id = :user_id";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $eventId);
        $stmt->bindParam(':user_id', $userId);
    } else {
        // Insert new event
        $sql = "INSERT INTO events 
                (user_id, title, description, start_date, end_date, start_time, end_time, category, priority, location, photo) 
                VALUES 
                (:user_id, :title, :description, :start_date, :end_date, :start_time, :end_time, :category, :priority, :location, :photo)";
        
        $stmt = $conn->prepare($sql);
    }

    $stmt->bindParam(':user_id', $userId);
    $stmt->bindParam(':title', $title);
    $stmt->bindParam(':description', $description);
    $stmt->bindParam(':start_date', $startDate);
    $stmt->bindParam(':end_date', $endDate);
    $stmt->bindParam(':start_time', $startTime);
    $stmt->bindParam(':end_time', $endTime);
    $stmt->bindParam(':category', $category);
    $stmt->bindParam(':priority', $priority);
    $stmt->bindParam(':location', $location);
    $stmt->bindParam(':photo', $photoPath);

    if ($stmt->execute()) {
        $newEventId = $eventId ?: $conn->lastInsertId();
        $response['status'] = 'success';
        $response['message'] = 'Event saved successfully';
        $response['eventId'] = $newEventId;
        $response['photo_url'] = $photoPath;
    } else {
        $response['message'] = 'Failed to save event to database';
    }

} catch (PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
} catch (Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
}

echo json_encode($response);
?>