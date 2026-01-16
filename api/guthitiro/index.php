<?php
date_default_timezone_set("Asia/Kathmandu");
if (!headers_sent()) {
    header("Content-Type: application/json; charset=UTF-8");
    // header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
}

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "db_guthitiro.php";

// -----------------------------
// Parse the request
// -----------------------------
$basePath = "/api/guthitiro"; 
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$path = preg_replace("#^$basePath#", "", $path);
$path = rtrim($path, "/");
$path = ltrim(strtolower($path), "/");  
$pathParts = $path === "" ? [] : explode("/", $path);
$method = $_SERVER['REQUEST_METHOD'];

// -----------------------------
// Routing
// -----------------------------
if ($method === "GET") {
    switch ($pathParts[0] ?? "") {                
        case "getdashlanddatabyofficeid":
            getDashLandDataByOfficeId($pathParts[1] ?? null);
            break;
        case "getdashrevenuedatabyofficeid":
            getDashRevenueDataByOfficeId($pathParts[1] ?? null, $pathParts[2] ?? null);
            break;
        case "getallshrestabyofficeid":
            getAllShrestaByOfficeId($pathParts[1] ?? null);
            break;
        case "getoneshrestabyid":
            getOneShrestaById($pathParts[1] ?? null);
            break;        
        case "getlandsbyshrestaid":
            getLandsByShrestaId($pathParts[1] ?? null);
            break;        
        case "getinvoicesbyshrestaid":
            getInvoicesByShrestaId($pathParts[1] ?? null);
            break;       
        case "getratesbyoffice":
            getRatesByOfficeId($pathParts[1] ?? null, $pathParts[2] ?? null);
            break;
        case "getratesbyid":
            getRatesById($pathParts[1] ?? null,$pathParts[2] ?? null);
            break;
        case "getpendinginvoicesbyofficeid":
            getPendingInvoicesByOfficeId($pathParts[1] ?? null);
            break;                           
        case "loadinvheaderdata":
            loadInvHeaderData($pathParts[1] ?? null);
            break;
        case "getpendingpaymentbyshrestaid":
            getPendingPaymentByShrestaId($pathParts[1] ?? null);
            break;
        case "loadinvdetaildata":
            loadInvDetailData($pathParts[1] ?? null);
            break;
        case "getoldtendersbyshrestaid":
            getOldTendersByShrestaId($pathParts[1] ?? null);
            break;
        case "dupliland":
            dupliland($pathParts[1] ?? null);
            break;
        case "districtbystate":
            districtByState($pathParts[1] ?? null);
            break;
        case "localtypesbydistrict":
            localTypesByDistrict($pathParts[1] ?? null);
            break;
        case "getpalikabydistrictandtype":
            getPalikaByDistrictAndType($pathParts[1] ?? null, $pathParts[2] ?? null);
            break;
        case "gabisabydistrictandpalikaid":
            gabisaByDistrictAndPalikaId($pathParts[1] ?? null, $pathParts[2] ?? null);
            break;        
        case "getinvoicesbyofficeid":
            getInvoicesByOfficeId($pathParts[1] ?? null);
            break;
        case "getlagatbyofficeid":
            getLagatByOfficeId($pathParts[1] ?? null);
            break;
        case "gettenderbyno":
            getTenderByNo($pathParts[1] ?? null);
            break;
        case "gettenderbyid":
            getTenderById($pathParts[1] ?? null);
            break;
        case "getmonthsum":
            getMonthSum($pathParts[1] ?? null, $pathParts[2] ?? null);
            break;
        case "getmonthsuminvoice":
            getMonthsSumInvoice($pathParts[1] ?? null);
            break;
        case "getdistinctpalika":
            getDistinctPalika($pathParts[1] ?? null);
            break;
        case "getdistinctgabisa":
            getDistinctGabisa($pathParts[1] ?? null);
            break;
        case "getdistinctwards":
            getDistinctWards($pathParts[1] ?? null);
            break;
 	    case "getvouchers":
            getVouchers($pathParts[1] ?? null, $pathParts[2] ?? null);
            break;
        case "getgabisas":
            getGabisas();
            break;    
        default:
            notFound();
    }
} elseif ($method === "POST") {
    switch ($pathParts[0] ?? "") {
        case "signup":
            signup();
            break;
        case "login":
            login();
            break;
        case "getall":
            getAll();
            break;   
        case "addupdateshresta":
            addUpdateShresta();
            break;
        case "savetender":
            saveTender();
            break;
        case "saveoldtender":
            saveOldTender();
            break;
        case "addorupdateland":
            addOrUpdateLand();
            break;
        case "geninvoice":
             genInvoice();
             break;
        case "updatediscounts":
            updateDiscounts();
            break;
        case "updatetender":
            updateTender();
            break;
        case "updatevoucher":
            updateVoucher();
            break;
        case "getkittadetails":
            getKittaDetails();
            break;
	case "downloadrecords":
            downloadRecords();
            break;
    case "deleteland":
            deleteLand();
            break;
    case "updateratesininvoicebyid":
        updateRatesInInvoiceByid();
        break;
        default:
            methodNotAllowed();
    }
} else {
    methodNotAllowed();
}

