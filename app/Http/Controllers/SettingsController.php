<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class SettingsController extends Controller
{
    //
         public function index()
    {
        return inertia("Settings/Index",
        [
            //
            "breadcrumbs"=>[
                [
                   "label"=>"Settings", "url"=>route("settings.index")
                ]
            ],
        ]
        );
    }

    public function typeIndex(Request $request)
    {

       // dd($request->all());
        $request->validate([
            'type' => ['required', 'string', Rule::in('cart', 'order', 'retreat')]
        ]);

        switch ($request->type) {
            case "cart":
                return inertia("CartSettings/Index");
                break;
            case "order":
                return inertia("OrderSettings/Index");
                break;
            case "retreat":
                return inertia("RetreatSettings/Index");
                break;
        }
    }


    public function cartSettingList(){
        $cartListSettings = Setting::where('type', 'cart')->get();
        return inertia("CartSettings/CartSettingList",
        [
            "cartSettingList"=>$cartListSettings
        ]
        );
    }
    public function cartSettingAdd(){
        return inertia("CartSettings/NewSetting");
    }

    public function cartSettingSave(Request $request){

       //dd($request->all());
        $data = $request->validate([
            "name"=>['required', 'string', 'max:225', 'min:3', 
            Rule::unique(Setting::class, "name")], 
            'max'=>['integer'],
            'min'=>['integer'],
            'min_cost'=>['nullable'],
            'max_cost'=>['nullable'],
            
        ]); 
        $data['type'] = "cart";
        $data['added_by'] = Auth::user()->id;

        Setting::create(
            $data
        );

        return redirect()->route("settings.cart.list");

    }

    public function setUpPrimaryCartSettings(Request $request){
        $settings = Setting::where('type', 'cart')
        ->where('active', true)->first();
        if($settings){
            $settings->active = false;
            $settings->save();
        }
        
        $newProfile = Setting::find($request->cart_settings_id);
        $newProfile->active = true;
        $newProfile->save();

        return redirect()->route("settings.cart.list");
    }


    public function retreatSettingList(){
        $cartListSettings = Setting::where('type', 'retreat')->get();
        return inertia("RetreatSettings/RetreatSettingList",
        [
            "retreatSettingList"=>$cartListSettings
        ]
        );
    }
    public function retreatSettingAdd(){
        return inertia("RetreatSettings/NewSetting");
    }

    public function retreatSettingSave(Request $request){

      // dd($request->all());
        $data = $request->validate([
            "name"=>['required', 'string', 'max:225', 'min:3', 
            Rule::unique(Setting::class, "name")], 
            'max'=>['integer'],
            'min'=>['integer'],
            'min_persons'=>['nullable'],
            'max_persons'=>['nullable'],
            
        ]); 
        $data['type'] = "retreat";
        $data['added_by'] = Auth::user()->id;

        Setting::create(
            $data
        );

        return redirect()->route("settings.retreat.list");

    }

    public function setUpPrimaryRetreatSettings(Request $request){
        $settings = Setting::where('type', 'retreat')
        ->where('active', true)->first();
        if($settings){
            $settings->active = false;
            $settings->save();
        }
        
        $newProfile = Setting::find($request->retreat_settings_id);
        $newProfile->active = true;
        $newProfile->save();

        return redirect()->route("settings.retreat.list");
    }
}
