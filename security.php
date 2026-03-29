<?php
class Security {
    public static function sanitizeInput($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function validateDate($date, $format = 'Y-m-d') {
        $d = DateTime::createFromFormat($format, $date);
        return $d && $d->format($format) === $date;
    }

    public static function generateCSRFToken() {
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        return $_SESSION['csrf_token'];
    }

    public static function verifyCSRFToken($token) {
        return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
    }

    public static function checkAuth() {
        if (!isset($_SESSION['user_id'])) {
            http_response_code(401);
            echo json_encode(array("success" => false, "message" => "Unauthorized"));
            exit;
        }
    }

    public static function rateLimit($key, $maxAttempts = 5, $timeWindow = 900) {
        $redis = new Redis();
        $redis->connect('127.0.0.1', 6379);
        
        $current = $redis->get($key);
        if ($current && $current >= $maxAttempts) {
            http_response_code(429);
            echo json_encode(array("success" => false, "message" => "Too many requests"));
            exit;
        }
        
        $redis->incr($key);
        $redis->expire($key, $timeWindow);
    }
}
?>