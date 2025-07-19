<?php

namespace App\Domain\Customer\Service\UploadCustomers;

use App\Exception\RuntimeException;

final class LoadCustomersFromFileService
{
    /**
     * @throws RuntimeException
     */
    public static function loadCustomers(string $filepath): array
    {
        $handle = fopen($filepath, 'r');
        if (!$handle) {
            throw new RuntimeException("Failed to open file.");
        }

        return self::getCutomers($handle);
    }

    private static function getCutomers(mixed $stream): array {
        // Read the headers
        $headers = fgetcsv($stream);

        $customers = [];
        while (($row = fgetcsv($stream)) !== false) {
            $data = array_combine($headers, $row);

            $customers[] = [
                'status' => strtolower($data['status'] ?? 'active'),
                'firstName' => $data['first_name'] ?? '',
                'lastName' => $data['last_name'] ?? '',
                'phone' => $data['phone'] ?? '',
                'email' => $data['email_address'] ?? '',
                'addressLine1' => $data['address_line_one'] ?? '',
                'addressLine2' => $data['address_line_two'] ?? '',
                'city' => $data['city'] ?? '',
                'state' => $data['state'] ?? '',
                'zip' => $data['zip'] ?? ''
            ];
        }

        return $customers;
    }
}
