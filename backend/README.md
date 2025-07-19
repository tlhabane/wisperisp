# 📦 Wisper ISP – Backend (PHP 8.1+ backend with OOP + MySQL)

This backend handles all customer data operations for the Wisper ISP assignment.

## 📌 Features

- POST endpoint to upload `customer_data.csv`
- Filters for `state`, `city`, and `status`
- Capitalization of names, phone formatting
- MySQL `customer` table with auto timestamping
- Full CRUD: Add, Update, Delete, List
- OOP architecture with reusable request handler
- No frameworks – pure PHP

---

## 🚀 Demo

[`https://dev.kreativware.co.za/`](https://dev.kreativware.co.za/)

---

## ⚙ Getting Started

### Prerequisites

- PHP ≥ 8.1+
- MySQL (preferably v8.0.14)
- [`Fileinfo (ext-fileinfo)`](https://www.php.net/manual/en/fileinfo.setup.php)
- [`OpenSSL (ext-openssl)`](https://www.php.net/manual/en/openssl.setup.php)
- [`PDO (ext-pdo)`](https://www.php.net/manual/en/pdo.setup.php)



### MySQL Setup

1. Import the [`customers.sql`](./sql/customers.sql) file:

```bash
mysql -u root -p wisper_db < customer.sql
````

2. Installation

### `composer require`

Installs all required dependencies

2. Update DB credentials in [`config/settings.php`](./config/settings.php).

```ts
$settings['db'] = [
    'driver'    => 'mysql',
    'host'      => '127.0.0.1',
    'port'      => '3306',
    'username'  => [`YOUR_USERNAME`],
    'database'  => [`YOUR_DATABASE_NAME`],
    'password'  => [`YOUR_PASSWORD`],
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
```

### 3. Run the PHP server
```bash
cd backend
```
```bash
php -S localhost:8000
```


