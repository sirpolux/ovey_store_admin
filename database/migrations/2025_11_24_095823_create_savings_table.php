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
        Schema::create('savings', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->foreignId('order_id')->nullable()->constrained()->nullOnDelete();
            $table->string('saving_reference')->unique();
            $table->integer('amount_saved')->default(0);
            $table->integer('total')->default(0);
            $table->integer('balance')->default(0);
            $table->enum('status', ['not_started', 'active', 'completed'])->default('not_started');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('savings');
    }
};
