<?php

namespace App\Services;

use App\Models\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class LogService
{
    /**
     * Write action log to database
     */
    public function write(
        string $action,
        string $channel = 'system',
        ?string $description = null,
        array $meta = []
    ): Log {
        return Log::create([
            'action'        => $action,           // e.g "inventory_created"
            'channel'       => $channel,          // admin, orders, inventory, auth...
            'description'   => $description,
            'meta'          => $meta ?: null,     // extra json data
            'user_id'       => Auth::id() ?? null,
            'ip_address'    => Request::ip(),
            'user_agent'    => Request::header('User-Agent'),
        ]);
    }

    // 🔥 Quick helper shortcuts
    public function inventory($action, $desc = null, $meta = [])
    {
        return $this->write("inventory.$action", 'inventory', $desc, $meta);
    }

    public function orders($action, $desc = null, $meta = [])
    {
        return $this->write("orders.$action", 'orders', $desc, $meta);
    }

    public function auth($action, $desc = null, $meta = [])
    {
        return $this->write("auth.$action", 'auth', $desc, $meta);
    }
}
