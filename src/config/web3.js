export const initializeWeb3Environment = () => {
  if (!window.ethereum) {
    Object.defineProperty(window, 'ethereum', {
      value: {},
      writable: true,
      configurable: true
    });
  } else {
    console.warn('La propriété ethereum est déjà définie.');
  }

  if (!window.__SECURE_CONTEXT__) {
    window.__SECURE_CONTEXT__ = {
      popups: new Map(),
      cookieCrumbler: new Map(),
      ethereum: window.ethereum
    };
  } else {
    console.warn('Le contexte sécurisé est déjà initialisé.');
  }

  return {
    getProvider: () => window.ethereum,
    getSecureContext: () => window.__SECURE_CONTEXT__
  }
}