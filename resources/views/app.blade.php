<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
        <script>
          WebFont.load({
            google: {
                families: ['Open Sans:300,400,600']
            },
            // Optional: Callbacks to handle loading states
            loading: function() {
                document.documentElement.classList.add('font-loading');
            },
            active: function() {
                document.documentElement.classList.add('wf-active');
            },
            inactive: function() {
                // Optional: handle fallback if font loading fails
                console.warn('Inter font failed to load.');
            }
          });
        </script>

        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CCQL276SXW"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-CCQL276SXW');
        </script>

        @routes
        @viteReactRefresh
        @vite(['resources/sass/style.scss', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead

    </head>
    <body>
      @inertia
    </body>
</html>
