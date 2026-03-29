<?php
session_start();
header('Content-Type: application/json');

if (isset($_SESSION['user_id']) && isset($_SESSION['last_activity'])) {
    // Check if session has expired (24 hours)
    if (time() - $_SESSION['last_activity'] > 24 * 60 * 60) {
        // Session expired
        session_unset();
        session_destroy();
        echo json_encode(['status' => 'expired']);
    } else {
        // Update last activity time
        $_SESSION['last_activity'] = time();
        echo json_encode(['status' => 'active']);
    }
} else {
    echo json_encode(['status' => 'inactive']);
}
?>