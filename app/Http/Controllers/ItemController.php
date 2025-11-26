<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;

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
            $query->where('item_name', 'like', '%' . request('keyword') . '%')
                ->orWhere('item_description', 'like', '%' . request('keyword') . '%')
                ->orWhere('manufacturer', 'like', '%' . request('keyword') . '%');
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
        $response = [
            "message"=>session('message'),
            "status"=>session('status'),
        ];

        return inertia('Item/Create', [
            'response'=>$response
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreItemRequest $request)
    {
        //
        $user = Auth::user();
        $data  = [
            "item_id"=>$request->item_id,
            "item_name"=>$request->item_name,
            "item_description"=>$request->item_description,
            "manufacturer"=>$request->manufacturer,
            "quantity"=>$request->quantity,
            "price"=>$request->price,
            "status"=>$request->status,
            "created_by"=>$user->id,
            "updated_by"=>$user->id,
        ];
        Item::create($data);
        return to_route('item.create')->with([
            "message"=>"Item created successfully",
            "status"=>"success"
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Item $item)
    {
        //
        return inertia('Item/Show', [
            'item'=>new ItemResource($item->load(['createdBy', 'updatedBy']))
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Item $item)
    {
        //
        return inertia('Item/Edit', [
            'item'=>new ItemResource($item)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateItemRequest $request, Item $item)
    {
        //
        $user = Auth::user();
        $data  = [
            "item_id"=>$request->item_id,
            "item_name"=>$request->item_name,
            "item_description"=>$request->item_description,
            "manufacturer"=>$request->manufacturer,
            "quantity"=>$request->quantity,
            "price"=>$request->price,
            "status"=>$request->status,
            "updated_by"=>$user->id,
        ];
        $item->update($data);
        return to_route('item.edit', $item->id)->with([
            "message"=>"Item updated successfully",
            "status"=>"success"
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Item $item)
    {
        //
    }
}
