<?php

namespace App\Helpers;

class JsonHelper
{
    public static function decodeJsonArray(?array $values): array
    {
        if (! $values) {
            return [];
        }

        return array_map(function ($value) {
            $decoded = json_decode($value, true);

            if (json_last_error() === JSON_ERROR_NONE) {
                return self::decodeHtmlEntitiesRecursive($decoded);
            }

            return is_string($value) ? html_entity_decode($value, ENT_QUOTES | ENT_HTML5) : $value;
        }, $values);
    }

    public static function decodeHtmlEntitiesRecursive($data)
    {
        if (is_string($data)) {
            return html_entity_decode($data, ENT_QUOTES | ENT_HTML5);
        }

        if (is_array($data)) {
            foreach ($data as $key => $item) {
                $data[$key] = self::decodeHtmlEntitiesRecursive($item);
            }
        }

        return $data;
    }
}