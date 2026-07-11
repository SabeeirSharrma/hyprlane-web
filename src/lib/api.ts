const API_BASE = import.meta.env.PUBLIC_API_URL || 'https://hyprlane-api.sabplay-idk.workers.dev';

async function request(method: string, path: string, body?: unknown, token?: string) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`API ${method} ${path} → ${res.status}: ${text}`);
  }

  return res.json();
}

export const api = {
  getStatus: (guildId: string, userId: string, token?: string) =>
    request('GET', `/guilds/${guildId}/members/${userId}/status`, undefined, token),

  createLink: (guildId: string, userId: string, token?: string) =>
    request('POST', `/guilds/${guildId}/verification-links`, { discord_id: userId }, token),

  validateToken: (token: string) =>
    request('GET', `/verify/${token}`),

  completeVerification: (token: string, data: {
    access_token: string;
    discord_id: string;
    challenge_passed: boolean;
    email?: string;
  }) => request('POST', `/verify/${token}/complete`, data),

  getHlidCard: (userId: string, token?: string) =>
    request('GET', `/users/${userId}/hlid-card`, undefined, token),

  discordCallback: (code: string, redirectUri?: string) =>
    request('POST', '/auth/discord/callback', { code, redirect_uri: redirectUri }),

  getGuildConfig: (guildId: string, token: string) =>
    request('GET', `/dashboard/guilds/${guildId}/config`, undefined, token),

  updateGuildConfig: (guildId: string, data: unknown, token: string) =>
    request('PUT', `/dashboard/guilds/${guildId}/config`, data, token),

  getVerifiedMembers: (guildId: string, token: string) =>
    request('GET', `/dashboard/guilds/${guildId}/verified-members`, undefined, token),

  getGuildStats: (guildId: string, token: string) =>
    request('GET', `/dashboard/guilds/${guildId}/stats`, undefined, token),

  getUserGuilds: (token: string) =>
    request('GET', '/dashboard/guilds', undefined, token),
};
