
export const initContentSecurity = () => {
  // Define permitted intrinsics
  const permittedIntrinsics = {
    popups: true,
    cookieCrumbler: true
  }

  // Initialize content handlers
  window.__CONTENT_SECURITY__ = permittedIntrinsics

  return {
    getSecurityContext: () => window.__CONTENT_SECURITY__,
    hasPermission: (key) => !!window.__CONTENT_SECURITY__[key]
  }
}
