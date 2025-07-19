<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, PATCH, PUT, OPTIONS, GET, DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
} else {
    (require_once __DIR__ . '/../config/bootstrap.php');
    (require_once __DIR__ . '/../config/constants.php');
    (require_once __DIR__ . '/../config/routes.php');

    file_put_contents(__DIR__ . '/debug.log', print_r([
        '_FILES' => $_FILES,
        '_POST' => $_POST,
        'CONTENT_TYPE' => $_SERVER['CONTENT_TYPE'] ?? 'N/A'
    ], true));
}
