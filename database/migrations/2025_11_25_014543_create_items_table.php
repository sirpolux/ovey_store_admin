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
            $table->string('item_id')->nullable()->unique();
            $table->string('item_name');
            $table->text('item_decription')->nullable();
            $table->string('manufacturer')->nullable();
            $table->integer('quantity')->default(0);
            $table->double('price')->default(0);
            $table->string('status')->default('IN_STOCK');
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
