<?php

namespace App\Http\Controllers\Auth;

use App\Http\Proxy\TokenProxy;
use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use Illuminate\Foundation\Auth\AuthenticatesUsers;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;

    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    protected $proxy;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct(TokenProxy $proxy)
    {
        $this->middleware('guest')->except('logout');

        $this->proxy = $proxy;
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        return $this->proxy->login(request('email'),request('password'));
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        return $this->proxy->logout();
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->proxy->refresh();
    }
}
