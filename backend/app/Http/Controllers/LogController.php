<?php

namespace App\Http\Controllers;

use App\Models\Log;
use Illuminate\Http\Request;

class LogController extends Controller
{
    public function index()
    {
        $datas = Log::paginate();

        return response()->json([
            'message' => 'success',
            'status_code' => 200,
            'entity' => $datas
        ], 200);
    }
}
