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
            $table->foreignId('customer_id')->nullable()->constrained()->onDelete('cascade');
            $table->string('customer_guest')->nullable()->comment('Customer guest name for non-registered users customers');
            $table->string('transaction_number')->unique()->nullable();
            $table->decimal('total_amount', 10, 2)->nullable();
            $table->decimal('cash_tendered', 10, 2)->nullable();
            $table->decimal('change', 10, 2)->nullable();
            $table->string('date')->nullable();
            $table->tinyInteger('payment')->default(0)->nullable()->comment('0: cash, 1: gcash, 2: bank');
            $table->tinyInteger('status')->default(1)->nullable()->comment('0: completed, 1: on-hold, 2: cancelled');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