// -----------------------------
// s
// -----------------------------
function login() {
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    $input = json_decode(file_get_contents("php://input"), true);

    $username = $input['username'] ?? null;
    $password = $input['password'] ?? null;

    if (!$username) invalidInput("username");
    if (!$password) invalidInput("password");

    try {
        $sql = "SELECT a.*, 
                       b.state_id, b.office_name,
                       c.state_name,
                       d.id AS district_id, d.district_name,
                       e.id AS aaba_id
                FROM users a
                INNER JOIN offices b ON a.office_id = b.id
                INNER JOIN states c ON b.state_id = c.id
                INNER JOIN districts d ON b.district_id = d.id
                INNER JOIN aabas e ON e.is_current = 1
                WHERE a.username = :username";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["username" => $username]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        // -----------------------------
        // No user found
        // -----------------------------
        if (!$user) {
            http_response_code(401);
            echo json_encode([
                "status" => false,
                "message" => "प्रयोगकर्ता वा पासवर्ड मिलेन ।"
            ]);
            exit();
        }

        // -----------------------------
        // User inactive
        // -----------------------------
        if ($user["status"] == 0) {
            http_response_code(401);
            echo json_encode([
                "status" => false,
                "message" => "प्रयोगकर्ता सक्रिय गरिएको छैन । कृपया व्यवस्थापकलाई सम्पर्क गर्नुहोला ।"
            ]);
            exit();
        }

        // -----------------------------
        // Password mismatch
        // -----------------------------
        if (!password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode([
                "status" => false,
                "message" => "प्रयोगकर्ता वा पासवर्ड मिलेन ।"
            ]);
            exit();
        }

        // Remove hashed password
        unset($user['password']);

        // -----------------------------
        // Simple plain PHP token generator
        // -----------------------------
        function generateToken($uid) {
            return bin2hex(random_bytes(24)) . "_" . $uid;
        }

        $accessToken  = generateToken($user['id']);
        $refreshToken = generateToken($user['id']);

        // -----------------------------
        // Success Response
        // -----------------------------
        echo json_encode([
            "status" => true,
            "access_token" => $accessToken,
            "refresh_token" => $refreshToken,
            "data" => $user,
            "message" => "सफलतापूर्वक लगईन भयो ।"
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getDashLandDataByOfficeId($officeId) {
    if (!$officeId) invalidInput("officeid");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT 
                    a.guthi_type_id,
                    b.area_type_id,
                    SUM(b.area_units) AS area_units
                FROM shresta_header a
                INNER JOIN shresta_details b ON b.shresta_id = a.id
                WHERE a.office_id = :office_id and b.status=1
                GROUP BY a.guthi_type_id, b.area_type_id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["office_id" => $officeId]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $result
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getDashRevenueDataByOfficeId($officeId, $aabaId) {
    if (!$officeId) invalidInput("officeid");
    if (!$aabaId) invalidInput("aabaid");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT 
                    office_id,
                    aaba_id,
                    SUM(amount) AS A,
                    SUM(CASE WHEN mon = 4  THEN amount ELSE 0 END) AS B,
                    SUM(CASE WHEN mon = 5  THEN amount ELSE 0 END) AS C,
                    SUM(CASE WHEN mon = 6  THEN amount ELSE 0 END) AS D,
                    SUM(CASE WHEN mon = 7  THEN amount ELSE 0 END) AS E,
                    SUM(CASE WHEN mon = 8  THEN amount ELSE 0 END) AS F,
                    SUM(CASE WHEN mon = 9  THEN amount ELSE 0 END) AS G,
                    SUM(CASE WHEN mon = 10 THEN amount ELSE 0 END) AS H,
                    SUM(CASE WHEN mon = 11 THEN amount ELSE 0 END) AS I,
                    SUM(CASE WHEN mon = 12 THEN amount ELSE 0 END) AS J,
                    SUM(CASE WHEN mon = 1  THEN amount ELSE 0 END) AS K,
                    SUM(CASE WHEN mon = 2  THEN amount ELSE 0 END) AS L,
                    SUM(CASE WHEN mon = 3  THEN amount ELSE 0 END) AS M
                FROM invoice_tender
                WHERE office_id = :office_id
                  AND aaba_id = :aaba_id
                GROUP BY office_id, aaba_id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            "office_id" => $officeId,
            "aaba_id"   => $aabaId
        ]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $result
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getOneShrestaById($id) {
    if (!$id) invalidInput("id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT 
                    a.*,
                    d.guthi_name, 
                    b.guthi_type_name, 
                    c.tenant_type_name
                FROM shresta_header a
                INNER JOIN guthi_type b ON a.guthi_type_id = b.id
                INNER JOIN tenant_type c ON a.tenant_type_id = c.id
                INNER JOIN guthis d on a.guthi_id=d.id
                WHERE a.id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["id" => $id]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $result
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getAll() {
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");
    $input = json_decode(file_get_contents("php://input"), true);
    $table_name = $input['table_name'] ?? null;
    if (!$table_name) {
        echo json_encode(["status" => false, "message" => "Table name required"]);
        exit();
    }
    // ✅ Allow only specific tables (VERY IMPORTANT for security)
    $allowedTables = [
        'states',
        'districts',
        'users',
        'lands',
        'guthis',
        'guthi_type',
        'tenant_type',
        'wards',
        'aabas',
        'area_type',
        'land_type',
        'land_sub_type',
        'discounts',
        'tenders'

    ];

    if (!in_array($table_name, $allowedTables)) {
        echo json_encode(["status" => false, "message" => "Invalid table name"]);
        exit();
    }

    try {
        $sql = "SELECT * FROM `$table_name`";
        $stmt = $pdo->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $data
        ]);
        exit();
    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getAllShrestaByOfficeId($officeId) {
    if (!$officeId) invalidInput("officeid");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT 
                    a.*,
                    d.guthi_name,
                    b.guthi_type_name,
                    c.tenant_type_name
                FROM shresta_header a
                INNER JOIN guthi_type b ON a.guthi_type_id = b.id
                INNER JOIN tenant_type c ON a.tenant_type_id = c.id
                INNER JOIN guthis d on a.guthi_id=d.id
                WHERE a.office_id = :office_id
                ORDER BY a.id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["office_id" => $officeId]);
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $result
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getLandsByShrestaId($shrestaId) {
    if (!$shrestaId) invalidInput("shresta_id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT 
                    a.*,
                    b.state_name,
                    c.district_name,
                    d.palika_type_name,
                    e.gabisa_name,
                    f.area_type_name,
                    g.palika_name,
                    h.land_type_name,
                    i.land_sub_type_name
                FROM shresta_details a
                INNER JOIN states b ON a.state_id = b.id
                INNER JOIN districts c ON c.id = a.district_id
                INNER JOIN palika_type d ON d.id = a.palika_type_id
                INNER JOIN gabisas e ON e.id = a.gabisa_id
                INNER JOIN area_type f ON f.id = a.area_type_id
                INNER JOIN palikas g ON a.palika_id = g.id
                INNER JOIN land_type h ON a.land_type_id = h.id
                INNER JOIN land_sub_type i ON a.land_sub_type_id = i.id
                WHERE a.shresta_id = :shresta_id
                  AND a.status = 1
                ORDER BY a.id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["shresta_id" => $shrestaId]);
        $lands = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $lands
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getInvoicesByShrestaId($shrestaId) {
    if (!$shrestaId) invalidInput("shresta_id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT 
                    a.*,
                    b.nepname,
                    c.aaba_name,
                    d.aaba_name AS tiro_aaba_name
                FROM invoice_header a
                INNER JOIN users b ON a.created_by_user_id = b.id
                INNER JOIN aabas c ON a.invoice_aaba_id = c.id
                INNER JOIN aabas d ON a.tiro_aaba_id = d.id
                WHERE a.shresta_id = :shresta_id
                ORDER BY a.tiro_aaba_id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["shresta_id" => $shrestaId]);
        $invoices = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $invoices
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getRatesByOfficeId($officeId, $type) {
    if (!$officeId) invalidInput("officeid");
    if (!isset($type)) invalidInput("type");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        if ($type == 1) {
            // Adhinasta rates
            $sql = "SELECT 
                        a.*,
                        b.aaba_name AS start_aaba_name,
                        z.aaba_name AS end_aaba_name,
                        c.guthi_type_name,
                        d.palika_type_name,
                        e.land_type_name,
                        f.land_sub_type_name,
                        g.area_type_name
                    FROM rates_adhinasta a
                    INNER JOIN aabas b ON b.id = a.start_aaba_id
                    INNER JOIN aabas z ON z.id = a.end_aaba_id
                    INNER JOIN guthi_type c ON c.id = a.guthi_type_id
                    INNER JOIN palika_type d ON d.id = a.palika_type_id
                    INNER JOIN land_type e ON e.id = a.land_type_id
                    INNER JOIN land_sub_type f ON f.id = a.land_sub_type_id
                    INNER JOIN area_type g ON g.id = a.area_type_id
                    WHERE a.office_id = :office_id
                    ORDER BY a.start_aaba_id";

        } else {
            // Raitani rates
            $sql = "SELECT 
                        a.*,
                        d.aaba_name AS start_aaba_name,
                        e.aaba_name AS end_aaba_name,
                        b.palika_type_name,
                        c.area_type_name
                    FROM rates_raitani a
                    INNER JOIN palika_type b ON a.palika_type_id = b.id
                    INNER JOIN area_type c ON a.area_type_id = c.id
                    INNER JOIN aabas d ON a.start_aaba_id = d.id
                    INNER JOIN aabas e ON a.end_aaba_id = e.id
                    WHERE a.office_id = :office_id
                    ORDER BY a.start_aaba_id";
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["office_id" => $officeId]);
        $rates = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $rates
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getGabisaById($id) {
    if (!$id) invalidInput("id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $stmt = $pdo->prepare("SELECT * FROM gabisas WHERE id = :id");
        $stmt->execute(["id" => $id]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();
    } catch (Exception $e) {
        respondDbError($e);
    }
}
function addUpdateShresta() {
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    // Parse JSON body
    $data = json_decode(file_get_contents("php://input"), true);
    if (!$data) invalidInput("Invalid JSON body");

    try {
        if (isset($data['id']) && $data['id'] > 0) {
            // Update existing shresta
            $sql = "UPDATE shresta_header 
                    SET guthi_type_id = :guthi_type_id,
                        guthi_id = :guthi_id,
                        tenant_type_id = :tenant_type_id,
                        tenant_name = :tenant_name,
                        tenant_address = :tenant_address,
                        tenant_mobile_no = :tenant_mobile_no,
                        updated_by_user_id = :userid
                    WHERE id = :id";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                "guthi_type_id" => $data['guthi_type_id'],
                "guthi_id" => $data['guthi_id'],
                "tenant_type_id" => $data['tenant_type_id'],
                "tenant_name" => $data['tenant_name'],
                "tenant_address" => $data['tenant_address'],
                "tenant_mobile_no" => $data['tenant_mobile_no'],
                "userid" => $data['userid'],
                "id" => $data['id']
            ]);

            echo json_encode([
                "status" => true,
                "message" => "सफलतापुर्वक संशोधन भयो ।"]
            );
            exit();

        } else {
            // Insert new shresta
            $sql = "INSERT INTO shresta_header 
                        (office_id, guthi_type_id, guthi_id, tenant_type_id, tenant_name, tenant_address, tenant_mobile_no, created_by_user_id)
                    VALUES 
                        (:officeid, :guthi_type_id, :guthi_id, :tenant_type_id, :tenant_name, :tenant_address, :tenant_mobile_no, :userid)";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                "officeid" => $data['officeid'],
                "guthi_type_id" => $data['guthi_type_id'],
                "guthi_id" => $data['guthi_id'],
                "tenant_type_id" => $data['tenant_type_id'],
                "tenant_name" => $data['tenant_name'],
                "tenant_address" => $data['tenant_address'],
                "tenant_mobile_no" => $data['tenant_mobile_no'],
                "userid" => $data['userid']
            ]);

            echo json_encode([
                "status" => true,
                "message" => "सफलतापुर्वक दर्ता भयो ।"]
            );
            exit();
        }
    } catch (Exception $e) {
        respondDbError($e);
    }
}
function loadInvHeaderData($id) {
    if (!$id) invalidInput("id");
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT a.*, 
                       e.aaba_name,
                       d.guthi_type_name,
                       f.guthi_name,
                       c.tenant_type_name,
                       b.tenant_name,
                       b.tenant_address,
                       b.tenant_mobile_no
                FROM invoice_header a
                INNER JOIN shresta_header b ON a.shresta_id = b.id
                INNER JOIN tenant_type c ON b.tenant_type_id = c.id
                INNER JOIN guthi_type d ON b.guthi_type_id = d.id
                INNER JOIN aabas e ON e.id = a.tiro_aaba_id
                INNER JOIN guthis f on f.id=b.guthi_id
                WHERE a.id = :id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["id" => $id]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getPendingPaymentByShrestaId($shrestaId) {
    if (!$shrestaId) invalidInput("shrestaId");
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT a.id,
                       a.guthi_type_id,
                       a.shresta_id,
                       b.tenant_name,
                       a.tiro_aaba_id,
                       c.aaba_name,
                       a.invoice_amount,
                       a.discount_rate,
                       a.discount_amount,
                       a.fine_rate,
                       a.fine_amount,
                       a.final_amount,
                       a.remarks,
                       a.paid_status
                FROM invoice_header a
                INNER JOIN shresta_header b ON a.shresta_id = b.id
                INNER JOIN aabas c ON a.tiro_aaba_id = c.id
                WHERE a.shresta_id = :shrestaId AND a.paid_status = 0";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["shrestaId" => $shrestaId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function loadInvDetailData($headerId) {
    if (!$headerId) invalidInput("headerId");
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT a.*,
                       b.district_name,
                       c.gabisa_name,
                       d.area_type_name,
                       e.land_type_name,
                       f.land_sub_type_name,
                       g.aaba_name
                FROM invoice_details a
                INNER JOIN districts b ON a.district_id = b.id
                INNER JOIN gabisas c ON a.gabisa_id = c.id
                INNER JOIN area_type d ON a.area_type_id = d.id
                INNER JOIN land_type e ON e.id = a.land_type_id
                INNER JOIN land_sub_type f ON f.id = a.land_sub_type_id
                INNER JOIN aabas g ON g.id = a.rate_aaba_id
                WHERE a.invoice_header_id = :headerId
                ORDER BY a.id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["headerId" => $headerId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getOldTendersByShrestaId($shrestaId) {
    if (!$shrestaId) invalidInput("shrestaId");
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT a.id,a.shresta_id,a.aaba_id, b.aaba_name,edate,a.mon, ndate, tender_no, SUM(amount) AS amount
                FROM invoice_tender a
                INNER JOIN aabas b ON a.aaba_id = b.id
                WHERE shresta_id = :shrestaId
                GROUP BY a.aaba_id, b.aaba_name, ndate, tender_no
                ORDER BY aaba_id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["shrestaId" => $shrestaId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function saveTender() {
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    $user = json_decode(file_get_contents("php://input"), true);
    if (!$user) invalidInput("Invalid JSON body");

    try {
        $pdo->beginTransaction();        

        foreach ($user['data'] as $item) {
            $sqlInsert = "INSERT INTO invoice_tender
                (office_id, aaba_id, tiro_aaba_id, shresta_id, edate, ndate, mon, invoice_id, tender_type_id, tender_no, amount, created_by_user_id,created_at)
                VALUES
                (:office_id, :aaba_id, :tiro_aaba_id, :shresta_id, :edate, :ndate, :mon, :invoice_id, :tender_type_id, :tender_no, :amount, :created_by_user_id,NOW())";

            $stmt = $pdo->prepare($sqlInsert);
            $stmt->execute([
                "office_id" => $user['office_id'],
                "aaba_id" => $user['aaba_id'],
                "tiro_aaba_id" => $item['tiro_aaba_id'],
                "shresta_id" => $item['shresta_id'],
                "edate" => $user['edate'],
                "ndate" =>$user['ndate'],
                "mon" => $user['mon'],
                "invoice_id" => $item['id'],
                "tender_type_id" => $user['tender_type_id'],
                "tender_no" => $user['tender_no'],
                "amount" => $item['final_amount'],
                "created_by_user_id" => $user['user_id']
            ]);

            // Update invoice_header to mark paid
            $sqlUpdate = "UPDATE invoice_header SET paid_status = 1,updated_at=NOW() WHERE id = :id";
            $stmtUpdate = $pdo->prepare($sqlUpdate);
            $stmtUpdate->execute(["id" => $item['id']]);
        }

        $pdo->commit();
        echo json_encode(["status" => true, "message" => "टेन्डर सफलतापुर्वक दर्ता भयो ।"]);
        exit();

    } catch (Exception $e) {
        $pdo->rollBack();
        respondDbError($e);
    }
}
function saveOldTender() {
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    $user = json_decode(file_get_contents("php://input"), true);
    if (!$user) invalidInput("Invalid JSON body");

    try {
        $sql = "INSERT INTO invoice_tender
                (office_id, shresta_id, aaba_id, tender_no, ndate, amount, created_by_user_id)
                VALUES
                (:office_id, :shresta_id, :aaba_id, :tender_no, :ndate, :amount, :created_by_user_id)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            "office_id" => $user['office_id'],
            "shresta_id" => $user['shresta_id'],
            "aaba_id" => $user['aaba_id'],
            "tender_no" => $user['tender_no'],
            "ndate" => $user['ndate'],
            "amount" => $user['amount'],
            "created_by_user_id" => $user['user_id']
        ]);

        echo json_encode(["status" => true, "message" => "टेन्डर सफलतापुर्वक दर्ता भयो ।"]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function updateTender(){
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed"
            ]);
            exit();
        }

        // Read JSON body
        $input = json_decode(file_get_contents("php://input"), true);

        if (!$input) {
            echo json_encode([
                "status" => false,
                "message" => "Invalid request body"
            ]);
            exit();
        }

        // Required fields validation
        $required = ['id', 'aaba_id', 'shresta_id', 'ndate','edate','mon', 'tender_no', 'amount', 'user_id'];
        foreach ($required as $field) {
            if (!isset($input[$field])) {
                echo json_encode([
                    "status" => false,
                    "message" => "$field is required"
                ]);
                exit();
            }
        }

        $sql = "
        UPDATE invoice_tender
        SET
            aaba_id = :aaba_id,
            shresta_id = :shresta_id,
            ndate = :ndate,
            edate = :edate,
            mon = :mon,
            tender_no = :tender_no,
            amount = :amount,
            updated_by_user_id = :user_id,
            updated_at=NOW()
        WHERE id = :id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':aaba_id'    => $input['aaba_id'],
            ':shresta_id'=> $input['shresta_id'],
            ':ndate'     => $input['ndate'],
            ':edate'     => $input['edate'],
            ':mon'     => $input['mon'],
            ':tender_no' => $input['tender_no'],
            ':amount'    => $input['amount'],
            ':user_id'   => $input['user_id'],
            ':id'        => $input['id']
        ]);

        echo json_encode([
            "status" => true,
            "message" => "भौचर विवरण संशोधन भयो।"
        ]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Server Error",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}
function updateVoucher() {
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed"
            ]);
        }

        // Read JSON body
        $input = json_decode(file_get_contents("php://input"), true);
        if (!$input) {
            echo json_encode([
                "status" => false,
                "message" => "Invalid request body"
            ]);
        }

        // Required fields (id is optional)
        $required = ['aaba_id','ndate','edate','mon','amount','user_id','office_id'];
        foreach ($required as $field) {
            if (!isset($input[$field])) {
                echo json_encode([
                    "status" => false,
                    "message" => "$field is required"
                ]);
            }
        }

        $id = (int)($input['id'] ?? 0);

        /* ================= UPDATE ================= */
        if ($id > 0) {

            $sql = "
                UPDATE vouchers SET
                    office_id = :office_id,
                    aaba_id   = :aaba_id,
                    ndate     = :ndate,
                    edate     = :edate,
                    mon       = :mon,
                    amount    = :amount,
                    updated_by_user_id = :user_id,
                    updated_at = NOW()
                WHERE id = :id
            ";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                ':office_id' => $input['office_id'],
                ':aaba_id'   => $input['aaba_id'],
                ':ndate'     => $input['ndate'],
                ':edate'     => $input['edate'],
                ':mon'       => $input['mon'],
                ':amount'    => $input['amount'],
                ':user_id'   => $input['user_id'],
                ':id'        => $id
            ]);

            echo json_encode([
                "status"  => true,
                "message" => "भौचर विवरण संशोधन भयो।"
            ], JSON_UNESCAPED_UNICODE);
            exit();
        }

        /* ================= INSERT ================= */
        $sql = "
            INSERT INTO vouchers (
                office_id,
                aaba_id,
                ndate,
                edate,
                mon,
                amount,
                created_by_user_id,
                created_at
            ) VALUES (
                :office_id,
                :aaba_id,
                :ndate,
                :edate,
                :mon,
                :amount,
                :user_id,
                NOW()
            )
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':office_id' => $input['office_id'],
            ':aaba_id'   => $input['aaba_id'],
            ':ndate'     => $input['ndate'],
            ':edate'     => $input['edate'],
            ':mon'       => $input['mon'],
            ':amount'    => $input['amount'],
            ':user_id'   => $input['user_id']
        ]);

        echo json_encode([
            "status"  => true,
            "message" => "नयाँ भौचर सफलतापूर्वक थपियो।",
            "id"      => $pdo->lastInsertId()
        ], JSON_UNESCAPED_UNICODE);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status"  => false,
            "message" => "Server Error",
            "error"   => $e->getMessage()
        ]);
        exit();
    }
}

