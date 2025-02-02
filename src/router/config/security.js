export const CSP_CONFIG = {
  directives: {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
    'style-src': ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
    'img-src': ["'self'", "data:", "https:", "https://api.dicebear.com"],
    'font-src': ["'self'", "https://fonts.gstatic.com", "data:"],
    'connect-src': ["'self'", "wss:", "https:"],
    'frame-ancestors': ["'none'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'manifest-src': ["'self'"],
    'media-src': ["'self'"],
    'worker-src': ["'self'", "blob:"]
  }
}

export const SECURITY_HEADERS = {
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-site',
  'Cross-Origin-Embedder-Policy': 'credentialless'
}
