<?php

namespace App\Domain\Customer\Repository;

use App\Util\Utilities;
use PDO;

final class PhoneNumberExistsRepository
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function phoneExists(string $phone): bool
    {
        $query = "SELECT phone FROM customer WHERE REGEXP_REPLACE(phone, '[^0-9]', '') = ?";
        $query_stmt = $this->connection->prepare($query);

        $formattedPhoneNo = Utilities::removeNonDigits($phone);
        $query_stmt->bindParam(1, $formattedPhoneNo);
        $query_stmt->execute();
        return $query_stmt->rowCount() > 0;
    }
}
