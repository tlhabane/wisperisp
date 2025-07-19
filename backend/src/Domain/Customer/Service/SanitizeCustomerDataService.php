<?php

namespace App\Domain\Customer\Service;

use App\Contract\SanitizeDataContract;
use App\Util\Utilities;

final class SanitizeCustomerDataService implements SanitizeDataContract
{
    public static function sanitizeData(array $data): array
    {
        return [
            'id' => intval(Utilities::sanitizeString($data['id'] ?? '')),
            'status' => Utilities::sanitizeString($data['status'] ?? ''),
            'firstName' => Utilities::sanitizeAndEncodeString($data['firstName'] ?? ''),
            'lastName' => Utilities::sanitizeAndEncodeString($data['lastName'] ?? ''),
            'phone' => Utilities::sanitizeAndEncodeString($data['phone'] ?? ''),
            'email'  => Utilities::sanitizeEmail($data['email'] ?? ''),
            'addressLine1' => Utilities::sanitizeAndEncodeString($data['addressLine1'] ?? ''),
            'addressLine2' => Utilities::sanitizeAndEncodeString($data['addressLine2'] ?? ''),
            'city' => Utilities::sanitizeAndEncodeString($data['city'] ?? ''),
            'state' => Utilities::sanitizeAndEncodeString($data['state'] ?? ''),
            'zip' => Utilities::sanitizeString($data['zip'] ?? ''),
            'search' => Utilities::sanitizeAndEncodeString($data['search'] ?? ''),
            'page' => intval(Utilities::sanitizeString($data['page'] ?? 0)),
            'recordsPerPage' => intval(Utilities::sanitizeString($data['recordsPerPage'] ?? 0)),
        ];
    }
}
