<?php
header("Content-Type: application/json; charset=UTF-8");

// --------------------
// DB Connection
// --------------------
$host = "localhost";
$user = "root";
$password = "";
$dbname = "guthitiro";

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $user,
        $password,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );
} catch (PDOException $e) {
    echo json_encode([
        'status' => false,
        'message' => 'DB connection failed: ' . $e->getMessage()
    ]);
    exit;
}

// --------------------
// Read Input
// --------------------
$inputJSON = file_get_contents("php://input");
$input = json_decode($inputJSON, true);

if (!isset($input['data']) || !is_array($input['data'])) {
    echo json_encode([
        'status' => false,
        'message' => 'Invalid data payload'
    ]);
    exit;
}

$data = $input['data'];

// --------------------
// PRIORITY TABLES
// --------------------
$priority = ['shresta_header', 'invoice_header'];

try {
    $pdo->beginTransaction();

    /* ===============================
       1) INSERT PRIORITY TABLES FIRST
       =============================== */
    foreach ($priority as $tableName) {

        if (!isset($data[$tableName])) continue;

        $rows = $data[$tableName];
        if (!is_array($rows) || count($rows) === 0) continue;

        $tableName = str_replace(['`', ';', ' ', '-', '.', '/'], '', $tableName);

        foreach ($rows as $row) {

            if (!isset($row['id'])) continue;

            $columns = array_keys($row);

            $colList = implode(", ", array_map(fn($c) => "`$c`", $columns));
            $placeholders = implode(", ", array_map(fn($c) => ":$c", $columns));

            $updateList = implode(", ", array_map(
                fn($c) => "`$c` = VALUES(`$c`)",
                array_filter($columns, fn($c) => $c !== 'id')
            ));

            $sql = "
                INSERT INTO `$tableName` ($colList)
                VALUES ($placeholders)
                ON DUPLICATE KEY UPDATE $updateList
            ";

            $stmt = $pdo->prepare($sql);

            foreach ($row as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }

            $stmt->execute();
        }
    }

    /* ===============================
       2) INSERT REMAINING TABLES
       =============================== */
    foreach ($data as $tableName => $rows) {

        if (in_array($tableName, $priority)) continue;
        if (!is_array($rows) || count($rows) === 0) continue;

        $tableName = str_replace(['`', ';', ' ', '-', '.', '/'], '', $tableName);

        foreach ($rows as $row) {

            if (!isset($row['id'])) continue;

            $columns = array_keys($row);

            $colList = implode(", ", array_map(fn($c) => "`$c`", $columns));
            $placeholders = implode(", ", array_map(fn($c) => ":$c", $columns));

            $updateList = implode(", ", array_map(
                fn($c) => "`$c` = VALUES(`$c`)",
                array_filter($columns, fn($c) => $c !== 'id')
            ));

            $sql = "
                INSERT INTO `$tableName` ($colList)
                VALUES ($placeholders)
                ON DUPLICATE KEY UPDATE $updateList
            ";

            $stmt = $pdo->prepare($sql);

            foreach ($row as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }

            $stmt->execute();
        }
    }

    $pdo->commit();

    echo json_encode([
        'status' => true,
        'message' => 'Data sync completed successfully'
    ]);

} catch (PDOException $e) {
    $pdo->rollBack();
    echo json_encode([
        'status' => false,
        'message' => $e->getMessage()
    ]);
}
