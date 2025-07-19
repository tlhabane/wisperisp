<?php

use Psr\Container\ContainerInterface;
use App\Util\BasePathDetector;

return [
    'settings' => function () {
        return require __DIR__ . '/settings.php';
    },

    PDO::class => function (ContainerInterface $container): PDO {
        $settings = $container->get('settings')['db'];
        $host = $settings['host'];
        $port = $settings['port'];
        $dbname = $settings['database'];
        $username = $settings['username'];
        $password = $settings['password'];
        $charset = $settings['charset'];
        $flags = $settings['flags'];

        $dsn = "mysql:host={$host}:{$port};dbname={$dbname};charset={$charset}";

        return new PDO($dsn, $username, $password, $flags);
    },

    BasePathDetector::class => function () {
        return new BasePathDetector($_SERVER);
    }
];