function dupliland($landId) {
    if (!$landId) invalidInput("land_id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "INSERT INTO shresta_details (
                    shresta_id,
                    state_id,
                    district_id,
                    office_id,
                    guthi_type_id,
                    palika_type_id,
                    palika_id,
                    gabisa_id,
                    ward_no,
                    land_type_id,
                    land_sub_type_id,
                    kitta_no,
                    area_type_id,
                    area,
                    area_units,
                    created_by_user_id,
                    updated_by_user_id,
                    status,
                    remarks_for_disabling
                )
                SELECT
                    shresta_id,
                    state_id,
                    district_id,
                    office_id,
                    guthi_type_id,
                    palika_type_id,
                    palika_id,
                    gabisa_id,
                    ward_no,
                    land_type_id,
                    land_sub_type_id,
                    kitta_no,
                    area_type_id,
                    area,
                    area_units,
                    created_by_user_id,
                    updated_by_user_id,
                    status,
                    remarks_for_disabling
                FROM shresta_details
                WHERE id = :land_id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["land_id" => $landId]);

        echo json_encode([
            "status" => true,
            "message" => "जग्गा सफलतापुर्वक कपि भयो ।",
            "data" => ["rows_affected" => $stmt->rowCount()]
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function districtByState($stateId) {
    if (!$stateId) invalidInput("state_id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT DISTINCT a.district_id AS id, b.district_name
                FROM gabisas a
                INNER JOIN districts b ON a.district_id = b.id
                WHERE a.state_id = :state_id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["state_id" => $stateId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function localTypesByDistrict($districtId) {
    if (!$districtId) invalidInput("district_id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT DISTINCT a.palika_type_id AS id, b.palika_type_name
                FROM gabisas a
                INNER JOIN palika_type b ON a.palika_type_id = b.id
                WHERE a.district_id = :district_id
                ORDER BY id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["district_id" => $districtId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getPalikaByDistrictAndType($districtId, $palikaTypeId) {
    if (!$districtId) invalidInput("district_id");
    if (!$palikaTypeId) invalidInput("palika_type_id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT DISTINCT a.palika_id AS id, b.palika_name
                FROM gabisas a
                INNER JOIN palikas b ON a.palika_id = b.id
                WHERE a.district_id = :district_id AND a.palika_type_id = :palika_type_id
                ORDER BY id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            "district_id" => $districtId,
            "palika_type_id" => $palikaTypeId
        ]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function gabisaByDistrictAndPalikaId($districtId, $palikaId) {
    if (!$districtId) invalidInput("district_id");
    if (!$palikaId) invalidInput("palika_id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT * FROM gabisas WHERE district_id = :district_id AND palika_id = :palika_id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            "district_id" => $districtId,
            "palika_id" => $palikaId
        ]);

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function addOrUpdateLand() {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data) invalidInput("request body");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        // -----------------------------
        // Update existing land
        // -----------------------------
        if (!empty($data['land_id']) && $data['land_id'] > 0) {
            $sql = "UPDATE shresta_details SET
                        state_id = :state_id,
                        district_id = :district_id,
                        guthi_type_id = :guthi_type_id,
                        palika_type_id = :palika_type_id,
                        palika_id = :palika_id,
                        gabisa_id = :gabisa_id,
                        ward_no = :ward_no,
                        kitta_no = :kitta_no,
                        land_type_id = :land_type_id,
                        land_sub_type_id = :land_sub_type_id,
                        area_type_id = :area_type_id,
                        area = :area,
                        area_units = :area_units,
                        updated_by_user_id = :userid,
                        updated_at=NOW()
                    WHERE id = :land_id";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                "state_id" => $data['state_id'],
                "district_id" => $data['district_id'],
                "guthi_type_id" => $data['guthi_type_id'],
                "palika_type_id" => $data['palika_type_id'],
                "palika_id" => $data['palika_id'],
                "gabisa_id" => $data['gabisa_id'],
                "ward_no" => $data['ward_no'],
                "kitta_no" => $data['kitta_no'],
                "land_type_id" => $data['land_type_id'],
                "land_sub_type_id" => $data['land_sub_type_id'],
                "area_type_id" => $data['area_type_id'],
                "area" => $data['area'],
                "area_units" => $data['area_units'],
                "userid" => $data['user_id'],
                "land_id" => $data['land_id']
            ]);

            echo json_encode(["status" => true, "message" => "जग्गा सफलतापुर्वक संशोधन भयो।"]);
            exit();
        }

        // -----------------------------
        // Insert new land (check for duplicates)
        // -----------------------------
        $sqlCheck = "SELECT * FROM shresta_details WHERE gabisa_id = :gabisa_id AND ward_no = :ward_no AND kitta_no = :kitta_no AND status = 1";
        $stmtCheck = $pdo->prepare($sqlCheck);
        $stmtCheck->execute([
            "gabisa_id" => $data['gabisa_id'],
            "ward_no" => $data['ward_no'],
            "kitta_no" => $data['kitta_no']
        ]);
        $existing = $stmtCheck->fetchAll(PDO::FETCH_ASSOC);

        if (!empty($existing)) {
            echo json_encode([
                "status" => false,
                "message" => "यो गा.वि.स । वडा नं . कित्ता नं पहिला नै अवस्थित छ ।"
            ]);
            exit();
        }

        // Insert new record
        $sqlInsert = "INSERT INTO shresta_details (
                        shresta_id,
                        state_id,
                        district_id,
                        office_id,
                        guthi_type_id,
                        palika_type_id,
                        palika_id,
                        gabisa_id,
                        ward_no,
                        land_type_id,
                        land_sub_type_id,
                        kitta_no,
                        area_type_id,
                        area,
                        area_units,
                        created_by_user_id
                    ) VALUES (
                        :shresta_id,
                        :state_id,
                        :district_id,
                        :office_id,
                        :guthi_type_id,
                        :palika_type_id,
                        :palika_id,
                        :gabisa_id,
                        :ward_no,
                        :land_type_id,
                        :land_sub_type_id,
                        :kitta_no,
                        :area_type_id,
                        :area,
                        :area_units,
                        :user_id
                    )";

        $stmtInsert = $pdo->prepare($sqlInsert);
        $stmtInsert->execute([
            "shresta_id" => $data['shresta_id'],
            "state_id" => $data['state_id'],
            "district_id" => $data['district_id'],
            "office_id" => $data['office_id'],
            "guthi_type_id" => $data['guthi_type_id'],
            "palika_type_id" => $data['palika_type_id'],
            "palika_id" => $data['palika_id'],
            "gabisa_id" => $data['gabisa_id'],
            "ward_no" => $data['ward_no'],
            "land_type_id" => $data['land_type_id'],
            "land_sub_type_id" => $data['land_sub_type_id'],
            "kitta_no" => $data['kitta_no'],
            "area_type_id" => $data['area_type_id'],
            "area" => $data['area'],
            "area_units" => $data['area_units'],
            "user_id" => $data['user_id']
        ]);

        echo json_encode(["status" => true, "message" => "जग्गा सफलतापुर्वक दर्ता भयो।"]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getLandById($landId) {
    if (!$landId) invalidInput("id");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT * FROM shresta_details WHERE id = :id";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(["id" => $landId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function genInvoice() {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!$data) invalidInput("request body");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $pdo->beginTransaction();

        // 1. Check if lands exist
        if (!checkIfLandExists($pdo, $data)) {
            $pdo->rollBack();
            echo json_encode(["status"=>false,"message"=>"यो श्रेष्तामा जग्गा विवरण उपलब्ध छैन ।"]);
            exit();
        }

        // 2. Check if invoice already exists
        if (getIfExistsAlready($pdo, $data) > 0) {
            $pdo->rollBack();
            echo json_encode(["status"=>false,"message"=>"यो श्रेष्ता र आ.व को रसिद पहिला नै तयार भैसकेको छ ।"]);
            exit();
        }

        // 3. Check if rate exists
        if ($data['guthi_type_id'] == 1) {
            if (!checkIfAdhinastaRateExists($pdo, $data)) {
                $pdo->rollBack();
                echo json_encode(["status"=>false,"message"=>"यो आ.व.को दर सेट गरिएको छैन ।"]);
                exit();
            }
        } else {
            if (!checkIfRaitaniRateExists($pdo, $data)) {
                $pdo->rollBack();
                echo json_encode(["status"=>false,"message"=>"यो आ.व.को दर सेट गरिएको छैन ।"]);
                exit();
            }
        }

        // 4. Generate invoice_no
        $invoice_no = getLastInvNo($pdo, $data);
        $data['invoice_no'] = $invoice_no;

        // 5. Insert invoice header
        $invoice_header_id = insertIntoHeader($pdo, $data);

        // 6. Insert invoice details
        insertIntoDetail($pdo, $data, $invoice_header_id);

        // 7. Update rates in details
        if ($data['guthi_type_id'] == 1) {
            updateAdhinastaRatesInDetail($pdo, $invoice_header_id);
        } else {
            updateRaitaniRatesInDetail($pdo, $invoice_header_id);
        }

        $pdo->commit();
        echo json_encode(["status"=>true,"message"=>"रसिद नं {$invoice_no} सफलतापुर्वक दर्ता भयो ।"]);
        exit();

    } catch (Exception $e) {
        $pdo->rollBack();
        respondDbError($e);
    }
}
// -------------------
// Helper Functions
// -------------------
function checkIfLandExists($pdo, $data) {
    $sql = "SELECT COUNT(*) as count FROM shresta_details WHERE shresta_id = :shresta_id AND status = 1";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["shresta_id"=>$data['shresta_id']]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return intval($row['count']) > 0;
}
function getIfExistsAlready($pdo, $data) {
    $sql = "SELECT COUNT(*) as count FROM invoice_header WHERE office_id=:office_id AND shresta_id=:shresta_id AND tiro_aaba_id=:aaba_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        "office_id"=>$data['office_id'],
        "shresta_id"=>$data['shresta_id'],
        "aaba_id"=>$data['aaba_id']
    ]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return intval($row['count']);
}
function checkIfAdhinastaRateExists($pdo, $data) {
    $sql = "SELECT COUNT(*) as count FROM rates_adhinasta WHERE :aaba_id BETWEEN start_aaba_id AND end_aaba_id AND office_id=:office_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["aaba_id"=>$data['aaba_id'], "office_id"=>$data['office_id']]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return intval($row['count']) > 0;
}
function checkIfRaitaniRateExists($pdo, $data) {
    $sql = "SELECT COUNT(*) as count FROM rates_raitani WHERE :aaba_id BETWEEN start_aaba_id AND end_aaba_id AND office_id=:office_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["aaba_id"=>$data['aaba_id'], "office_id"=>$data['office_id']]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    return intval($row['count']) > 0;
}
function getLastInvNo($pdo, $data) {    
    $sql = "SELECT COUNT(*) AS count FROM invoice_header WHERE office_id=:office_id AND invoice_aaba_id=:invoice_aaba_id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["office_id"=>$data['office_id'], "invoice_aaba_id"=>$data['invoice_aaba_id']]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    $no = intval($row['count']) + 1;
    return "{$data['office_id']}-{$data['invoice_aaba_id']}-{$no}";
}
function insertIntoHeader($pdo, $data) {
    $sql = "INSERT INTO invoice_header(invoice_no,state_id,district_id,office_id,guthi_type_id,tiro_aaba_id,invoice_aaba_id,shresta_id,edate,ndate,mon,invoice_amount,created_by_user_id)
            VALUES(:invoice_no,:state_id,:district_id,:office_id,:guthi_type_id,:aaba_id,:invoice_aaba_id,:shresta_id,:edate,:ndate,:mon,0,:user_id)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([
        "invoice_no"=>$data['invoice_no'],
        "state_id"=>$data['state_id'],
        "district_id"=>$data['district_id'],
        "office_id"=>$data['office_id'],
        "guthi_type_id"=>$data['guthi_type_id'],
        "aaba_id"=>$data['aaba_id'],
        "invoice_aaba_id"=>$data['invoice_aaba_id'],
        "shresta_id"=>$data['shresta_id'],
        "edate"=>$data['todayAd'],
        "ndate"=>$data['todayBs'],
        "mon"=>$data['todayMon'],
        "user_id"=>$data['user_id']
    ]);
    return $pdo->lastInsertId();
}
function insertIntoDetail($pdo, $data, $invoice_header_id) {
    $sql = "INSERT INTO invoice_details (
                invoice_header_id, invoice_no,guthi_type_id, shresta_id, district_id, palika_type_id, palika_id,
                gabisa_id, ward_no, land_type_id, land_sub_type_id, kitta_no, area_type_id, area, area_units, rate_aaba_id
            )
            SELECT ?, ?, a.guthi_type_id, a.shresta_id, a.district_id, a.palika_type_id, a.palika_id,
                   a.gabisa_id, a.ward_no, a.land_type_id, a.land_sub_type_id, a.kitta_no, a.area_type_id,
                   a.area, a.area_units, ? 
            FROM shresta_details a
            WHERE a.shresta_id = ? AND a.status=1
            ORDER BY a.id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$invoice_header_id, $data['invoice_no'], $data['aaba_id'], $data['shresta_id']]);
}
function updateAdhinastaRatesInDetail($pdo, $invoice_header_id) {
    try {
        // Update invoice details
        $sql = "
            UPDATE invoice_details AS i
            JOIN rates_adhinasta AS r
            ON i.rate_aaba_id BETWEEN r.start_aaba_id AND r.end_aaba_id
            AND i.palika_type_id = r.palika_type_id
            AND i.land_type_id = r.land_type_id
            AND i.land_sub_type_id = r.land_sub_type_id
            AND i.area_type_id = r.area_type_id
            SET i.rate = r.rate,
                i.unit_rate = r.unit_rate,
                i.amount = ROUND(r.unit_rate * i.area_units,2)
            WHERE i.invoice_header_id = ?
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$invoice_header_id]);

        // Update invoice header totals
        $sql1 = "
            UPDATE invoice_header h 
            JOIN (
                SELECT invoice_header_id, SUM(ROUND(amount,2)) AS total
                FROM invoice_details
                GROUP BY invoice_header_id
            ) d ON h.id = d.invoice_header_id
            SET h.invoice_amount = d.total,
                h.final_amount = d.total
            WHERE h.id = ?
        ";
        $stmt1 = $pdo->prepare($sql1);
        $stmt1->execute([$invoice_header_id]);

        return true;

    } catch (PDOException $e) {
        error_log("Adhinasta update error: " . $e->getMessage());
        return false;
    }
}
function updateRaitaniRatesInDetail($pdo, $invoice_header_id) {
    try {
        // Update invoice details
        $sql = "
            UPDATE invoice_details AS i
            JOIN rates_raitani AS r
            ON i.rate_aaba_id BETWEEN r.start_aaba_id AND r.end_aaba_id
            AND i.palika_type_id = r.palika_type_id
            AND i.area_type_id = r.area_type_id
            SET i.rate = r.rate,
                i.unit_rate = r.unit_rate,
                i.amount = ROUND(r.unit_rate * i.area_units,2)
            WHERE i.invoice_header_id = ?
        ";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$invoice_header_id]);

        // Update invoice header totals
        $sql1 = "
            UPDATE invoice_header h 
            JOIN (
                SELECT invoice_header_id, SUM(ROUND(amount,2)) AS total
                FROM invoice_details
                GROUP BY invoice_header_id
            ) d ON h.id = d.invoice_header_id
            SET h.invoice_amount = d.total,
                h.final_amount = d.total
            WHERE h.id = ?
        ";
        $stmt1 = $pdo->prepare($sql1);
        $stmt1->execute([$invoice_header_id]);

        return true;

    } catch (PDOException $e) {
        error_log("Raitani update error: " . $e->getMessage());
        return false;
    }
}
function updateDiscounts() {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || !isset($data['invoiceid'], $data['radiovalue'], $data['seldiscount'])) {
        echo json_encode(["status"=>false, "message"=>"Invalid request"]);
        exit();
    }

    $invoiceid = $data['invoiceid'];
    $radiovalue = $data['radiovalue'];
    $seldiscount = $data['seldiscount'];

    try {
        $pdo = getPDO();

        // Fetch the selected discount
        $stmt = $pdo->prepare("SELECT * FROM discounts WHERE id = ?");
        $stmt->execute([$seldiscount]);
        $discount = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$discount) {
            echo json_encode(["status"=>false, "message"=>"Discount not found"]);
            exit();
        }

        if ($radiovalue == 1) {
            // Apply discount
            $sql = "UPDATE invoice_header
                    SET fine_rate = 0,
                        fine_amount = 0,
                        discount_rate = :d_percent,
                        discount_amount = invoice_amount * (:d_percent/100),
                        remarks = :d_description,
                        final_amount = invoice_amount - (invoice_amount * (:d_percent/100))
                    WHERE id = :invoiceid";
        } else {
            // Apply fine
            $sql = "UPDATE invoice_header
                    SET fine_rate = :d_percent,
                        fine_amount = invoice_amount * (:d_percent/100),
                        discount_rate = 0,
                        discount_amount = 0,
                        remarks = :d_description,
                        final_amount = invoice_amount + (invoice_amount * (:d_percent/100))
                    WHERE id = :invoiceid";
        }

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            "d_percent" => $discount['d_percent'],
            "d_description" => $discount['d_description'],
            "invoiceid" => $invoiceid
        ]);

        echo json_encode([
            "status" => true,
            "message" => $radiovalue == 1 ? "सफलतापुर्वक छुट सेभ भयो" : "सफलतापुर्वक जरिवाना सेभ भयो"
        ]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Server Error",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}
function getTenders() {
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode(["status" => false, "message" => "Database connection failed"]);
            exit();
        }

        $stmt = $pdo->query("SELECT * FROM tenders");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $results]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Server Error",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}
