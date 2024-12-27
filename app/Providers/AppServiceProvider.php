<?php

namespace App\Providers;

use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\File;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $modulesPath = app_path('Modules');
        $modules = File::directories($modulesPath);

        // Dynamically Load Migration files
        foreach ($modules as $module) {
            $migrationsPath = $module . '/Database/Migrations';
            if (File::exists($migrationsPath)) {
                $this->loadMigrationsFrom($migrationsPath);
            }
        }

        // Dynamically Load GraphQL files
//        foreach ($modules as $module) {
//            $graphqlPath = $module . '/GraphQL';
//
//            if (!File::exists($graphqlPath)) {
//                continue;
//            }
//
//            collect(File::files($graphqlPath))->each(function ($file) {
//                $schemaDirectory = resource_path('graphql');
//
//                File::ensureDirectoryExists($schemaDirectory);
//                File::copy($file->getPathname(), $schemaDirectory . '/' . $file->getFilename());
//            });
//        }

        // Customize Password Reset URL
        ResetPassword::createUrlUsing(function (object $notifiable, string $token) {
            return config('app.frontend_url') . "/password-reset/$token?email={$notifiable->getEmailForPasswordReset()}";
        });
    }

    /**
     * Dynamically load and execute seeders for all modules.
     *
     * This function can be called manually when needed.
     *
     * @param array $modules
     */
    public function loadSeeders(array $modules): void
    {
        foreach ($modules as $module) {
            $seedersPath = $module . '/Database/Seeders';

            if (!File::exists($seedersPath)) {
                continue;
            }

            $files = collect(File::files($seedersPath))
                ->sortBy(fn($file) => $file->getFilename());

            $files->each(function ($file) use ($module) {
                $seederClass = $file->getFilenameWithoutExtension();
                $seederNamespace = "App\\Modules\\" . basename($module) . "\\Database\\Seeders\\$seederClass";

                if (class_exists($seederNamespace)) {
                    Artisan::call('db:seed', ['--class' => $seederNamespace]);
                }
            });
        }
    }
}
