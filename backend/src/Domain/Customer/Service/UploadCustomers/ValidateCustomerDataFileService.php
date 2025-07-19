<?php

namespace App\Domain\Customer\Service\UploadCustomers;

use App\Contract\DataValidationContract;
use App\Exception\ValidationException;

final class ValidateCustomerDataFileService implements DataValidationContract
{
    public function validateData(array $data): array
    {
        // Common CSV MIME types
        $allowedMimeTypes = [
            'text/csv',
            'text/plain',
            'application/vnd.ms-excel', // legacy Excel export format
            'application/csv',
        ];

        $validatedFiles = [];

        foreach ($data as $file) {
            if (file_exists($file)) {
                // Get file extension & mime type
                $extension = strtolower(pathinfo($file, PATHINFO_EXTENSION));
                $mimeType = mime_content_type($file);
                if (in_array($mimeType, $allowedMimeTypes, true)
                    && $extension === 'csv') {
                    $validatedFiles[] = $file;
                } else {
                    throw new ValidationException('Only csv (*.csv) files are supported');
                }
            } else {
                throw new ValidationException('Invalid or missing customer data file');
            }
        }

        return $validatedFiles;
    }
}
