<?php

date_default_timezone_set('Africa/Johannesburg');

$settings = [];

// Database settings
$settings['db'] = [
    'driver'    => 'mysql',
    'host'      => '127.0.0.1',
    'port'      => '13306',
    'username'  => 'wisperisp',
    'database'  => 'wisperisp_customers',
    'password'  => 'w1s93ri$p*R00T3R',
    'charset'   => 'utf8mb4',
    'collation' => 'utf8mb4_unicode_ci',
    'strict' => false,
    'flags'     =>
        [
            // Turn off persistent connections
            PDO::ATTR_PERSISTENT => false,
            // Enable exceptions
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            // Emulate prepared statements
            PDO::ATTR_EMULATE_PREPARES => true,
            // Set default fetch mode to array
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            // Set character set
            PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci'
        ],
];

return $settings;
