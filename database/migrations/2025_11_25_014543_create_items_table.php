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
        Schema::create('items', function (Blueprint $table) {
            $table->id();
            $table->string('item_name');
            $table->text('item_description')->nullable();
            $table->string('manufacturer')->nullable();
            $table->integer('quantity')->default(0);
            $table->double('price')->default(0);
            $table->enum('status',['IN_STOCK', 'OUT_OF_STOCK', 'DISCONTINUED'])->default('OUT_OF_STOCK');
            $table->boolean('is_deleted')->default(false);
            $table->foreignId('updated_by')->constrained('users')->nullOnDelete();
            $table->foreignId('created_by')->constrained('users')->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
