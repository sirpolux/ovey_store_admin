<?php

namespace App\Http\Controllers;

use App\Models\Inventory;
use App\Models\Order;
use App\Models\Transaction;
use App\Models\Stock;
use App\Services\DataService;
use Dflydev\DotAccessData\Data;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(DataService $dataService)
    {
        // Example data — replace with real queries later
        //$allUsers = $dataService->allCustomers();
        $allOrders =  $dataService->orderStatus('all');
        $completedOrders = $dataService->orderStatus('COMPLETED');
        $pendingOrders = $dataService->pendingOrders();
        $allTransactions = $dataService->totalTransaction();
        $pendingTransactions = $dataService->pendingTransaction();
        $completedTransaction = $dataService->completedTransaction();
        $inventoryItems = $dataService->inventoryItemsCount();
      //  $totalApprovedTransactionsEvent = $dataService->totalApprovedTransactionsEvent();
      //  $totalApprovedTransactionsBookStore =  $dataService->totalApprovedTransactionsBookStore();
        $totalApprovedTransactions = $dataService->totalApprovedTransactions();
 
        

        return inertia("Dashboard/Home", [
           // 'allUsers'=>$allUsers,
            'allOrders'=>$allOrders,
            'completedOrders'=>$completedOrders,
            'pendingOrders'=>$pendingOrders,
            'allTransactions'=>$allTransactions,
            'pendingTransaction'=>$pendingTransactions,
            'completedTransaction'=>$completedTransaction,
            'inventoryItems'=>$inventoryItems,
            'totalApprovedTransactions'=>$totalApprovedTransactions,
           // 'totalApprovedTransactionsEvent'=>  $totalApprovedTransactionsEvent,
            //'totalApprovedTransactionsBookStore' => $totalApprovedTransactionsBookStore,
        ]);
    }
}
