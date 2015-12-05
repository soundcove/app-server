module.exports = {

  app: {
    desc: 'File path for application.',
    default: 'index.html',
    alias: 'a',
    type: 'file',
  },

  bower: {
    desc: 'Directory path for bower_components.',
    default: null,
    alias: 'b',
    type: 'directory',
  },

  scripts: {
    desc: 'Directory path for scripts.',
    default: 'scripts',
    alias: 's',
    type: 'directory',
  },

  styles: {
    desc: 'Directory path for styles.',
    default: 'styles',
    alias: 'c',
    type: 'directory',
  },

  static: {
    desc: 'Directory path for static serve.',
    default: 'static',
    alias: 'x',
    type: 'directory',
  },

  age: {
    desc: 'Time for max-age Cache-Control to expire.',
    default: '6h',
    alias: 'A',
    type: 'ms format',
  },

  http: {
    desc: 'Enable or disable HTTP',
    default: true,
    alias: 'h',
    boolean: true,
    type: 'boolean',
  },

  https: {
    desc: 'Enable or disable HTTPS.',
    default: false,
    alias: 'H',
    boolean: true,
    type: 'boolean',
  },

  host: {
    desc: 'HTTP and HTTPS servers\' host address.',
    default: '0.0.0.0',
    alias: 'd',
    type: 'string',
  },

  port: {
    desc: 'HTTP and HTTPS servers\'s host addresses.',
    default: 80,
    alias: 'p',
    type: 'number',
  },

  sport: {
    desc: 'HTTPS server\'s port.',
    default: 443,
    alias: 'P',
    type: 'number',
  },

  config: {
    desc: 'File path to app config.',
    default: {},
    alias: 'C',
    type: 'file',
    config: true,
  },

  serve: {
    desc: 'File path to express.static config.',
    default: {},
    alias: 'S',
    type: 'file',
    config: true,
  },

};
