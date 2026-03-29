<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $database = new Database();
    $db = $database->getConnection();

    $user_id = $_GET['user_id'] ?? null;
    
    if (!$user_id) {
        echo json_encode(array("success" => false, "message" => "User ID is required."));
        exit;
    }

    // Get user events
    $query = "SELECT * FROM events WHERE user_id = :user_id ORDER BY start_date ASC";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":user_id", $user_id);
    $stmt->execute();
    
    $events = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    echo json_encode(array(
        "success" => true,
        "events" => $events
    ));
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->id) && !empty($data->title) && !empty($data->start_date)) {
        $database = new Database();
        $db = $database->getConnection();

        $query = "UPDATE events SET 
            title=:title, 
            description=:description, 
            start_date=:start_date, 
            end_date=:end_date, 
            category=:category, 
            priority=:priority, 
            location=:location 
            WHERE id=:id AND user_id=:user_id";
            
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":id", $data->id);
        $stmt->bindParam(":user_id", $data->user_id);
        $stmt->bindParam(":title", $data->title);
        $stmt->bindParam(":description", $data->description);
        $stmt->bindParam(":start_date", $data->start_date);
        $stmt->bindParam(":end_date", $data->end_date);
        $stmt->bindParam(":category", $data->category);
        $stmt->bindParam(":priority", $data->priority);
        $stmt->bindParam(":location", $data->location);
        
        if ($stmt->execute()) {
            echo json_encode(array("success" => true, "message" => "Event updated successfully."));
        } else {
            echo json_encode(array("success" => false, "message" => "Unable to update event."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Required fields are missing."));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->id) && !empty($data->user_id)) {
        $database = new Database();
        $db = $database->getConnection();

        $query = "DELETE FROM events WHERE id=:id AND user_id=:user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":id", $data->id);
        $stmt->bindParam(":user_id", $data->user_id);
        
        if ($stmt->execute()) {
            echo json_encode(array("success" => true, "message" => "Event deleted successfully."));
        } else {
            echo json_encode(array("success" => false, "message" => "Unable to delete event."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Event ID and User ID are required."));
    }
}
?>