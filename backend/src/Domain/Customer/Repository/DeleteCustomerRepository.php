<?php

namespace App\Domain\Customer\Repository;

use PDO;

final class DeleteCustomerRepository
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function deleteCustomer(int $customer_id): bool
    {
        $query = "DELETE FROM customer WHERE id = ?";
        $query_stmt = $this->connection->prepare($query);
        $query_stmt->bindParam(1, $customer_id, PDO::PARAM_INT);
        return $query_stmt->execute();
    }
}
