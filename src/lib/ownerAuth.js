// Supabase handles identity. The publishable key below is intentionally safe for a browser;
// it can only access resources allowed by the project's server-side policies.
const SUPABASE_URL = 'https://xsazdfzhbukyrrszluzr.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_G8Ekc8sDmEXPDJwAzzL1vg_rNv-wAfg';

export const OWNER_EMAIL = 'abhi1172006@gmail.com';
const SESSION_KEY = 'ebs_owner_session_v1';

function headers(accessToken) {
  return {
    apikey: SUPABASE_PUBLISHABLE_KEY,
    'Content-Type': 'application/json',
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
  };
}

async function request(path, options = {}, accessToken) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1${path}`, {
    ...options,
    headers: { ...headers(accessToken), ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.msg || payload.error_description || payload.message || 'Authentication request failed.');
  return payload;
}

export function getStoredOwnerSession() {
  try {
    const value = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    return value?.access_token ? value : null;
  } catch {
    return null;
  }
}

export function hasStoredOwnerSession() {
  return Boolean(getStoredOwnerSession()?.access_token);
}

export async function sendOwnerOtp(email) {
  const normalized = String(email || '').trim().toLowerCase();
  if (normalized !== OWNER_EMAIL) throw new Error('This admin is restricted to the authorized owner email only.');
  await request('/otp', {
    method: 'POST',
    body: JSON.stringify({ email: normalized, create_user: false, gotrue_meta_security: {} }),
  });
}

export async function verifyOwnerOtp(email, token) {
  const normalized = String(email || '').trim().toLowerCase();
  if (normalized !== OWNER_EMAIL) throw new Error('This admin is restricted to the authorized owner email only.');
  const code = String(token || '').replace(/\s/g, '');
  if (!/^\d{6}$/.test(code)) throw new Error('Enter the 6-digit code sent to your email.');
  const payload = await request('/verify', {
    method: 'POST',
    body: JSON.stringify({ email: normalized, token: code, type: 'email' }),
  });
  if (!payload.session?.access_token || payload.user?.email?.toLowerCase() !== OWNER_EMAIL) {
    throw new Error('Owner verification failed. Please request a new code.');
  }
  localStorage.setItem(SESSION_KEY, JSON.stringify(payload.session));
  return { id: payload.user.id, email: OWNER_EMAIL, role: 'SUPER_ADMIN' };
}

export async function getVerifiedOwner() {
  const session = getStoredOwnerSession();
  if (!session) return null;
  try {
    const user = await request('/user', { method: 'GET' }, session.access_token);
    if (user?.email?.toLowerCase() !== OWNER_EMAIL) throw new Error('Unauthorized account.');
    return { id: user.id, email: OWNER_EMAIL, role: 'SUPER_ADMIN' };
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export async function signOutOwner() {
  const session = getStoredOwnerSession();
  try {
    if (session?.access_token) await request('/logout', { method: 'POST' }, session.access_token);
  } finally {
    localStorage.removeItem(SESSION_KEY);
  }
}
