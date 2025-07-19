<?php

namespace App\Action\Location;

use App\Domain\Location\Service\GetStateService;
use App\Responder\DefaultStatus422ActionResponse;
use Psr\Container\ContainerExceptionInterface;
use Psr\Container\NotFoundExceptionInterface;
use App\Contract\ServerRequestContract;
use App\Routing\ServerResponseHandler;
use App\Factory\ContainerFactory;
use Exception;
use PDO;

final class GetStateAction
{
    /**
     * @throws Exception
     */
    public function invoke(ServerRequestContract $requestHandler): ServerResponseHandler
    {
        $defaultResponse = DefaultStatus422ActionResponse::getResponse();
        $responseHandler = $defaultResponse['defaultResponseHandler'];
        $actionResponse = $defaultResponse['defaultResponse'];

        try {
            $data = $requestHandler->getQueryParams();
            $container = (new ContainerFactory())->createInstance();

            $locationService = new GetStateService($container->get(PDO::class));
            $response = $locationService->getState($data);

            return $responseHandler
                ->withStatus(200)
                ->write(json_encode($response));
        } catch (NotFoundExceptionInterface|ContainerExceptionInterface $exception) {
            $actionResponse['message'] = $exception->getMessage();
            $actionResponse['statusCode'] = $exception->getCode();
        }

        return $responseHandler
            ->withHeader('Content-Type', 'application/json')
            ->withStatus($actionResponse['statusCode'])
            ->write(json_encode([
                'error' => $actionResponse['message'],
                'fields' => $actionResponse['fields']
            ]));
    }
}
