module.exports = {

  app: {
    desc: 'File for application.',
    default: 'index.html',
    alias: 'a',
    type: 'file',
  },

  bower: {
    desc: 'Directory for bower_components.',
    default: 'bower_components',
    alias: 'b',
    type: 'directory',
  },

  scripts: {
    desc: 'Directory for scripts.',
    default: 'scripts',
    alias: 'j',
    type: 'directory',
  },

  styles: {
    desc: 'Directory for styles.',
    default: 'styles',
    alias: 's',
    type: 'directory',
  },

  static: {
    desc: 'Directory for static serve.',
    default: 'static',
    alias: 'x',
    type: 'directory',
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
    desc: 'File for app config.',
    alias: 'c',
    type: 'file',
    config: true,
  },

  serve: {
    desc: 'File for express.static config.',
    alias: 'o',
    type: 'object',
  },

};
