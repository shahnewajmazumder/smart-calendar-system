<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $user_id = $_GET['user_id'] ?? null;
    
    if (!$user_id) {
        echo json_encode(array("success" => false, "message" => "User ID is required."));
        exit;
    }

    $database = new Database();
    $db = $database->getConnection();

    $query = "SELECT id, first_name, last_name, email, phone, bio, profile_picture, notification_pref, timezone, language, email_updates FROM users WHERE id = :user_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(":user_id", $user_id);
    $stmt->execute();

    if ($stmt->rowCount() > 0) {
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        echo json_encode(array("success" => true, "user" => $user));
    } else {
        echo json_encode(array("success" => false, "message" => "User not found."));
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->user_id)) {
        $database = new Database();
        $db = $database->getConnection();

        $query = "UPDATE users SET 
            first_name=:first_name, 
            last_name=:last_name, 
            email=:email, 
            phone=:phone, 
            bio=:bio, 
            notification_pref=:notification_pref, 
            timezone=:timezone, 
            language=:language, 
            email_updates=:email_updates 
            WHERE id=:user_id";
            
        $stmt = $db->prepare($query);
        
        $stmt->bindParam(":user_id", $data->user_id);
        $stmt->bindParam(":first_name", $data->first_name);
        $stmt->bindParam(":last_name", $data->last_name);
        $stmt->bindParam(":email", $data->email);
        $stmt->bindParam(":phone", $data->phone);
        $stmt->bindParam(":bio", $data->bio);
        $stmt->bindParam(":notification_pref", $data->notification_pref);
        $stmt->bindParam(":timezone", $data->timezone);
        $stmt->bindParam(":language", $data->language);
        $stmt->bindParam(":email_updates", $data->email_updates);
        
        if ($stmt->execute()) {
            echo json_encode(array("success" => true, "message" => "Profile updated successfully."));
        } else {
            echo json_encode(array("success" => false, "message" => "Unable to update profile."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "User ID is required."));
    }
}
?>