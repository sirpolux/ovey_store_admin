<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        $query = Item::query();
        $sortField = request('sort_field', 'id');
        $sortDirection = request('sort_direction', 'desc');

        if (request()->has('keyword')) {
            $query->where('author', 'like', '%' . request('keyword') . '%')
                ->orWhere('title', 'like', '%' . request('keyword') . '%');
        }

        if (request()->has('category')) {
            $query->where('category', request('category'));
        }

        $items = $query->orderBy($sortField, $sortDirection)->paginate(20)->onEachSide(1);

        return inertia('Item/Index', [
            'items' => ItemResource::collection($items),
            'queryParams' => request()->query(),
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
    public function store(StoreItemRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
}
