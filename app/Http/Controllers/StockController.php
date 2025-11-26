<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockRequest;
use App\Http\Requests\UpdateStockRequest;
use App\Models\Stock;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField = request('sort_field', 'id');  
        $sortDirection = request('sort_direction', 'desc');
        $keyword = request('keyword');
    
        $query = Stock::with('item') // eager load item for UI
            ->when($keyword, function ($q) use ($keyword) {
                $q->whereHas('item', function ($itemQuery) use ($keyword) {
                    $itemQuery->where('item_name', 'like', "%{$keyword}%")
                        ->orWhere('item_decription', 'like', "%{$keyword}%")
                        ->orWhere('manufacturer', 'like', "%{$keyword}%");
                });
            });
    
        $stocks = $query->orderBy($sortField, $sortDirection)
            ->paginate(20)
            ->withQueryString(); // keep filters in URL
    
        return inertia('Stock/Index', [
            'stocks'      => $stocks,
            'filters'    => [
                'keyword'        => $keyword,
                'sort_field'     => $sortField,
                'sort_direction' => $sortDirection,
            ],
            'pagination' => [
                'total'      => $stocks->total(),
                'per_page'   => $stocks->perPage(),
                'current'    => $stocks->currentPage(),
                'last_page'  => $stocks->lastPage(),
            ],
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
    public function store(StoreStockRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
