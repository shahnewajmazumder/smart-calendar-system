<?php
header('Content-Type: application/json');
session_start();
session_destroy();

echo json_encode(array("success" => true, "message" => "Logged out successfully."));
?>