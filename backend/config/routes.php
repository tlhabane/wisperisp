<?php

use App\Routing\HttpRequestVerbHandler;

// Customer routes (end-points)
HttpRequestVerbHandler::get('/customer', App\Action\Customer\GetCustomerAction::class);
HttpRequestVerbHandler::post(
    '/customer/load',
    App\Action\Customer\UploadCustomerDataAction::class,
    App\Middleware\FileUploadMiddleware::class
);
HttpRequestVerbHandler::post('/customer', App\Action\Customer\AddCustomerAction::class);
HttpRequestVerbHandler::patch('/customer', App\Action\Customer\UpdateCustomerAction::class);
HttpRequestVerbHandler::delete('/customer', App\Action\Customer\DeleteCustomerAction::class);

// Location routes (end-points) for dropdown menus - filter by state or city
HttpRequestVerbHandler::get('/location/city', App\Action\Location\GetCityAction::class);
HttpRequestVerbHandler::get('/location/state', App\Action\Location\GetStateAction::class);
