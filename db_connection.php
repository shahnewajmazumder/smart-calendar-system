<?php
class Database {
    private $host = "localhost";
    private $db_name = "smart_calendar";
    private $username = "root"; // Change if needed
    private $password = ""; // Change if needed
    public $conn;

    public function getConnection() {
        $this->conn = null;
        try {
            $this->conn = new PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->exec("set names utf8");
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $exception) {
            echo "Connection error: " . $exception->getMessage();
        }
        return $this->conn;
    }
}

function getDatabaseConnection() {
    $database = new Database();
    return $database->getConnection();
}
?>