<?php

namespace App\Domain\Customer\Service\UpdateCustomer;

use App\Contract\DataValidationContract;
use App\Domain\Customer\Service\GetCustomerService;
use App\Domain\Customer\Repository\PhoneNumberExistsRepository;
use App\Domain\Customer\Repository\EmailAddressExistsRepository;
use App\Exception\ValidationException;
use App\Util\Utilities;
use PDO;

final class ValidateUpdateCustomerDataService implements DataValidationContract
{
    private GetCustomerService $getCustomerService;
    private PhoneNumberExistsRepository $phoneNumberExistsRepository;
    private EmailAddressExistsRepository $emailAddressExistsRepository;

    public function __construct(PDO $connection)
    {
        $this->getCustomerService = new GetCustomerService($connection);
        $this->phoneNumberExistsRepository = new PhoneNumberExistsRepository($connection);
        $this->emailAddressExistsRepository = new EmailAddressExistsRepository($connection);
    }

    public function validateData(array $data): array
    {
        $customers = $this->getCustomerService->getCustomer([
            'id' => $data['id']
        ]);

        if (empty($data['id']) || count($customers['records']) === 0) {
            throw new ValidationException('Invalid or missing customer details');
        }

        $fields = [];
        if (empty($data['firstName'])) {
            $fields['firstName'] = 'Invalid first name provided';
        }

        foreach ($customers['records'] as $customer) {
            // Validate phone number
            $currentNo = Utilities::removeNonDigits($customer['phone']);
            $newNo = Utilities::removeNonDigits($data['phone']);
            $phoneUpdate = $currentNo !== $newNo;

            if (empty($data['phone'])) {
                $fields['phone'] = 'Invalid phone number provided';
            } elseif ($phoneUpdate && $this->phoneNumberExistsRepository->phoneExists($data['phone'])) {
                $fields['phone'] = sprintf('Phone number provided (%s) is already registered', $data['phone']);
            }

            // Validate email address
            $emailUpdate = trim(strtolower($customer['email'])) !== trim(strtolower($data['email']));
            if (empty($data['email'])) {
                $fields['email'] = 'Invalid email address provided';
            } elseif ($emailUpdate && $this->emailAddressExistsRepository->emailExists($data['email'])) {
                $fields['email'] = sprintf('Email address provided (%s) is already registered', $data['email']);
            }
        }

        if (count($fields) > 0) {
            throw new ValidationException('Data validation error', 422, $fields);
        }

        return $data;
    }
}
