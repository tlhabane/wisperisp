<?php

namespace App\Domain\Location\Service;

use App\Contract\SanitizeDataContract;
use App\Util\Utilities;

class SanitizeLocationDataService implements SanitizeDataContract
{
    public static function sanitizeData(array $data): array
    {
        return [
            'state' => Utilities::sanitizeAndEncodeString($data['state'] ?? ''),
            'page' => intval(Utilities::sanitizeString($data['page'] ?? 0)),
            'recordsPerPage' => intval(Utilities::sanitizeString($data['recordsPerPage'] ?? 0)),
        ];
    }
}
