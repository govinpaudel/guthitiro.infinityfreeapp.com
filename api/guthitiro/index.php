<?php
if (!headers_sent()) {
    header("Content-Type: application/json; charset=UTF-8");
    // header("Access-Control-Allow-Origin: *"); // Allow all origins (adjust if needed)
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "db_guthi.php";

// -----------------------------
// Ensure PDO is available
// -----------------------------
if (!isset($pdo)) {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Database connection not initialized."
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// -----------------------------
// Parse the request
// -----------------------------
$basePath = "/api/guthi"; 
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = preg_replace("#^$basePath#", "", $path);
$path = rtrim($path, "/");
$method = $_SERVER['REQUEST_METHOD'];

error_log("Requested path: " . $path); // Debugging

// -----------------------------
// Routing
// -----------------------------
if ($method === "GET") {
$path = strtolower($path);
    if ($path === "/getaabas") {
        getAabas($pdo);

    } else {
        notFound();
    }

} else {
    methodNotAllowed();
}

// -----------------------------
// Route Handlers
// -----------------------------
function getAabas($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM offices");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode([
            "status" => true,
            "message" => "डाटा प्राप्त भयो",
            "data" => $results
        ], JSON_UNESCAPED_UNICODE);
    } catch (PDOException $e) {
        respondDbError($e);
    }
}

function respondDbError($e) {
    http_response_code(500);
    echo json_encode([
        "status" => false,
        "message" => "Database error: " . $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
}

function methodNotAllowed() {
    http_response_code(405);
    echo json_encode([
        "status" => false,
        "message" => "Method not allowed"
    ], JSON_UNESCAPED_UNICODE);
}

function notFound() {
    http_response_code(404);
    echo json_encode([
        "status" => false,
        "message" => "Route not found"
    ], JSON_UNESCAPED_UNICODE);
}