function getInvoicesByOfficeId($office_id){
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed"
            ]);
            exit();
        }

        if (!$office_id) {
            echo json_encode([
                "status" => false,
                "message" => "Office ID is required"
            ]);
            exit();
        }

        $sql = "
        SELECT 
            a.office_id,
            d.office_name,
            e.guthi_type_name,
            f.guthi_name,
            b.tenant_name,
            b.tenant_address,
            a.ndate,
            a.edate,
            a.tiro_aaba_id,
            a.invoice_aaba_id,
            a.invoice_amount,
            a.discount_rate,
            a.discount_amount,
            a.fine_rate,
            a.fine_amount,
            a.final_amount,
            c.tender_no,
            c.amount AS tender_amount
        FROM invoice_header a
        INNER JOIN shresta_header b 
            ON a.shresta_id = b.id
        INNER JOIN invoice_tender c 
            ON c.invoice_id = a.id 
           AND c.shresta_id = b.id
        INNER JOIN offices d 
            ON d.id = a.office_id
        INNER JOIN guthi_type e 
            ON e.id = b.guthi_type_id
        INNER JOIN guthis f on
        b.guthi_id=f.id
        WHERE a.office_id = :office_id
        ORDER BY a.office_id, a.edate, b.tenant_name, a.tiro_aaba_id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':office_id' => $office_id
        ]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $results
        ]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Server Error",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}
