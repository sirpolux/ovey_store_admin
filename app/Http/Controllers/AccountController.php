<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccountRequest;
use App\Http\Requests\UpdateAccountRequest;
use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Bank/NewBank", [
            "breadcrumbs"=>[
                [
                   "label"=>"Bank Accounts", "url"=>route("settings.bank.list")
                ],
                [
                   "label"=>"Add New Bank Account", "url"=>route("bank.create")
                ],
            ],  
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAccountRequest $request)
    {
        $data = $request->validated();
        $data['captured_by']=Auth::id();
        Account::create($data);
        return redirect()->route('bank.create');
    }

    public function bankList(){
        $bankList = Account::all();
        return inertia("Bank/BankList",
        [
            "bankList"=>$bankList,
            "breadcrumbs"=>[
                [
                   "label"=>"Bank Accounts", "url"=>route("settings.bank.list")
                ]
            ],
        ]
        );
    }

    public function setPrimaryBank(Request $request){
       // dd($request->all());
        $newPrimaryBank = Account::find($request->bank_id);
        $oldPrimaryBank = Account::where('primary_account', 1)->first();
        if($oldPrimaryBank){
            $oldPrimaryBank->primary_account=0;
            $oldPrimaryBank->save();
        }
        $newPrimaryBank->primary_account=1;
        $newPrimaryBank->save();
        return redirect()->route("settings.bank.list");
    }


    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAccountRequest $request, Account $account)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        //
    }
}
