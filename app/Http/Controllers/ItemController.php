<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreItemRequest;
use App\Http\Requests\UpdateItemRequest;
use App\Http\Resources\ItemResource;
use App\Models\Item;
use App\Models\Log;
use App\Services\LogService;
use Illuminate\Support\Facades\Auth;

class ItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $sortField = request('sort_field', 'id');  
        $sortDirection = request('sort_direction', 'desc');
        $keyword = request('keyword');
    
        $query = Item::query()
            ->where('is_deleted', false);
    
        // Search filters safely grouped
        if (!empty($keyword)) {
            $query->where(function ($q) use ($keyword) {
                $q->where('item_name', 'like', "%{$keyword}%")
                  ->orWhere('item_description', 'like', "%{$keyword}%")
                  ->orWhere('manufacturer', 'like', "%{$keyword}%");
            });
        }
    
        $items = $query->orderBy($sortField, $sortDirection)
            ->paginate(20)
            ->withQueryString(); // keeps filters on pagination
    
        return inertia('Item/Index', [
            'items'      => ItemResource::collection($items),
            'filters'    => [
                'keyword'        => $keyword,
                'sort_field'     => $sortField,
                'sort_direction' => $sortDirection,
            ],
            'pagination' => [
                'total'      => $items->total(),
                'per_page'   => $items->perPage(),
                'current'    => $items->currentPage(),
                'last_page'  => $items->lastPage(),
            ],
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
            "item_name"=>$request->item_name,
            "item_description"=>$request->item_description,
            "manufacturer"=>$request->manufacturer,
            "price"=>$request->price,
            "created_by"=>$user->id,
            "updated_by"=>$user->id,
        ];
        Item::create($data);
        
        // $log = app(LogService::class)->inventory(
        //     'Item Created',
        //     'Created item '.$request->item_name,
        //     ['name'=>$request->item_name, 'price'=>$request->pricer, 'quantity'=>$request->quantity]
        // );
        
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
        $log = app(LogService::class)->inventory(
            'Item Created',
            'Created item '.$request->item_name,
            ['name'=>$request->item_name, 'price'=>$request->pricer, 'quantity'=>$request->quantity, 'description'=>$request->item_description, 'manufacturer'=>$request->manufacturer], 
        );

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
        $item->is_deleted = true;
        $item->save();
        return to_route('item.index')->with([
            "message"=>"Item deleted successfully",
            "status"=>"success"
        ]);

    }
}
