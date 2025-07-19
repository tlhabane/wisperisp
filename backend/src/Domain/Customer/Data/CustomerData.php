<?php

namespace App\Domain\Customer\Data;

final class CustomerData
{
    public int $id;
    public CustomerStatus $status;
    public string $first_name;
    public string $last_name;
    public string $phone;
    public string $email_address;
    public string $address_line_1;
    public string $address_line_2;
    public string $city;
    public string $state;
    public string $zip;

    public string $search;
}
