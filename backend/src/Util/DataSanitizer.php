<?php

namespace App\Util;

class DataSanitizer extends StringUtil
{
    /**
     * String sanitizer
     *
     * @param string|null $inputString
     * @return string
     */
    public static function sanitizeString(?string $inputString): string
    {
        if (is_null($inputString)) {
            return '';
        }

        $search = array(
            '@<script[^>]*?>.*?</script>@si',   /* strip out javascript */
            '@<[\/\!]*?[^<>]*?>@si',            /* strip out HTML tags */
            '@<style[^>]*?>.*?</style>@siU',    /* strip style tags properly */
            '@<![\s\S]*?--[ \t\n\r]*>@'         /* strip multi-line comments */
        );

        return preg_replace($search, '', $inputString);
    }

    /**
     * Email address sanitizer
     *
     * @param string|null $emailAddress
     * @return string
     */
    public static function sanitizeEmail(?string $emailAddress): string
    {
        return is_null($emailAddress) ? '' : filter_var($emailAddress, FILTER_SANITIZE_EMAIL);
    }
}
