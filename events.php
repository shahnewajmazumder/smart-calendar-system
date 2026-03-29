<?php
header('Content-Type: application/json');
require_once 'config.php';

$database = new Database();
$db = $database->getConnection();

switch ($_SERVER['REQUEST_METHOD']) {
    case 'GET':
        // Get Indian holidays
        $holiday_query = "SELECT * FROM indian_holidays WHERE date >= CURDATE() ORDER BY date ASC";
        $holiday_stmt = $db->prepare($holiday_query);
        $holiday_stmt->execute();
        $holidays = $holiday_stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(array(
            "success" => true,
            "holidays" => $holidays
        ));
        break;
        
    case 'POST':
        // Create new event
        $data = json_decode(file_get_contents("php://input"));
        
        if (!empty($data->title) && !empty($data->start_date) && !empty($data->user_id)) {
            $query = "INSERT INTO events SET 
                user_id=:user_id, 
                title=:title, 
                description=:description, 
                start_date=:start_date, 
                end_date=:end_date, 
                category=:category, 
                priority=:priority, 
                location=:location";
                
            $stmt = $db->prepare($query);
            
            $stmt->bindParam(":user_id", $data->user_id);
            $stmt->bindParam(":title", $data->title);
            $stmt->bindParam(":description", $data->description);
            $stmt->bindParam(":start_date", $data->start_date);
            $stmt->bindParam(":end_date", $data->end_date);
            $stmt->bindParam(":category", $data->category);
            $stmt->bindParam(":priority", $data->priority);
            $stmt->bindParam(":location", $data->location);
            
            if ($stmt->execute()) {
                echo json_encode(array("success" => true, "message" => "Event created successfully."));
            } else {
                echo json_encode(array("success" => false, "message" => "Unable to create event."));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "Required fields are missing."));
        }
        break;
}
?>