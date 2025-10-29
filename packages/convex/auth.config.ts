/**
 * Authentication Configuration
 *
 * Configures Convex to accept JWT tokens from Supergent marketplace.
 *
 * Uses customJwt type to explicitly specify JWKS URL and bypass OpenID discovery.
 * This avoids conflicts with Better Auth's /.well-known/openid-configuration endpoint.
 *
 * JWT Structure:
 * - Issuer (iss): https://basic-ladybug-921.convex.site
 * - Audience (aud): tenant:task-manager-354715
 * - Subject (sub): Per-app opaque user ID
 * - Algorithm: RS256
 * - Expiry: 15 minutes with automatic refresh
 *
 * See: https://docs.convex.dev/auth/advanced/custom-jwt
 */

export default {
  providers: [
    {
      type: "customJwt",
      issuer: "https://basic-ladybug-921.convex.site",
      applicationID: "tenant:task-manager-354715",
      jwks: "https://basic-ladybug-921.convex.site/.well-known/jwks.json",
      algorithm: "RS256",
    },
  ],
};
