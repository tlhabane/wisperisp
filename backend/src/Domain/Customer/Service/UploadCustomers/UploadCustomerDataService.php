<?php

namespace App\Domain\Customer\Service\UploadCustomers;

use App\Domain\Customer\Repository\DeleteCustomerRepository;
use App\Domain\Customer\Service\AddCustomer\AddCustomerService;
use App\Exception\ValidationException;
use App\Exception\RuntimeException;
use PDO;

final class UploadCustomerDataService
{
    private AddCustomerService $addCustomerService;
    private DeleteCustomerRepository $deleteCustomerRepository;
    private ValidateCustomerDataFileService $validateCustomerDataFileService;

    public function __construct(PDO $connection)
    {
        $this->addCustomerService = new AddCustomerService($connection);
        $this->deleteCustomerRepository = new DeleteCustomerRepository($connection);
        $this->validateCustomerDataFileService = new ValidateCustomerDataFileService();
    }

    /**
     * @throws ValidationException
     * @throws RuntimeException
     */
    public function uploadCustomers(array $files): array
    {
        $customers_added = [];

        try {
            $validatedFiles = $this->validateCustomerDataFileService->validateData($files);
            foreach ($validatedFiles as $validatedFile) {
                $customers = LoadCustomersFromFileService::loadCustomers($validatedFile);
                foreach ($customers as $customer) {
                    $customers_added[] = $this->addCustomerService->addCustomer($customer);
                }
            }

            return [
                'success' => sprintf('%s customer records created', count($customers_added)),
            ];
        } catch (RuntimeException | ValidationException $exception) {
            // rollback
            foreach ($customers_added as $id) {
                $this->deleteCustomerRepository->deleteCustomer((int)$id);
            }

            // rethrow exception(s)
            if ($exception instanceof ValidationException) {
                throw new ValidationException(
                    $exception->getMessage(),
                    $exception->getCode(),
                    $exception->getErrors()
                );
            }

            throw new RuntimeException($exception->getMessage(), $exception->getCode());
        }
    }
}
