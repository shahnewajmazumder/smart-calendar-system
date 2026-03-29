<?php
// setup_database.php - Database setup script
include_once 'db_connection.php';

$response = array('status' => 'error', 'message' => 'Unknown error');

try {
    $database = new Database();
    $db = $database->getConnection();

    if (!$db) {
        throw new Exception('Database connection failed');
    }

    // Create events table with time columns
    $createEventsTable = "
        CREATE TABLE IF NOT EXISTS events (
            id INT AUTO_INCREMENT PRIMARY KEY,
            user_id INT NOT NULL,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            start_date DATE NOT NULL,
            end_date DATE NOT NULL,
            start_time TIME DEFAULT '09:00:00',
            end_time TIME DEFAULT '17:00:00',
            category ENUM('festival', 'national', 'religious', 'cultural', 'personal') NOT NULL,
            priority ENUM('high', 'medium', 'low') DEFAULT 'medium',
            location VARCHAR(255),
            photo VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    ";

    if ($db->exec($createEventsTable) !== false) {
        $response['status'] = 'success';
        $response['message'] = 'Database setup completed successfully';
    } else {
        $response['message'] = 'Failed to create events table';
    }

} catch(PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
} catch(Exception $e) {
    $response['message'] = 'Error: ' . $e->getMessage();
}

echo json_encode($response);
?>