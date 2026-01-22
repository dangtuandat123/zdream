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
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['topup', 'usage', 'refund', 'bonus']);
            $table->decimal('amount', 12, 2)->default(0); // Số tiền VND
            $table->decimal('credits', 10, 2); // Số xu
            $table->text('description')->nullable();
            $table->string('reference_id')->nullable(); // Mã giao dịch ngân hàng
            $table->timestamps();
            
            $table->index(['user_id', 'type']);
            $table->index('reference_id');
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
