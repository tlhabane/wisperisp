<?php

namespace App\Domain\Location\Repository;

use PDOStatement;
use PDO;

final class GetCityRepository
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getCity(string $state = '', $record_start = 0, $record_limit = 0): PDOStatement
    {
        $query = "SELECT city FROM customer";
        $query.= empty($state) ? "" : " WHERE TRIM(LOWER(state)) = :state";
        $query.= " GROUP BY city ORDER BY city";
        if ($record_start > 0 || $record_limit > 0) {
            if ($record_start > 0 && $record_limit > 0) {
                $query .= " LIMIT :record_start, :record_limit";
            } else {
                $query .= " LIMIT :record_limit";
            }
        }

        $query_stmt = $this->connection->prepare($query);
        if (!empty($state)) {
            $formattedState = str_replace('%20', ' ', trim(strtolower($state)));
            $query_stmt->bindParam(':state', $formattedState);
        }
        if ($record_start > 0) {
            $query_stmt->bindParam(':record_start', $record_start, PDO::PARAM_INT);
        }
        if ($record_limit > 0) {
            $query_stmt->bindParam(':record_limit', $record_limit, PDO::PARAM_INT);
        }

        $query_stmt->execute();
        return $query_stmt;
    }
}
