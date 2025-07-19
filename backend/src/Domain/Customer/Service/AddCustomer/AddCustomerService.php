<?php

namespace App\Domain\Customer\Service\AddCustomer;

use App\Domain\Customer\Repository\AddCustomerRepository;
use App\Domain\Customer\Service\SanitizeCustomerDataService;
use App\Domain\Customer\Service\MapCustomerDataService;
use App\Exception\ValidationException;
use App\Exception\RuntimeException;
use PDO;

final class AddCustomerService
{
    private AddCustomerRepository $addCustomerRepository;
    private ValidateAddCustomerDataService $validateAddCustomerDataService;

    public function __construct(PDO $connection)
    {
        $this->addCustomerRepository = new AddCustomerRepository($connection);
        $this->validateAddCustomerDataService = new ValidateAddCustomerDataService($connection);
    }

    /**
     * @throws ValidationException
     * @throws RuntimeException
     */
    public function addCustomer(array $data): array
    {
        $sanitizedData = SanitizeCustomerDataService::sanitizeData($data);
        $validatedData = $this->validateAddCustomerDataService->validateData($sanitizedData);
        $customerData = MapCustomerDataService::mapData($validatedData);

        $customerId = $this->addCustomerRepository->addCustomer($customerData);
        if ($customerId > 0) {
            return [
                'success' => 'New customer added',
                'id' => $customerId
            ];
        }

        throw new RuntimeException(
            'Oops! An error occurred while processing you request, lease try again.'
        );
    }
}
