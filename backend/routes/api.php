<?php

use App\Http\Controllers\Api\GenerationController;
use App\Http\Controllers\Api\StyleController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes - Không cần auth
Route::get('/styles', [StyleController::class, 'index']);
Route::get('/styles/{style}', [StyleController::class, 'show']);

// Protected routes - Cần auth
Route::middleware('auth:sanctum')->group(function () {
    // User
    Route::get('/user', [UserController::class, 'me']);
    Route::get('/user/credits', [UserController::class, 'credits']);
    Route::get('/user/transactions', [UserController::class, 'transactions']);

    // Generation
    Route::post('/generate', [GenerationController::class, 'generate']);
    Route::get('/generations', [GenerationController::class, 'history']);
    Route::get('/generations/{generation}', [GenerationController::class, 'show']);
});
