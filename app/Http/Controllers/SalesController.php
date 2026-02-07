<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Http\Requests\UpdateSaleRequest;
use App\Models\Item;
use App\Models\Sale;
use App\Models\Saving;

class SalesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query= Saving::query();
        //use this to filter the savings by user and date range if needed
        // when a search word is provided item name for items
        // the user willb specify the items per page and the sort field and direction. provide default values for these parameters
        // for sales retrieved I want a total count of the sales and the total amount of sales for the current filters applied

        return inertia('Sales/Index', [
            'sales' => $query->paginate(20)->withQueryString(),
            'breadcrumbs' => [
                ['label' => 'Sales', 'url' => route('sales.index')],
            ],  
            'filters' => [
                'keyword' => request('keyword'),
                'start_date' => request('start_date'),
                'end_date' => request('end_date'),
                'per_page' => request('per_page', 20),
                'sort_field' => request('sort_field', 'created_at'),
                'sort_direction' => request('sort_direction', 'desc'),
            ],
            'sales_summary' => [
                'total_sales' => $query->count(),
                'total_amount' => $query->sum('amount'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        $items = Item::select('id','item_name', 'price')->all();

        return inertia('Sales/Create', [
            'items' => $items,
            'breadcrumbs' => [
                ['label' => 'Sales', 'url' => route('sales.index')],
                ['label' => 'Add Sale', 'url' => route('sales.create')],
            ],
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSaleRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSaleRequest $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
