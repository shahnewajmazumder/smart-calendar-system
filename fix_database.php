<?php
include_once 'db_connection.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    // Add missing columns
    $db->exec("ALTER TABLE events ADD COLUMN IF NOT EXISTS start_time TIME DEFAULT '09:00:00'");
    $db->exec("ALTER TABLE events ADD COLUMN IF NOT EXISTS end_time TIME DEFAULT '17:00:00'");
    
    echo "Database fixed successfully!";
} catch(Exception $e) {
    echo "Error: " . $e->getMessage();
}
?>