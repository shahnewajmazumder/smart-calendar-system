<?php
// test_connection.php
header('Content-Type: text/plain');

include_once 'db_connection.php';

try {
    $database = new Database();
    $db = $database->getConnection();
    
    if ($db) {
        echo "✅ Database connection successful!\n\n";
        
        // Check if events table exists
        $tables = $db->query("SHOW TABLES LIKE 'events'")->fetchAll();
        if (count($tables) > 0) {
            echo "✅ Events table exists\n";
            
            // Count events
            $count = $db->query("SELECT COUNT(*) as total FROM events")->fetch()['total'];
            echo "📊 Total events in database: " . $count . "\n";
            
            // Show sample events
            $events = $db->query("SELECT id, title, start_date FROM events LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
            echo "\nSample events:\n";
            foreach ($events as $event) {
                echo "- ID: {$event['id']}, Title: {$event['title']}, Date: {$event['start_date']}\n";
            }
        } else {
            echo "❌ Events table does not exist\n";
        }
        
    } else {
        echo "❌ Database connection failed\n";
    }
    
} catch (PDOException $e) {
    echo "❌ Database error: " . $e->getMessage() . "\n";
}
?>