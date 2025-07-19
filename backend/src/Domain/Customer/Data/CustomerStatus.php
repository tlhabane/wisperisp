<?php

namespace App\Domain\Customer\Data;

enum CustomerStatus: int {
    case active = 1;
    case inactive = 2;
    case cancelled = 3;
}
