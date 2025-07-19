<?php

namespace App\Middleware;

use App\Routing\ServerRequestDataHandler;
use App\Exception\RuntimeException;
use App\Util\Utilities;

class FileUploadMiddleware
{
    /**
     * @throws RuntimeException
     */
    public function __invoke(ServerRequestDataHandler $request): ServerRequestDataHandler
    {
        $files = $request->getUploadedFiles();
        $uploadedFiles = [];

        foreach ($files as $key => $fileData) {
            // Handle multiple files under one key (e.g. "file[]")
            if (is_array($fileData['name'])) {
                for ($i = 0; $i < count($fileData['name']); $i++) {
                    $tmpPath = $fileData['tmp_name'][$i];
                    $filename = basename($fileData['name'][$i]);
                    $uploadedFiles[] = $this->uploadFile($tmpPath, $filename);
                }
            } else {
                // Handle single file
                $tmpPath = $fileData['tmp_name'];
                $filename = basename($fileData['name']);
                $uploadedFiles[] = $this->uploadFile($tmpPath, $filename);
            }
        }

        // Store uploaded file paths as a request attribute
        $request->setAttributes(['uploadedFiles' => $uploadedFiles], 'files');

        return $request;
    }

    private function getDestinationFileName(string $tmpFilename): string
    {
        $extension  = pathinfo($tmpFilename, PATHINFO_EXTENSION);
        $filename = '';

        do {
            $basename = UPLOADS_DIR . Utilities::generateToken();
            $filename = sprintf('%s.%0.8s', $basename, $extension);
        } while (empty($filename) || file_exists($filename));

        return $filename;
    }

    /**
     * @throws RuntimeException
     */
    private function uploadFile(mixed $tmpPath, mixed $filename): string
    {
        $destination = $this->getDestinationFileName($filename);

        if (is_uploaded_file($tmpPath)) {
            move_uploaded_file($tmpPath, $destination);
            return $destination;
        }

        throw new RuntimeException(
            sprintf('Oops! An error occurred while uploading %s, please try again.', $filename)
        );
    }
}
