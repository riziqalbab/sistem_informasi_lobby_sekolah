<?php

namespace App\Services;

use GuzzleHttp\Client;

class FonnteService
{
    protected $client;
    protected $token;

    public function __construct()
    {
        $this->client = new Client();
        $this->token = env('FONNTE_TOKEN');
    }

    public function sendMessage($phone, $message)
    {
        try {
            $response = $this->client->post('https://api.fonnte.com/send', [
                'headers' => [
                    'Authorization' => $this->token,
                ],
                'form_params' => [
                    'target' => $phone,
                    'message' => $message,
                    'countryCode' => '62',
                ],
            ]);

            $statusCode = $response->getStatusCode();
            $body = $response->getBody()->getContents();

            if ($statusCode == 200) {
                return json_decode($body, true);
            } else {
                return [
                    'error' => true,
                    'message' => 'Failed to send message',
                ];
            }
        } catch (\Exception $e) {
            return [
                'error' => true,
                'message' => $e->getMessage(),
            ];
        }
    }
}