function getLagatByOfficeId($office_id){
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed"
            ]);
            exit();
        }

        if (!$office_id) {
            echo json_encode([
                "status" => false,
                "message" => "Office ID is required"
            ]);
            exit();
        }

        $sql = "
        SELECT 
            a.office_id,
            h.office_name,
            b.guthi_type_name,
            k.guthi_name,
            c.tenant_type_name,
            a.tenant_name,
            a.tenant_address,
            a.tenant_mobile_no,
            e.palika_name,
            f.gabisa_name,
            d.ward_no,
            d.kitta_no,
            d.area_type_id,
            i.land_type_name,
            j.land_sub_type_name,
            g.area_type_name,
            d.area,
            d.area_units
        FROM shresta_header a
        INNER JOIN guthi_type b ON a.guthi_type_id = b.id
        INNER JOIN tenant_type c ON a.tenant_type_id = c.id
        INNER JOIN shresta_details d ON a.id = d.shresta_id
        INNER JOIN palikas e ON e.id = d.palika_id
        INNER JOIN gabisas f ON f.id = d.gabisa_id
        INNER JOIN area_type g ON g.id = d.area_type_id
        INNER JOIN offices h ON h.id = a.office_id
        INNER JOIN land_type i ON i.id = d.land_type_id
        INNER JOIN land_sub_type j ON j.id = d.land_sub_type_id
        INNER JOIN guthis k on k.id=a.guthi_id
        WHERE a.office_id = :office_id
          AND d.status = 1
        ORDER BY 
            a.guthi_type_id,
            k.guthi_name,
            f.gabisa_name,
            d.ward_no,
            d.kitta_no
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':office_id' => $office_id
        ]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $results
        ]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Server Error",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}
