<?php

namespace App\Domain\Customer\Service;

use App\Domain\Customer\Repository\GetCustomerRepository;
use App\Util\DataPagination;
use App\Util\Utilities;
use PDO;

final class GetCustomerService
{
    private GetCustomerRepository $getCustomerRepository;

    public function __construct(PDO $connection)
    {
        $this->getCustomerRepository = new GetCustomerRepository($connection);
    }

    public function getCustomer(array $data): array
    {
        $sanitizedData = SanitizeCustomerDataService::sanitizeData($data);
        $customerData = MapCustomerDataService::mapData($sanitizedData);
        $paginationConfig = DataPagination::getRecordOffset($sanitizedData['page'], $sanitizedData['recordsPerPage']);
        $customers = $this->getCustomerRepository->getCustomer(
            $customerData,
            $paginationConfig['recordStart'],
            $paginationConfig['recordsPerPage']
        );

        $records = [];
        foreach ($customers as $customer) {
            $records[] = [
                'id' => $customer['id'],
                'status' => $customer['status'],
                'firstName' => Utilities::normalizeString(Utilities::decodeUTF8($customer['first_name'])),
                'lastName' => Utilities::normalizeString(Utilities::decodeUTF8($customer['last_name'])),
                'phone' => Utilities::formatPhoneNumber($customer['phone']),
                'email' => $customer['email_address'] ?? '',
                'addressLine1' => Utilities::decodeUTF8($customer['address_line_1']),
                'addressLine2' => Utilities::decodeUTF8($customer['address_line_2']),
                'city' => Utilities::decodeUTF8($customer['city']),
                'state' => Utilities::decodeUTF8($customer['state']),
                'zip' => $customer['zip'] ?? ''
            ];
        }

        if ($sanitizedData['page'] > 0) {
            $countRecords = $this->getCustomerRepository->getCustomer($customerData);
            $pagination = DataPagination::getPagingLinks(
                $sanitizedData['page'],
                $countRecords->rowCount(),
                $paginationConfig['recordsPerPage']
            );

            return ['records' => $records, 'pagination' => $pagination];
        }

        return ['records' => $records];
    }
}
