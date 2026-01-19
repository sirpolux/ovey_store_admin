<?php

namespace App\Http\Controllers;

use App\Constants\Constant;
use App\Http\Requests\StoreOrderRequest;
use App\Http\Requests\UpdateOrderRequest;
use App\Http\Resources\OrderResource;
use App\Models\Cart;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    // public function index()
    // {
    //     //update to enable seach by name for the user
    //      $query =  Order::query();
    //      $query->with('user:id,name');
    //      $query->with('cart');


    //     if (request()->has('status')) {
    //         $status = Constant::ORDER_STATUS;
    //         if (in_array(request('status'), $status)) {
    //             $orders = $query->where('status', request('status'))->orderBy('id', 'desc')->paginate(20)->onEachSide(1);
    //             return inertia('Order/Index', [
    //                 'orders' => OrderResource::collection($orders)
    //             ]);
    //         }
    //     }
    //     $orders = $query
    //     ->where('status', 'PENDING_CONFIRMATION')
    //     ->orWhere("status", "PENDING_PAYMENT")
    //     ->orWhere("status", "PENDING_UPDATE")
    //     ->orWhere("status", "PAID")
    //     ->orWhere('status', 'PAYMENT_COMFIRMED')
    //     ->orWhere('status', 'COMPLETED')
    //     ->orderBy('id', 'desc')->paginate(20)->onEachSide(1);
    //     return inertia('Order/Index', [
    //         'orders' => OrderResource::collection($orders),
    //         'breadcrumbs' => [
    //             ['label' => 'Orders', 'url' => route('order.index')]
    //         ]
    //     ]);
    // }

    public function index()
    {
        $query = Order::query()
            ->with([
                'user:id,name',
                'cart.user:id,name,email',
                'cart.cartItems.item.uploads'
            ]);

        // 🔍 Search by customer name
        if (request()->filled('search')) {
            $search = request('search');
            $query->whereHas('cart.user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        // Filter by status
        if (request()->filled('status')) {
            if (request('status') == 'ALL') {
            } else {
                $query->where('status', request('status'));
            }
        }

        $orders = $query
            ->orderBy('id', 'desc')
            ->paginate(2)
            ->onEachSide(1);

        return inertia('Order/Index', [
        'orders' => OrderResource::collection($orders),
        'filters' => request()->only(['status', 'search']),
        'breadcrumbs' => [
            ['label' => 'Orders', 'url' => route('order.index')],
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
    public function store(StoreOrderRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        //
        return inertia('Order/Details', [
            'order' => new OrderResource($order),
            'breadcrumbs' => [
                ['label' => 'Orders', 'url' => route('order.index')],
                ['label' => $order->id, 'url' => route('order.show', $order->id)],
            ]   
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Order $order)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateOrderRequest $request, Order $order)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Order $order)
    {
        //
    }
    public function performOperation(Request $request)
    {
        /* ACTIONS MAP
        "Move Payment to Pending", "action-1"
        "Move Order Back to Cart", "action-2"
        "Cancel Order", "action-3",
        "Confirm Payment", "action-4"
        "Move to Completed", "action-5"
        */

        $data = $request->validate([
            'message' => 'string',
            'action' => 'required|string',
            'order_id' => 'required|integer'
        ]);

        $order = Order::where('id', $request->order_id)->with('cart')->with('transaction')->first();
        if (!$order) {
            return redirect()->route("")->withErrors(["order" => "Invalid operation. Order does not exits"]);
        }

        $action = $request->action;
        switch ($action) {
            case 'action-1':
                break;
            case  'action-2':
                if ($order->status !== "PENDING_PAYMENT") {
                    return redirect()
                        ->route('order.show', ['order' => $request->order_id])
                        ->withErrors(["order" => "Invalid status for the requested operation"]);
                }
                //CHECK if USER HAVE ANY ACTIVE CART.

                $cart = $order->cart;
                $user = $cart->user;
                $active_cart = Cart::where('user_id', $user->id)
                    ->where("status", "OPEN")
                    ->exists();

                if ($active_cart) {
                    //return redirect()->route('order.show', ['order' => $request->order_id])->withErrors(["order" => "Customer has an active cart. Only one active cart per customer is allowed"]);
                    throw ValidationException::withMessages([
                        'order' => 'Customer has an active cart. Only one active cart per customer is allowed',
                    ]);
                }
                $cart->status = "OPEN";
                $cart->save();
                $order->status = "PENDING_UPDATE";
                $order->message = $request->message;
                $order->save();
                return redirect()
                    ->route('order.show', ['order' => $request->order_id])
                    ->with(["success" => "Status was successfuly updated"]);
                break;


            case 'action-3':
                break;

            case 'action-4':
                if ($order->status !== "PENDING_CONFIRMATION") {
                    return redirect()
                        ->route('order.show', ['order' => $request->order_id])
                        ->withErrors(["order" => "Invalid status for the requested operation"]);
                }
                $transaction = $order->transaction;
                $transaction->transaction_status = "PAID";
                $order->status = "PAYMENT_COMFIRMED";
                $transaction->payment_confirmed_by = Auth::id();
                $transaction->save();
                $order->save();
                return redirect()
                    ->route('order.show', ['order' => $request->order_id])
                    ->with(["success" => "Status was successfuly updated"]);
                break;

            case 'action-5':
                break;
        }
    }
}
