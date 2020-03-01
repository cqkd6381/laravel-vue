<?php
namespace App\Http\Proxy;

use GuzzleHttp\Client;

class TokenProxy
{
    /**
     * @var
     */
    protected $http;

    /**
     * TokenProxy constructor.
     * @param $http
     */
    public function __construct(Client $http)
    {
        $this->http = $http;
    }

    /**
     * @param $email
     * @param $password
     * @return \Illuminate\Http\JsonResponse
     */
    public function login($email, $password)
    {
        if (auth()->attempt(['email' => $email, 'password' => $password])){
            return $this->proxy('password', [
                'username' => $email,
                'password' => $password,
                'scope' => '',
            ]);
        }
        return response()->json([
            'message' => 'login false',
            'status_code' => 421,
            'entity' => 'Credentials not match'
        ], 200);
    }

    /**
     * @param string $grantType
     * @param array $data
     * @return \Illuminate\Http\JsonResponse
     */
    public function proxy(string $grantType, array $data = [])
    {
        $data = array_merge($data, [
            'client_id' => env('PASSPORT_CLIENT_ID'),
            'client_secret' => env('PASSPORT_CLIENT_SECRET'),
            'grant_type' => $grantType
        ]);

        $website = $_SERVER['HTTP_HOST'];

        $response = $this->http->post('http://' . $website . '/oauth/token', [
            'form_params' => $data
        ]);

        $token = json_decode((string)$response->getBody(), true);

        return response()->json([
            'entity' => [
                'token' => $token['token_type'].' '.$token['access_token'],
                'refresh_token' => $token['refresh_token'],
                'expires_in' => $token['expires_in'],
            ],
            'message' => 'success',
            'status_code' => 200
        ]);
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
         $refreshToken = request()->header('refreshtoken');

        // 验证refresh_token

        /**
         *
         * 此处是验证逻辑...... 如有错误，返回相应错误码与错误信息
         * 
         */

        return $this->proxy('refresh_token',
            ['refresh_token' => $refreshToken]
        );
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        $user = auth()->guard('api')->user();

        $accessToken = $user->token();

        app('db')->table('oauth_refresh_tokens')
            ->where('access_token_id', $accessToken->id)
            ->update([
                'revoked' => true
            ]);

        $accessToken->revoke();

        return response()->json([
            'message' => 'success',
            'status_code' => 200,
            'entity' => 'logout success'
        ], 200);
    }


}
