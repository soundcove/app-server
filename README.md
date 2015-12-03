App Server
======
This server sends the application to requesting clients.  It's designed to cache, secure, and cluster the application so the client can receive it as fast as possible.  It's also designed to be easily deployable with command-line arguments for easy management.

The app server uses Swig templates to separate components of the website into files - which are then rendered into one file when requested.  The app then uses HTML5 URLs (or falls back on hash URLs) to "switch" between pages.  This way there is only one request to the app server.

## Usage

```
$ app [options]
```

### options
These options follow the format `--name=value`, and for values with spaces, use quotes `--name="spaced value"`.

 - `--views`: An alternative path to your Swig views.
 - `--static`: An alternative path to your static files.
 - `--age`: Set a cache expiration time. (Default: `'6h'`)
 - `--http`: Enable or disable the HTTP server. (Default `true`)
 - `--https`: Enable or disable the HTTPS server. (Default: `false`)
 - `--host`: An address to listen on. (Default: `'0.0.0.0'`)
 - `--port`: A port for the HTTP server to listen on. (Default: `80`)
 - `--sport`: A port for the HTTPS server to listen on. (Default: `443`)

## Contributing
Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on how to contribute to soundcove.
