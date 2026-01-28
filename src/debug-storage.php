<?php
require_once __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "Storage path: " . storage_path() . "\n";
echo "Compiled views path: " . config('view.compiled') . "\n";
