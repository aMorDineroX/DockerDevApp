
export const CSP_CONFIG = {
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", 'data:', 'https:'],
    'font-src': ["'self'"],
    'connect-src': ["'self'", 'wss:', 'https:'],
    'frame-ancestors': ["'none'"],
    'object-src': ["'none'"]
  }
}
