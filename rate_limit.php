<?php
class RateLimiter {
    private $redis;
    private $maxRequests;
    private $windowSize;

    public function __construct($maxRequests = 100, $windowSize = 3600) {
        $this->maxRequests = $maxRequests;
        $this->windowSize = $windowSize;
        $this->redis = new Redis();
        $this->redis->connect('127.0.0.1', 6379);
    }

    public function isAllowed($identifier) {
        $key = "rate_limit:" . $identifier;
        $current = $this->redis->get($key);

        if ($current === false) {
            $this->redis->setex($key, $this->windowSize, 1);
            return true;
        }

        if ($current >= $this->maxRequests) {
            return false;
        }

        $this->redis->incr($key);
        return true;
    }

    public function getRemainingRequests($identifier) {
        $key = "rate_limit:" . $identifier;
        $current = $this->redis->get($key);
        return $current === false ? $this->maxRequests : max(0, $this->maxRequests - $current);
    }
}

// Usage in API endpoints
$rateLimiter = new RateLimiter(100, 3600); // 100 requests per hour
$clientIP = $_SERVER['REMOTE_ADDR'];

if (!$rateLimiter->isAllowed($clientIP)) {
    http_response_code(429);
    header('X-RateLimit-Limit: ' . $rateLimiter->maxRequests);
    header('X-RateLimit-Remaining: 0');
    header('X-RateLimit-Reset: ' . (time() + $rateLimiter->windowSize));
    echo json_encode(array("success" => false, "message" => "Rate limit exceeded"));
    exit;
}

header('X-RateLimit-Limit: ' . $rateLimiter->maxRequests);
header('X-RateLimit-Remaining: ' . $rateLimiter->getRemainingRequests($clientIP));
header('X-RateLimit-Reset: ' . (time() + $rateLimiter->windowSize));
?>