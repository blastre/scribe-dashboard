// ─────────────────────────────────────────────────────────────────────────────
// Per-user localStorage scoping. AppData sets the active user's CANONICAL key
// (src/lib/identityKey.ts — the same value the server keys KV on) when the
// Scribe identity resolves or changes; the stores below it call scopedKey()
// on EVERY read/write, so a mid-session user switch redirects all storage
// immediately, with no cached key going stale.
//
// Anonymous (standalone visits, host silent) → the unsuffixed legacy keys —
// byte-for-byte today's behavior. The canonical charset is localStorage-safe,
// so the key is embedded as-is.
// ─────────────────────────────────────────────────────────────────────────────

let user: string | null = null

/** Set by AppData when identity resolves/changes. null = anonymous (legacy keys). */
export function setStorageUser(key: string | null): void {
  user = key
}

/** 'scribe:tracked:v1' → 'scribe:tracked:v1:u:<key>' when a user is active. */
export function scopedKey(base: string): string {
  return user ? `${base}:u:${user}` : base
}
