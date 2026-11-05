<?php

namespace Tests\Unit;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

class SortFieldTest extends TestCase
{
    public static function cases(): array
    {
        return [
            'title' => ['ss_longlabel', 'ss_longlabel'],
            'author' => ['ss_sauthor', 'ss_sauthor'],
            'missing' => [null, 'ss_longlabel'],
            'typo' => ['ss_auth', 'ss_longlabel'],
            'injection' => ['ss_longlabel&rows=100000', 'ss_longlabel'],
            'array' => [['ss_sauthor'], 'ss_longlabel'],
        ];
    }

    #[DataProvider('cases')]
    public function test_sort_field_only_allows_dropdown_values(mixed $input, string $expected): void
    {
        $controller = new class extends Controller
        {
            public function resolve(Request $request): string
            {
                return $this->sortField($request);
            }
        };

        $request = Request::create('/', 'GET', $input === null ? [] : ['sortfield' => $input]);

        $this->assertSame($expected, $controller->resolve($request));
    }
}
