<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
            ],
            'success' => function () {
                return session()->get('success');
            },
            "id_dispensasi"=> function (){
                return session()->get("id_dispensasi");
            },
            "site_url"=> function (){
                return session()->get("site_url");
            },
            "id_masuk"=> function (){
                return session()->get("id_masuk");
            },
            "id_tamu"=> function (){
                return session()->get("id_tamu");
            },
            
        ];
    }
}
