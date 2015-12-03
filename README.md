App Server
======
This server sends the application to requesting clients.  It's designed to cache, secure, and cluster the application so the client can receive it as fast as possible.  It's also designed to be easily deployable with command-line arguments for easy management.

The app server uses Swig templates to separate components of the website into files - which are then rendered into one file when requested.  The app then uses HTML5 URLs (or falls back on hash URLs) to "switch" between pages.  This way there is only one request to the app server. 

## Contributing
Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on how to contribute to soundcove.
