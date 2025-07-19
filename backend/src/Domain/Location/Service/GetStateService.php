<?php

namespace App\Domain\Location\Service;

use App\Domain\Location\Repository\GetStateRepository;
use App\Util\DataPagination;
use App\Util\Utilities;
use PDO;

final class GetStateService
{
    private GetStateRepository $getStateRepository;

    public function __construct(PDO $connection)
    {
        $this->getStateRepository = new GetStateRepository($connection);
    }

    public function getState(array $data): array
    {
        $sanitizedData = SanitizeLocationDataService::sanitizeData($data);
        $paginationConfig = DataPagination::getRecordOffset($sanitizedData['page'], $sanitizedData['recordsPerPage']);
        $states = $this->getStateRepository->getState(
            $paginationConfig['recordStart'],
            $paginationConfig['recordsPerPage']
        );

        $records = [];
        foreach ($states as $state) {
            $records[] = Utilities::decodeUTF8($state['state']);
        }

        if ($sanitizedData['page'] > 0) {
            $countRecords = $this->getStateRepository->getState();
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
