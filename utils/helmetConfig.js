const helmet = require('helmet');

const helmetConfig = helmet({
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: {
    policy: 'cross-origin',
  },
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'", 'data:', 'blob:', 'https:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'data:'],
      scriptSrc: [
        "'self'",
        'https:',
        'http:',
        'blob:',
        'https://*.cloudflare.com',
        "'unsafe-inline'",
      ],
      frameSrc: ["'self'", 'https://js.stripe.com'],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
      workerSrc: ["'self'", 'data:', 'blob:'],
      childSrc: ["'self'", 'blob:'],
      imgSrc: ["'self'", 'data:', 'blob:', 'https://*.tile.openstreetmap.org'],
      connectSrc: [
        "'self'",
        'blob:',
        'https://*.tile.openstreetmap.org',
        'ws:',
        'wss:',
        'https:',
      ],
      upgradeInsecureRequests: [],
    },
  },
});

module.exports = helmetConfig;