function getTenderByNo($tender_no){
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed"
            ]);
            exit();
        }

        if (!$tender_no) {
            echo json_encode([
                "status" => false,
                "message" => "Tender number is required"
            ]);
            exit();
        }

        $sql = "
        SELECT 
            a.*,
            c.guthi_name,
            b.tenant_name,
            b.tenant_address
        FROM invoice_tender a
        LEFT JOIN shresta_header b         
            ON a.shresta_id = b.id
        LEFT JOIN guthis c 
            on c.id=b.guthi_id
        WHERE a.tender_no like :tender_no
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
           ':tender_no' => "%{$tender_no}%" // search anywhere in the string
        ]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $results
        ]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Server Error",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}

function getTenderById($tender_id){
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed"
            ]);
            exit();
        }

        if (!$tender_id) {
            echo json_encode([
                "status" => false,
                "message" => "Tender ID is required"
            ]);
            exit();
        }

        $sql = "
        SELECT 
            a.*
        FROM invoice_tender a
        WHERE a.id = :tender_id
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':tender_id' => $tender_id
        ]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $result
        ]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status" => false,
            "message" => "Server Error",
            "error" => $e->getMessage()
        ]);
        exit();
    }
}
function getMonthSum($office_id, $aaba_id){
    try {
        $pdo = getPDO();
        if (!$pdo) {
            echo json_encode([
                "status" => false,
                "message" => "Database connection failed"
            ]);
            exit();
        }

        if (!$office_id || !$aaba_id) {
            echo json_encode([
                "status" => false,
                "message" => "Office ID and Aaba ID are required"
            ]);
            exit();
        }

        $sql = "
        SELECT 
            a.mon,
            b.month_name,
            a.guthi_type_id,
            c.guthi_type_name,
            SUM(CASE WHEN tiro_aaba_id <> :aaba_id THEN final_amount ELSE 0 END) AS bakyeuta,
            SUM(CASE WHEN tiro_aaba_id = :aaba_id THEN final_amount ELSE 0 END) AS thisyear,
            SUM(final_amount) AS total
        FROM invoice_header a
        INNER JOIN months b ON a.mon = b.id
        INNER JOIN guthi_type c ON a.guthi_type_id = c.id
        WHERE a.invoice_aaba_id = :aaba_id
          AND a.office_id = :office_id
          AND a.paid_status = 1
        GROUP BY a.mon, b.month_name, a.guthi_type_id, c.guthi_type_name
        ORDER BY a.mon
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':aaba_id'   => $aaba_id,
            ':office_id' => $office_id
        ]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status"  => true,
            "message" => "डाटा सफलतापुर्वक प्राप्त भयो ।",
            "data"    => $results
        ]);
        exit();

    } catch (Exception $e) {
        echo json_encode([
            "status"  => false,
            "message" => "Server Error",
            "error"   => $e->getMessage()
        ]);
        exit();
    }
}
function getMonthsSumInvoice($officeId) {
    if (!$officeId) invalidInput("office_id");   

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "
        SELECT 
                a.aaba_id,a.mon, 
                a.tender_no,
                a.ndate, 
                b.tenant_name, 
                SUM(a.amount) as amount
            FROM invoice_tender a
            INNER JOIN shresta_header b ON a.shresta_id = b.id
            WHERE a.office_id = :office_id
            GROUP BY a.aaba_id,a.mon, a.tender_no
            ORDER BY a.aaba_id,a.mon, a.tender_no,a.ndate            
        ";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["office_id" => $officeId]);

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);        

        echo json_encode([
            "status" => true,
            "data" =>$results
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getDistinctPalika($officeId) {
    if (!$officeId) invalidInput("officeId");  // validate input

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");  // check DB connection

    try {
        $sql = "SELECT DISTINCT a.palika_id, b.palika_name
                FROM shresta_details a
                INNER JOIN palikas b ON b.id = a.palika_id
                WHERE a.office_id = :officeId
                ORDER BY b.palika_name";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["officeId" => $officeId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getDistinctGabisa($palikaId) {
    if (!$palikaId) invalidInput("palikaId");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT DISTINCT a.gabisa_id, c.gabisa_name
                FROM shresta_details a
                INNER JOIN gabisas c ON c.id = a.gabisa_id
                WHERE a.palika_id = :palikaId
                ORDER BY c.gabisa_name";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["palikaId" => $palikaId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getDistinctWards($gabisaId) {
    if (!$gabisaId) invalidInput("gabisaId");

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT DISTINCT a.ward_no
                FROM shresta_details a
                WHERE a.gabisa_id = :gabisaId
                ORDER BY a.ward_no";

        $stmt = $pdo->prepare($sql);
        $stmt->execute(["gabisaId" => $gabisaId]);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getKittaDetails() {
    // Validate required inputs
    $requestData = json_decode(file_get_contents('php://input'), true);
    $requiredFields = ['office_id', 'palika_id', 'gabisa_id', 'ward_no', 'kitta_no'];
    foreach ($requiredFields as $field) {
        if (empty($requestData[$field])) {
            invalidInput($field);
        }
    }

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT a.shresta_id,
                       a.guthi_type_id,
                       e.guthi_type_name,
                       f.guthi_name,
                       b.tenant_name,
                       b.tenant_address,
                       c.palika_name,
                       d.gabisa_name,
                       a.ward_no,
                       a.kitta_no,
                       a.area,
                       a.status
                FROM shresta_details a
                INNER JOIN shresta_header b ON a.shresta_id = b.id
                INNER JOIN palikas c ON c.id = a.palika_id
                INNER JOIN gabisas d ON d.id = a.gabisa_id
                INNER JOIN guthi_type e ON a.guthi_type_id = e.id
                INNER JOIN guthis f on b.guthi_id=f.id
                WHERE a.office_id = :office_id
                  AND a.palika_id = :palika_id
                  AND a.gabisa_id = :gabisa_id
                  AND a.ward_no = :ward_no
                  AND a.kitta_no = :kitta_no";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            "office_id" => $requestData['office_id'],
            "palika_id" => $requestData['palika_id'],
            "gabisa_id" => $requestData['gabisa_id'],
            "ward_no"   => $requestData['ward_no'],
            "kitta_no"  => $requestData['kitta_no']
        ]);

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "data" => $data]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function downloadRecords() {
    header("Content-Type: application/json");

    $pdo = getPDO();
    if (!$pdo) return dbUnavailable("Remote");

    // Read JSON POST
    $inputJSON = file_get_contents('php://input');
    $input = json_decode($inputJSON, true);

    $date   = $input['date']   ?? '';
    $tables = $input['tables'] ?? [];

    if (!$date || empty($tables) || !is_array($tables)) {
        echo json_encode([
            'status'  => false,
            'message' => 'Date and tables are required'
        ]);
        return;
    }

    try {
        $responseData = [];

        foreach ($tables as $table) {

            // 🔐 strict sanitization (letters, numbers, underscore only)
            $table = str_replace(['`', ';', ' ', '-', '.', '/'], '', $table);

            if ($table === '') {
                continue;
            }

            $sql = "
                SELECT *
                FROM `$table`
                WHERE created_at >= :date
                   OR updated_at >= :date
            ";

            $stmt = $pdo->prepare($sql);
            $stmt->execute([':date' => $date]);

            $responseData[$table] = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        echo json_encode([
            'status' => true,
            'data'   => $responseData
        ]);

    } catch (PDOException $e) {
        echo json_encode([
            'status'  => false,
            'message' => $e->getMessage()
        ]);
    }
}
function deleteLand() {
    // Validate required inputs
    $requestData = json_decode(file_get_contents('php://input'), true);
    $requiredFields = ['id', 'remarks'];
    foreach ($requiredFields as $field) {
        if (empty($requestData[$field])) {
            invalidInput($field);
        }
    }

    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "update shresta_details set status=0,remarks_for_disabling=:remarks where id=:id";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ":remarks" => $requestData['remarks'],
            ":id" => $requestData['id']            
        ]);

        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(["status" => true, "message"=>'जग्गा सफलतापुर्वक हटाईयो ।']);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
 function getPendingInvoicesByOfficeId($office_id){
     $pdo = getPDO();
    if (!$pdo) return dbUnavailable("Remote");

    if (!$office_id ) {
        return invalidInput("office_id");
    }

    try {
        $stmt = $pdo->prepare("
            SELECT 
                    a.*,
										e.tenant_name,										
                    b.nepname,
                    c.aaba_name,
                    d.aaba_name AS tiro_aaba_name
                FROM invoice_header a
                INNER JOIN users b ON a.created_by_user_id = b.id
                INNER JOIN aabas c ON a.invoice_aaba_id = c.id
                INNER JOIN aabas d ON a.tiro_aaba_id = d.id
								inner join shresta_header e on a.shresta_id=e.id
                WHERE a.office_id=? and a.paid_status=0
                ORDER BY a.shresta_id,a.tiro_aaba_id
        ");

        $stmt->execute([$office_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status"  => true,
            "message" => "भुक्तानी बाँकी विवरण प्राप्त भयो",
            "data"    => $results
        ], JSON_UNESCAPED_UNICODE);

    } catch (PDOException $e) {
        respondDbError($e);
    }
}
function getVouchers($aaba_id,$office_id) {
    $pdo = getPDO();
    if (!$pdo) return dbUnavailable("Remote");

    if (!$office_id || !$aaba_id) {
        return invalidInput("office_id or aaba_id");
    }

    try {
        $stmt = $pdo->prepare("
            SELECT a.*,b.aaba_name,c.office_name
            FROM vouchers a
            INNER JOIN aabas b ON a.aaba_id = b.id
            INNER JOIN offices c ON a.office_id = c.id
            WHERE a.office_id = ? AND a.aaba_id = ?
        ");

        $stmt->execute([$office_id, $aaba_id]);
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status"  => true,
            "message" => "भौचर सूची प्राप्त भयो",
            "data"    => $results
        ], JSON_UNESCAPED_UNICODE);

    } catch (PDOException $e) {
        respondDbError($e);
    }
}
function updateRatesInInvoiceByid() {
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    // Read JSON body
    $input = json_decode(file_get_contents("php://input"), true);

    $invoice_id = $input['invoice_id'] ?? null;
    $shresta_id = $input['shresta_id'] ?? null;

    if (!$invoice_id) invalidInput("invoice_id");
    if (!$shresta_id) invalidInput("shresta_id");

    try {
        // -----------------------------
        // Get guthi_type_id from shresta_header
        // -----------------------------
        $stmt = $pdo->prepare(
            "SELECT guthi_type_id 
             FROM shresta_header 
             WHERE id = :shresta_id"
        );
        $stmt->execute(['shresta_id' => $shresta_id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$row) {
            echo json_encode([
                "status" => false,
                "message" => "श्रेष्ता विवरण फेला परेन ।"
            ], JSON_UNESCAPED_UNICODE);
            exit();
        }

        $guthi_type_id = (int)$row['guthi_type_id'];

        // -----------------------------
        // Update rates based on guthi type
        // -----------------------------
        if ($guthi_type_id === 1) {

            // === ADHINASTA ===
            $result = updateAdhinastaRatesInDetail($pdo,$invoice_id);

        } else {

            // === RAITANI ===
            $result = updateRaitaniRatesInDetail($pdo,$invoice_id);
        }

        if ($result === true) {
            echo json_encode([
                "status" => true,
                "message" => "सफलतापुर्वक गणना भयो ।"
            ], JSON_UNESCAPED_UNICODE);
            exit();
        }

        echo json_encode([
            "status" => false,
            "message" => "गणना गर्न सकिएन ।"
        ], JSON_UNESCAPED_UNICODE);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function getGabisas() {
    $pdo = getPDO();
    if (!$pdo) dbUnavailable("Main");

    try {
        $sql = "SELECT 
                    a.*,
                    b.state_name,
                    c.district_name,
                    d.palika_type_name,
                    e.palika_name
                FROM gabisas a
                INNER JOIN states b ON a.state_id = b.id
                INNER JOIN districts c ON a.district_id = c.id
                INNER JOIN palika_type d ON a.palika_type_id = d.id
                INNER JOIN palikas e ON a.palika_id = e.id
                ORDER BY b.id, c.district_name, d.id, e.palika_name, a.gabisa_name";

        $stmt = $pdo->query($sql);
        $gabisas = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "status" => true,
            "data" => $gabisas
        ]);
        exit();

    } catch (Exception $e) {
        respondDbError($e);
    }
}
function notFound() { http_response_code(404); echo json_encode(["status"=>false,"message"=>"Not Found"]); exit(); }
function methodNotAllowed() { http_response_code(405); echo json_encode(["status"=>false,"message"=>"Method Not Allowed"]); exit(); }
function respondDbError($e) { http_response_code(500); echo json_encode(["status"=>false,"message"=>"Database Error","error"=>$e->getMessage()]); exit(); }
function dbUnavailable($type) { http_response_code(500); echo json_encode(["status"=>false,"message"=>"$type database not available"]); exit(); }
function invalidInput($field) { http_response_code(400); echo json_encode(["status"=>false,"message"=>"Invalid input: $field"]); exit(); }
?>
