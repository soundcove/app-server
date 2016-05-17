# app-server
> SoundCove's application server.

## Installation
```shell
$ npm install --save soundcove/app-server
```

## Usage
```javascript
var server = require('app-server');
var app = server(opts);
```

### `server(opts)`
Create an application server.
 - `opts` (`Object`): An object of options for the server.
 - `opts.html` (`String`): Path to the HTML for the application. (Default: `index.html`)
 - `opts.js` (`String`): Path to the JavaScript for the application. (Default: `index.js`)
 - `opts.css` (`String`): Path to the CSS for the application. (Default: `index.css`)
 - `opts[404]` (`String`): Path to the 404 page for the application. (Default: `404.html`)
 - `opts.favicon` (`String`): Path to the favicon. (Default: `favicon.png`)

Returns [`http.Server`][node-server].

## Example
```javascript
var app = server({ ...opts });
app.listen(8970, '0.0.0.0', function() {
  console.log('Listening');
});
```

## Credits
| ![soundcove][avatar] |
|:---:|
| [SoundCove][github] |

  [avatar]: https://avatars.githubusercontent.com/u/15117174?v=3&s=125
  [github]: https://github.com/soundcove
  [node-server]: https://nodejs.org/api/net.html#net_class_net_server
