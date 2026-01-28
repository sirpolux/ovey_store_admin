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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignId("order_id")->nullable()->constrained('orders')->nullOnDelete();
            $table->foreignId("user_id")->constrained('users')->nullOnDelete();
            $table->foreignId('saving_id')->constrained()->onDelete('cascade');
            $table->string("transaction_type")->default("CREDIT");
            $table->string("recipient_account_id")->nullable();
            $table->string("sender_account_name");
            $table->string("sender_account_number");
            $table->string("sender_bank");
            $table->string("evidence_of_payment")->nullable();
            $table->string("amount");
            $table->string("transaction_status")->default("PENDING");
            $table->string("transaction_channel")->default("BANK TRANSFER");
            $table->string("payment_confirmed_by")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
