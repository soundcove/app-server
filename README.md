App Server
======
This server sends the application to requesting clients.  It's designed to cache, secure, and cluster the application so the client can receive it as fast as possible.  It's also designed to be easily deployable with command-line arguments for easy management.

The app server uses Swig templates to separate components of the website into files - which are then rendered into one file when requested.  The app then uses HTML5 URLs (or falls back on hash URLs) to "switch" between pages.  This way there is only one request to the app server.

## Installation

You can `npm install` this off GitHub:

```
$ npm instal --global soundcove/app-server
```

## Usage

```
app [commands]

Options:
  --help         Show help                                                      
  --app, -a      File for application.                   [default: "index.html"]
  --bower, -b    Directory for bower_components.   [default: "bower_components"]
  --scripts, -j  Directory for scripts.                     [default: "scripts"]
  --styles, -s   Directory for styles.                       [default: "styles"]
  --static, -x   Directory for static serve.                 [default: "static"]
  --http, -h     Enable or disable HTTP                          [default: true]
  --https, -H    Enable or disable HTTPS.                       [default: false]
  --host, -d     HTTP and HTTPS servers' host address.      [default: "0.0.0.0"]
  --port, -p     HTTP and HTTPS servers's host addresses.          [default: 80]
  --sport, -P    HTTPS server's port.                             [default: 443]
  --config, -c   File for app config.                                           
  --serve, -S    File for express.static config.                                                             
```

## Contributing
Please see the [CONTRIBUTING.md](CONTRIBUTING.md) file for more information on how to contribute to soundcove.
