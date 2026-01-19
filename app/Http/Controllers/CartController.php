<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCartRequest;
use App\Http\Requests\UpdateCartRequest;
use App\Http\Resources\CartResource;
use App\Models\Cart;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Cart::query();
          $query->with('cartItems:cart_id,item_id,quantity,total_cost,current_price,price_bought,id,created_at');
       // $query->with('[cartItems:cart_id,item_id,quantity,total_cost,current_price,price_bought,id,created_at]');
        $cart_item = $query->where('status', 'OPEN')->orderBy('id', 'desc')->paginate(20)->onEachSide(1);
        return inertia('Cart/Index', [
            'cart' => CartResource::collection($cart_item),
            'breadcrumbs' => [
                ['label' => 'Cart', 'url' => route('cart.index')]
            ]
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
    public function store(StoreCartRequest $request)
    {
        //
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Cart $cart)
    {
        //
        $cart->load(['cartItems:cart_id,item_id,quantity,total_cost,current_price,price_bought,id,created_at']);
        return inertia('Cart/Show', [
            'cart' => new CartResource($cart),
            'breadcrumbs' => [
                ['label' => 'Cart', 'url' => route('cart.index')],
                ['label' =>"Cart Id:". $cart->id, 'url' => route('cart.show', $cart->id)]
            ]
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Cart $cart)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCartRequest $request, Cart $cart)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        //
    }
}
