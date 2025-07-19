<?php

namespace App\Domain\Customer\Service;

use App\Domain\Customer\Data\CustomerData;
use App\Domain\Customer\Data\CustomerStatus;

final class MapCustomerDataService
{
    public static function mapData(array $sanitizedData): CustomerData
    {
        $data = new CustomerData();
        $data->id = $sanitizedData['id'];
        $data->status = match (strtolower($sanitizedData['status'])) {
            'inactive' => CustomerStatus::inactive,
            'cancelled' => CustomerStatus::cancelled,
            default => CustomerStatus::active, // fallback
        };
        $data->first_name = $sanitizedData['firstName'];
        $data->last_name = $sanitizedData['lastName'];
        $data->phone = $sanitizedData['phone'];
        $data->email_address = $sanitizedData['email'];
        $data->address_line_1 = $sanitizedData['addressLine1'];
        $data->address_line_2 = $sanitizedData['addressLine2'];
        $data->city = $sanitizedData['city'];
        $data->state = $sanitizedData['state'];
        $data->zip = $sanitizedData['zip'];
        $data->search = $sanitizedData['search'];

        return $data;
    }
}
