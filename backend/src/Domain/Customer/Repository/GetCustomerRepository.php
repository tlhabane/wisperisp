<?php

namespace App\Domain\Customer\Repository;

use App\Domain\Customer\Data\CustomerData;
use PDOStatement;
use PDO;

final class GetCustomerRepository
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function getCustomer(CustomerData $data, $record_start = 0, $record_limit = 0): PDOStatement
    {
        $query = "SELECT
                    id, status, first_name, last_name, phone, email_address, address_line_1, address_line_2,
                    city, state, zip
                  FROM 
                    customer";


        $query_filters[] = empty($data->id) ? "" : "id = :id";
        $query_filters[] = empty($data->city) ? "" : "TRIM(LOWER(city)) = :city";
        $query_filters[] = empty($data->state) ? "" : "TRIM(LOWER(state)) = :state";
        $query_filters[] = empty($data->status->value) ? "" : "status = :status";

        if (!empty($data->search)) {
            $query_filters[] = "(
                id LIKE :search OR first_name LIKE :search OR last_name LIKE :search OR 
                phone LIKE :search OR email_address LIKE :search OR address_line_1 LIKE :search OR 
                address_line_2 LIKE :search OR city LIKE :search OR state LIKE :search OR 
                zip LIKE :search
            )";
        }
        $query_filter = implode(" AND ", array_filter($query_filters, fn($value) => $value !== ""));
        $query = empty($query_filter) ? $query : "{$query} WHERE {$query_filter}";

        if ($record_start > 0 || $record_limit > 0) {
            if ($record_start > 0 && $record_limit > 0) {
                $query .= " LIMIT :record_start, :record_limit";
            } else {
                $query .= " LIMIT :record_limit";
            }
        }

        $query_stmt = $this->connection->prepare($query);
        if (!empty($data->id)) {
            $query_stmt->bindParam(':id', $data->id, PDO::PARAM_INT);
        }
        if (!empty($data->city)) {
            $formattedCity = str_replace('%20', ' ', trim(strtolower($data->city)));
            $query_stmt->bindParam(':city', $formattedCity);
        }
        if (!empty($data->state)) {
            $formattedState = str_replace('%20', ' ', trim(strtolower($data->state)));
            $query_stmt->bindParam(':state', $formattedState);
        }
        if (!empty($data->status->value)) {
            $statusValue = $data->status->value;
            $query_stmt->bindParam(':status', $statusValue, PDO::PARAM_INT);
        }
        if (!empty($data->search)) {
            $formattedSearch = str_replace('%20', ' ', trim(strtolower($data->search)));
            $sqlSearch = "%{$formattedSearch}%";
            $query_stmt->bindParam(':search', $sqlSearch);
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
