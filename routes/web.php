<?php

use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Log;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::resource('item', ItemController::class);
    Route::resource('user', UserController::class);
    Route::resource('stock', StockController::class);
    Route::resource('cart',CartController::class);
    Route::resource('order', OrderController::class);
    Route::resource('transactions', TransactionController::class);
    Route::resource('log', LogController::class);
    Route::resource('settings', SettingController::class);


    Route::get("item/feature/create/{id}",[ItemController::class,'createFeature'])->name('item.feature.create');
    Route::post("items/feature/store",[ItemController::class,'storeFeature'])->name('item.feature.store');
});


Route::get('/test', [DashboardController::class, 'index'])->name('test');

require __DIR__.'/auth.php';
