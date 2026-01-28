<?php

namespace App\Http\Controllers;

use App\Constants\Constant;
use App\Http\Requests\StoreTransactionRequest;
use App\Http\Requests\UpdateTransactionRequest;
use App\Http\Resources\CartResource;
use App\Http\Resources\TransactionResource;
use App\Models\Transaction;

class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //

        $query = Transaction::query();
        if (request()->has('status')) {
            if (in_array(request('status'), Constant::TRANSCATION_STATUS)) {
                $transactions = $query->where('status', request('status'))->paginate(20)->onEachSide(1);
                return inertia('Transaction/Index', [
                    'transactions' => TransactionResource::collection($transactions)
                ]);
            }
        }

        $transactions = $query->paginate(20)->onEachSide(1);
        return inertia('Transaction/Index', [
            'transactions' => TransactionResource::collection($transactions)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTransactionRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaction $transaction)
    {
        //
        return inertia('Transaction/Show', [
            'transaction' => new TransactionResource($transaction),
            'cart'=>new CartResource($transaction->order->cart),
            'breadcrumbs' => [
                [
                    'label' => 'Transactions',
                    'url' => route('transactions.index')
                ],
                [
                    'label' => $transaction->id,
                    'url' => route('transactions.show', $transaction->id)
                ]
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaction $transaction)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTransactionRequest $request, Transaction $transaction)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Transaction $transaction)
    {
        //
    }
}
