<?php

namespace App\Domain\Customer\Service;

use App\Domain\Customer\Repository\DeleteCustomerRepository;
use App\Exception\RuntimeException;
use PDO;

final class DeleteCustomerService
{
    private DeleteCustomerRepository $deleteCustomerRepository;

    public function __construct(PDO $connection)
    {
        $this->deleteCustomerRepository = new DeleteCustomerRepository($connection);
    }

    /**
     * @throws RuntimeException
     */
    public function deleteCustomer(array $data): array
    {
        $sanitizedData = SanitizeCustomerDataService::sanitizeData($data);
        if ($this->deleteCustomerRepository->deleteCustomer($sanitizedData['id'])) {
            return [
                'success' => 'Customer deleted',
                'id' => $sanitizedData['id']
            ];
        }

        throw new RuntimeException(
            'Oops! An error occurred while processing you request, lease try again.'
        );
    }
}
