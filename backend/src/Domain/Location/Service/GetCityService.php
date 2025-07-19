<?php

namespace App\Domain\Location\Service;

use App\Domain\Location\Repository\GetCityRepository;
use App\Util\DataPagination;
use App\Util\Utilities;
use PDO;

final class GetCityService
{
    private GetCityRepository $getCityRepository;

    public function __construct(PDO $connection)
    {
        $this->getCityRepository = new GetCityRepository($connection);
    }

    public function getCity(array $data): array
    {
        $sanitizedData = SanitizeLocationDataService::sanitizeData($data);
        $paginationConfig = DataPagination::getRecordOffset($sanitizedData['page'], $sanitizedData['recordsPerPage']);
        $cities = $this->getCityRepository->getCity(
            $sanitizedData['state'],
            $paginationConfig['recordStart'],
            $paginationConfig['recordsPerPage']
        );

        $records = [];
        foreach ($cities as $city) {
            $records[] = Utilities::decodeUTF8($city['city']);
        }

        if ($sanitizedData['page'] > 0) {
            $countRecords = $this->getCityRepository->getCity($sanitizedData['state']);
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
