<?php
$pdo = null;
function getPDO() {
  global $pdo;
    if ($pdo) return $pdo; // return existing connection

    // $host = "sql104.infinityfree.com";
    // $user = "if0_39673703";
    // $password = "aAUd2BqwtIYK6O";
    // $dbname = "if0_39673703_bargikaran";

    $host = "localhost";
    $user = "root";
    $password = "";
    $dbname = "guthitiro";

    try {
        $pdo = new PDO(
            "mysql:host=$host;dbname=$dbname;charset=utf8",
            $user,
            $password,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
            ]
        );
    } catch (PDOException $e) {
        error_log("Remote DB connection failed: " . $e->getMessage());
        $pdo = null;
    }

    return $pdo;
}


?>
