<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    $user = $request->user();

    return response()->json([
        'message' => 'success',
        'status_code' => 200,
        'entity' => [
            'name' => $user['name'],
            'email' => $user['email']
        ]
    ], 200);
});

// auth
Route::post('/register','Auth\RegisterController@register');
Route::post('/login','Auth\LoginController@login');
Route::post('/logout','Auth\LoginController@logout');
Route::post('/token/refresh','Auth\LoginController@refresh');

Route::middleware('auth:api')->group(function () {
    Route::get('/test','TestController@test');
    Route::resource('/logs','LogController');
});