if (window.__SECURE_CONTEXT__) {
  const popups = window.__SECURE_CONTEXT__.popups;
  const cookieCrumbler = window.__SECURE_CONTEXT__.cookieCrumbler;
  // Utilisez popups et cookieCrumbler ici
} else {
  console.error('Le contexte sécurisé n\'est pas défini.');
}
