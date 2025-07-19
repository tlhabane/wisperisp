<?php

namespace App\Domain\Customer\Repository;

use PDO;

final class EmailAddressExistsRepository
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function emailExists(string $email): bool
    {
        $query = "SELECT email_address FROM customer WHERE TRIM(LOWER(email_address)) = ?";
        $query_stmt = $this->connection->prepare($query);

        $formattedEmail = trim(strtolower($email));
        $query_stmt->bindParam(1, $formattedEmail);

        $query_stmt->execute();
        return $query_stmt->rowCount() > 0;
    }
}
