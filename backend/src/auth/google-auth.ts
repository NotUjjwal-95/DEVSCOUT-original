import { OAuth2Client } from 'google-auth-library';
import { env } from '../config/env.ts';
import { AppError } from '../middleware/error.middleware.ts';

export interface VerifiedGoogleProfile {
  sub: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
}

const VALID_GOOGLE_ISSUERS: ReadonlySet<string> = new Set([
  'accounts.google.com',
  'https://accounts.google.com',
]);

let cachedClient: OAuth2Client | null = null;
let cachedClientId: string | null = null;

function getGoogleOAuthClient(clientId: string): OAuth2Client {
  if (!cachedClient || cachedClientId !== clientId) {
    cachedClient = new OAuth2Client(clientId);
    cachedClientId = clientId;
  }
  return cachedClient;
}

function resolveRequiredClientId(): string {
  const clientId = env.GOOGLE_CLIENT_ID?.trim();
  if (!clientId) {
    throw new AppError(
      'Google authentication is not configured: missing GOOGLE_CLIENT_ID.',
      503,
      'GOOGLE_AUTH_NOT_CONFIGURED'
    );
  }
  return clientId;
}

/**
 * Verifies a Google OAuth 2.0 ID token against the configured GOOGLE_CLIENT_ID
 * and returns a normalized, verified user profile.
 */
export async function verifyGoogleIdToken(
  idToken: string
): Promise<VerifiedGoogleProfile> {
  const clientId = resolveRequiredClientId();

  if (typeof idToken !== 'string' || idToken.trim().length === 0) {
    throw new AppError(
      'A non-empty Google ID token is required.',
      401,
      'INVALID_GOOGLE_ID_TOKEN'
    );
  }

  const trimmedToken = idToken.trim();
  const oauthClient = getGoogleOAuthClient(clientId);

  let payload;
  try {
    const ticket = await oauthClient.verifyIdToken({
      idToken: trimmedToken,
      audience: clientId,
    });
    payload = ticket.getPayload();
  } catch {
    throw new AppError(
      'Invalid or expired Google ID token.',
      401,
      'INVALID_GOOGLE_ID_TOKEN'
    );
  }

  if (!payload) {
    throw new AppError(
      'Google ID token verification returned an empty payload.',
      401,
      'INVALID_GOOGLE_ID_TOKEN'
    );
  }

  if (!payload.iss || !VALID_GOOGLE_ISSUERS.has(payload.iss)) {
    throw new AppError(
      'Google ID token has an untrusted issuer.',
      401,
      'INVALID_GOOGLE_ID_TOKEN'
    );
  }

  const tokenAudience = payload.aud;
  const audienceMatches = Array.isArray(tokenAudience)
    ? tokenAudience.includes(clientId)
    : tokenAudience === clientId;

  if (!audienceMatches) {
    throw new AppError(
      'Google ID token audience does not match the configured client ID.',
      401,
      'INVALID_GOOGLE_ID_TOKEN'
    );
  }

  if (payload.email_verified !== true) {
    throw new AppError(
      'Google account email address is not verified.',
      401,
      'UNVERIFIED_GOOGLE_EMAIL'
    );
  }

  const sub = typeof payload.sub === 'string' ? payload.sub.trim() : '';
  const email =
    typeof payload.email === 'string' ? payload.email.trim().toLowerCase() : '';

  if (!sub || !email) {
    throw new AppError(
      'Google ID token is missing required subject or email claims.',
      401,
      'INVALID_GOOGLE_ID_TOKEN'
    );
  }

  const rawName = typeof payload.name === 'string' ? payload.name.trim() : '';
  const fallbackName = email.split('@')[0] || 'DEVSCOUT User';
  const displayName = rawName || fallbackName;

  const rawPicture =
    typeof payload.picture === 'string' ? payload.picture.trim() : '';
  const avatarUrl = rawPicture.length > 0 ? rawPicture : undefined;

  return {
    sub,
    email,
    displayName,
    ...(avatarUrl ? { avatarUrl } : {}),
  };
}

export default verifyGoogleIdToken;
