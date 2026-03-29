<?php
header('Content-Type: application/json');
require_once 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->first_name) && !empty($data->last_name) && !empty($data->email) && !empty($data->password)) {
        
        $database = new Database();
        $db = $database->getConnection();

        // Check if user already exists
        $check_query = "SELECT id FROM users WHERE email = :email";
        $check_stmt = $db->prepare($check_query);
        $check_stmt->bindParam(":email", $data->email);
        $check_stmt->execute();

        if ($check_stmt->rowCount() > 0) {
            echo json_encode(array("success" => false, "message" => "User already exists with this email."));
            exit;
        }

        // Insert new user
        $query = "INSERT INTO users SET first_name=:first_name, last_name=:last_name, email=:email, password=:password";
        $stmt = $db->prepare($query);

        $first_name = htmlspecialchars(strip_tags($data->first_name));
        $last_name = htmlspecialchars(strip_tags($data->last_name));
        $email = htmlspecialchars(strip_tags($data->email));
        $password = password_hash($data->password, PASSWORD_DEFAULT);

        $stmt->bindParam(":first_name", $first_name);
        $stmt->bindParam(":last_name", $last_name);
        $stmt->bindParam(":email", $email);
        $stmt->bindParam(":password", $password);

        if ($stmt->execute()) {
            // Get the newly created user
            $user_query = "SELECT id, first_name, last_name, email FROM users WHERE email = :email";
            $user_stmt = $db->prepare($user_query);
            $user_stmt->bindParam(":email", $email);
            $user_stmt->execute();
            $user = $user_stmt->fetch(PDO::FETCH_ASSOC);

            echo json_encode(array(
                "success" => true, 
                "message" => "User registered successfully.",
                "user" => $user
            ));
        } else {
            echo json_encode(array("success" => false, "message" => "Unable to register user."));
        }
    } else {
        echo json_encode(array("success" => false, "message" => "All fields are required."));
    }
}
?>