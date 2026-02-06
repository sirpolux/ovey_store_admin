<?php

use App\Http\Controllers\AccountController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ItemImageController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SalesController;
use App\Http\Controllers\SavingController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SettingsController;
use App\Http\Controllers\StockController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\Log;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

Route::redirect('/', '/dashboard', 301);
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::post("item/feature/store", [ItemController::class, 'storeFeature'])->name('item.feature.store');

    Route::prefix('item/image')->group(function () {
        Route::post('{item}', [ItemImageController::class, 'store'])
            ->name('item.image.store');

        Route::delete('{image}', [ItemImageController::class, 'destroy'])
            ->name('item.image.delete');

        Route::patch('{image}/primary', [ItemImageController::class, 'setPrimary'])
            ->name('item.image.primary');

        Route::patch('{item}/reorder', [ItemImageController::class, 'reorder'])
            ->name('item.image.reorder');
    });
    Route::resource('item', ItemController::class);
    Route::resource('user', UserController::class);
    Route::get('/stock/export', [StockController::class, 'export'])->name('stock.export');
    Route::resource('stock', StockController::class);
    Route::resource('cart', CartController::class);
    Route::resource('order', OrderController::class);
    Route::resource('savings', SavingController::class);
    Route::resource('sales', SalesController::class);
    
    Route::resource('transactions', TransactionController::class);
    Route::post('/transactions/status/update/{transaction}', [TransactionController::class, 'updateTransactionStatus'])->name('transactions.status.update');
    Route::resource('log', LogController::class);
    Route::resource('settings', SettingsController::class);
    Route::get('item/image/add/{id}', [ItemController::class, 'addImage'])->name('item.image.add');
    //   Route::post('item/image/store/{id}', [ItemController::class, 'storeImage'])->name('item.image.store');

    Route::get("item/feature/create/{id}", [ItemController::class, 'createFeature'])->name('item.feature.create');
    Route::prefix('settings')->group(function () {
        Route::get("/type", [SettingsController::class, 'typeIndex'])->name('settings.type');
        Route::get("/list", [SettingsController::class, 'settingList'])->name('setting.list');
        Route::post("/save", [SettingsController::class, 'saveSettings'])->name("settings.save");
        Route::post("/setup/primary", [SettingsController::class, 'setUpPrimary'])->name('setup.primary');
        Route::get("/bank/list", [AccountController::class, 'bankList'])->name('settings.bank.list');

        Route::get("/cart/list", [SettingsController::class, 'cartSettingList'])->name('settings.cart.list');
        Route::get("/cart/add", [SettingsController::class, 'cartSettingAdd'])->name('settings.cart.add');
        Route::post("/cart/save", [SettingsController::class, "cartSettingSave"])->name("settings.cart.save");
        Route::post("/cart/setup/primary", [SettingsController::class, "setUpPrimaryCartSettings"])->name("setup.primary.cart");



        Route::get("/retreat/list", [SettingsController::class, 'retreatSettingList'])->name('settings.retreat.list');
        Route::get("/retreat/add", [SettingsController::class, 'retreatSettingAdd'])->name('settings.retreat.add');
        Route::post("/retreat/save", [SettingsController::class, "retreatSettingSave"])->name("settings.retreat.save");
        Route::post("/retreat/setup/primary", [SettingsController::class, "setUpPrimaryRetreatSettings"])->name("setup.primary.cart");


        Route::post("/bank/setup/primary", [AccountController::class, 'setPrimaryBank'])->name("bank.setup.primary");
        Route::resource('bank', AccountController::class);
    });

    Route::post("/saving/transaction/update/{transaction}", [SavingController::class, 'updateTransactionStatus'])->name('savings.transaction.update');
 //   Route::get('/savings', [SavingController::class, 'index'])->name('savings.index');
Route::get('/savings/export', [SavingController::class, 'export'])->name('savings.export');


    // routes/web.php

});


Route::get('/test', [DashboardController::class, 'index'])->name('test');

require __DIR__ . '/auth.php';
