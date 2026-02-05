<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('cart_id');
            $table->string('transaction_id')->nullable();
            $table->string('user_id');
            $table->string('status')->default("PENDING_PAYMENT");
            $table->double('total_cost');
            $table->string('delivery_channel')->nullable();
            $table->string('delivery_confirmed_by')->nullable();
            $table->string('delivered_by')->nullable();
            $table->string('contact_number')->nullable();
            $table->string('delivery_address')->nullable();
            $table->string('delivery_state')->nullable();   
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('orders');
    }
};
