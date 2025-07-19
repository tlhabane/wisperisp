<?php

namespace App\Routing;

use App\Contract\ServerRequestContract;
use Exception;

final class HttpActionRequestHandler
{
    protected function invokeAction(string $method, ServerRequestContract $request): void
    {
        try {
            (new $method)->invoke($request);
        } catch (Exception $exception) {
            echo json_encode(['message' => $exception->getMessage()]);
            http_response_code(503);
        }
    }

    public function handleRequestWithBody(string $method, string $middleWare = ''): void
    {
        try {

            $requestHandler = new ServerRequestDataHandler();
            $contentType = $requestHandler->getHeaderLine('content-type') ?? '';

            if (str_starts_with($contentType, 'application/json')) {
                $bodyData = json_decode(file_get_contents('php://input'), true);
                $bodyData = is_array($bodyData) ? $bodyData : [];
            } else {
                // fallback to $_POST (used by multipart/form-data)
                $bodyData = $_POST;
            }

            $requestHandler->setQueryParams($bodyData);

            if (!empty($_FILES)) {
                $requestHandler->setUploadedFiles($_FILES);
            }

            // invoke middleware
            if ($middleWare) {
                $requestHandler = $this->handleMiddleWare($middleWare, $requestHandler);
            }
            // invoke intended action
            $this->invokeAction($method, $requestHandler);
        } catch (Exception $exception) {
            echo json_encode(['message' => $exception->getMessage()]);
            http_response_code($exception->getCode());
        }
    }

    public function post(string $method, string $middleWare = ''): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $this->handleRequestWithBody($method, $middleWare);
        }
    }

    public function patch(string $method, string $middleWare = ''): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
            $this->handleRequestWithBody($method, $middleWare);
        }
    }

    public function delete(string $method, string $middleWare = ''): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
            $this->handleRequestWithBody($method, $middleWare);
        }
    }

    private function getUrlQueryParams(array $server): array
    {
        $currentUri = filter_var($server['REQUEST_URI'], FILTER_SANITIZE_URL);
        $uriParts = explode('?', $currentUri);
        $queryParamBits = explode('&', end($uriParts));
        $queryParams = [];
        foreach ($queryParamBits as $queryParamBit) {
            $keyValue = explode('=', $queryParamBit);
            if (count($keyValue) > 1) {
                $queryParams[$keyValue[0]] = $keyValue[1];
            }
        }

        return $queryParams;
    }

    /**
     * @throws Exception
     */
    public function get(string $method, string $middleWare = ''): void
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            try {
                $requestHandler = new ServerRequestDataHandler();
                if ($middleWare) {
                    $requestHandler = $this->handleMiddleWare($middleWare, $requestHandler);
                }

                $queryParams = $this->getUrlQueryParams($_SERVER);
                $requestHandler->setQueryParams($queryParams);

                $this->invokeAction($method, $requestHandler);
            } catch (Exception $exception) {
                echo json_encode(['message' => $exception->getMessage()]);
                http_response_code($exception->getCode());
            }
        }
    }

    /**
     * @throws Exception
     */
    protected function handleMiddleWare(
        string $middleWare,
        ServerRequestContract $requestHandler
    ): ServerRequestDataHandler {
        if (is_callable([new $middleWare, '__invoke'])) {
            return (new $middleWare)->__invoke($requestHandler);
        }

        throw new Exception('Invalid middleware class provided.');
    }
}
