<?php

namespace App\Http\Controllers;

use App\Models\Saving;
use App\Http\Requests\StoreSavingRequest;
use App\Http\Requests\UpdateSavingRequest;
use App\Http\Resources\SavingMinimalResource;
use App\Http\Resources\SavingResource;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SavingController extends Controller
{
    /**
     * Display a listing of the resource.
     */

public function index(Request $request)
{
    $query = Saving::query()->with('user');

    $sortField = $request->get('sort_field', 'id');
    $sortDirection = $request->get('sort_direction', 'desc');
    $keyword = $request->get('keyword');
    $startDate = $request->get('start_date');
    $endDate = $request->get('end_date');

    // 🔍 Search
    if ($keyword) {
        $query->where('order_id', 'like', "%{$keyword}%")
            ->orWhereHas('user', function ($q) use ($keyword) {
                $q->where('name', 'like', "%{$keyword}%")
                  ->orWhere('email', 'like', "%{$keyword}%");
            });
    }

    // 📅 Date filter
    if ($startDate && $endDate) {
        $query->whereBetween('created_at', [
            $startDate . ' 00:00:00',
            $endDate . ' 23:59:59',
        ]);
    }

    // ↕ Sorting
    $query->orderBy($sortField, $sortDirection);

    $savings = $query
        ->paginate(20)
        ->withQueryString(); // ⭐ keeps filters on pagination

    return inertia('Saving/Index', [
        'savings' =>SavingMinimalResource::collection($savings),
        'filters' => $request->only([
            'keyword',
            'sort_field',
            'sort_direction',
            'start_date',
            'end_date',
        ]),
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
    public function store(StoreSavingRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Saving $saving)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Saving $saving)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSavingRequest $request, Saving $saving)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Saving $saving)
    {
        //
    }

    public function export(Request $request): StreamedResponse
{
    $query = Saving::query()->with('user');

    if ($request->keyword) {
        $query->where('order_id', 'like', "%{$request->keyword}%")
            ->orWhereHas('user', function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->keyword}%")
                  ->orWhere('email', 'like', "%{$request->keyword}%");
            });
    }

    if ($request->start_date && $request->end_date) {
        $query->whereBetween('created_at', [
            $request->start_date . ' 00:00:00',
            $request->end_date . ' 23:59:59',
        ]);
    }

    $fileName = 'savings_' . now()->format('Ymd_His') . '.csv';

    return response()->streamDownload(function () use ($query) {
        $handle = fopen('php://output', 'w');

        fputcsv($handle, [
            'ID', 'User Name', 'Email', 'Order ID', 'Amount', 'Created At'
        ]);

        $query->chunk(500, function ($rows) use ($handle) {
            foreach ($rows as $saving) {
                fputcsv($handle, [
                    $saving->id,
                    $saving->user?->name,
                    $saving->user?->email,
                    $saving->order_id,
                    $saving->amount,
                    $saving->created_at,
                ]);
            }
        });

        fclose($handle);
    }, $fileName);
}


    
}
