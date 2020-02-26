<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TestController extends Controller
{
    public function test()
    {
        return response()->json([
            'message' => 'success',
            'status_code' => 200,
            'entity' => 'test api success'
        ], 200);
    }
}
