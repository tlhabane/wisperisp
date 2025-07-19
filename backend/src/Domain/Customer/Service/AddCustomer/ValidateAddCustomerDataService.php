<?php

namespace App\Domain\Customer\Service\AddCustomer;

use App\Contract\DataValidationContract;
use App\Domain\Customer\Repository\PhoneNumberExistsRepository;
use App\Domain\Customer\Repository\EmailAddressExistsRepository;
use App\Exception\ValidationException;
use PDO;

final class ValidateAddCustomerDataService implements DataValidationContract
{
    private PhoneNumberExistsRepository $phoneNumberExistsRepository;
    private EmailAddressExistsRepository $emailAddressExistsRepository;

    public function __construct(PDO $connection)
    {
        $this->phoneNumberExistsRepository = new PhoneNumberExistsRepository($connection);
        $this->emailAddressExistsRepository = new EmailAddressExistsRepository($connection);
    }

    public function validateData(array $data): array
    {
        $fields = [];
        if (empty($data['firstName'])) {
            $fields['firstName'] = 'Invalid first name provided';
        }
        // Validate phone number
        if (empty($data['phone'])) {
            $fields['phone'] = 'Invalid phone number provided';
        } elseif ($this->phoneNumberExistsRepository->phoneExists($data['phone'])) {
            $fields['phone'] = sprintf('Phone number provided (%s) is already registered', $data['phone']);
        }
        // Validate email address
        if (empty($data['email'])) {
            $fields['email'] = 'Invalid email address provided';
        } elseif ($this->emailAddressExistsRepository->emailExists($data['email'])) {
            $fields['email'] = sprintf('Email address provided (%s) is already registered', $data['email']);
        }

        if (count($fields) > 0) {
            throw new ValidationException('Data validation error', 422, $fields);
        }

        return $data;
    }
}
