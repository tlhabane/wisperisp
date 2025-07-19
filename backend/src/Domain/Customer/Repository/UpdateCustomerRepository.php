<?php

namespace App\Domain\Customer\Repository;

use App\Domain\Customer\Data\CustomerData;
use PDO;

final class UpdateCustomerRepository
{
    private PDO $connection;

    public function __construct(PDO $connection)
    {
        $this->connection = $connection;
    }

    public function updateCustomer(CustomerData $data): bool
    {
        $query = "UPDATE customer SET 
                    status = :status,     
                    first_name = :first_name,
                    last_name = :last_name,
                    phone = :phone,
                    email_address = :email_address,
                    address_line_1 = :address_line_1,
                    address_line_2 = :address_line_2,
                    city = :city,
                    state = :state,
                    zip = :zip
                  WHERE 
                      id = :id";

        $query_stmt = $this->connection->prepare($query);
        $query_data = [
            "id" => $data->id,
            'status' => $data->status->value,
            'first_name' => $data->first_name,
            'last_name' => $data->last_name,
            'phone' => $data->phone,
            'email_address' => $data->email_address,
            'address_line_1' => $data->address_line_1,
            'address_line_2' => $data->address_line_2,
            'city' => $data->city,
            'state' => $data->state,
            'zip' => $data->zip
        ];

        return $query_stmt->execute($query_data);
    }
}
