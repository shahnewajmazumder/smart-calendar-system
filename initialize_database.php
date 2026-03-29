
<?php
// initialize_database.php - Create tables and sample data
header('Content-Type: application/json');
include_once 'db_connection.php';

$response = array('status' => 'error', 'message' => 'Unknown error');

try {
    $database = new Database();
    $db = $database->getConnection();

    // Create events table with proper structure
    $createTableQuery = "
    CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        start_time TIME DEFAULT '00:00:00',
        end_time TIME DEFAULT '23:59:59',
        category VARCHAR(50) DEFAULT 'personal',
        priority VARCHAR(20) DEFAULT 'medium',
        location VARCHAR(255),
        photo VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )";

    $db->exec($createTableQuery);

    // Insert sample events for user ID 1
    $sampleEvents = [
        [
            'user_id' => 1,
            'title' => 'Team Meeting',
            'description' => 'Weekly team sync meeting',
            'start_date' => date('Y-m-d', strtotime('+2 days')),
            'end_date' => date('Y-m-d', strtotime('+2 days')),
            'start_time' => '10:00:00',
            'end_time' => '11:00:00',
            'category' => 'personal',
            'priority' => 'high',
            'location' => 'Office Conference Room'
        ],
        [
            'user_id' => 1,
            'title' => 'Doctor Appointment',
            'description' => 'Annual health checkup',
            'start_date' => date('Y-m-d', strtotime('+5 days')),
            'end_date' => date('Y-m-d', strtotime('+5 days')),
            'start_time' => '14:30:00',
            'end_time' => '15:30:00',
            'category' => 'personal',
            'priority' => 'medium',
            'location' => 'City Hospital'
        ]
    ];

    $insertQuery = "INSERT INTO events (user_id, title, description, start_date, end_date, start_time, end_time, category, priority, location) 
                   VALUES (:user_id, :title, :description, :start_date, :end_date, :start_time, :end_time, :category, :priority, :location)";

    $stmt = $db->prepare($insertQuery);
    
    foreach ($sampleEvents as $event) {
        $stmt->execute($event);
    }

    $response['status'] = 'success';
    $response['message'] = 'Database initialized with sample events';

} catch(PDOException $e) {
    $response['message'] = 'Database error: ' . $e->getMessage();
}

echo json_encode($response);
?>