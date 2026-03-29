<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->email) && !empty($data->password)) {
        $database = new Database();
        $db = $database->getConnection();

        $query = "SELECT id, first_name, last_name, email, password FROM users WHERE email = :email";
        $stmt = $db->prepare($query);
        $stmt->bindParam(":email", $data->email);
        $stmt->execute();

        if ($stmt->rowCount() == 1) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (password_verify($data->password, $user['password'])) {
                // Remove password from user data
                unset($user['password']);
                
                echo json_encode(array(
                    "success" => true, 
                    "message" => "Login successful.",
                    "user" => $user
                ));
            } else {
                echo json_encode(array("success" => false, "message" => "Invalid password."));
            }
        } else {
            echo json_encode(array("success" => false, "message" => "User not found."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "Email and password are required."));
    }
}
?>