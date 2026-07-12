import { supabase } from './supabase';

const API_BASE = import.meta.env.PUBLIC_API_URL || 'https://hyprlane-api.sabplay-idk.workers.dev';

async function request(method: string, path: string, body?: unknown) {
  const { data: { session } } = await supabase.auth.getSession();
  const token = session?.access_token;

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
  getStatus: (guildId: string, userId: string) =>
    request('GET', `/guilds/${guildId}/members/${userId}/status`),

  createLink: (guildId: string, userId: string) =>
    request('POST', `/guilds/${guildId}/verification-links`, { discord_id: userId }),

  validateToken: (token: string) =>
    request('GET', `/verify/${token}`),

  completeVerification: (token: string, data: {
    access_token: string;
    discord_id: string;
    challenge_passed: boolean;
    email?: string;
  }) => request('POST', `/verify/${token}/complete`, data),

  getHlidCard: (userId: string) =>
    request('GET', `/users/${userId}/hlid-card`),

  getGuildConfig: (guildId: string) =>
    request('GET', `/dashboard/guilds/${guildId}/config`),

  updateGuildConfig: (guildId: string, data: unknown) =>
    request('PUT', `/dashboard/guilds/${guildId}/config`, data),

  getVerifiedMembers: (guildId: string) =>
    request('GET', `/dashboard/guilds/${guildId}/verified-members`),

  getGuildStats: (guildId: string) =>
    request('GET', `/dashboard/guilds/${guildId}/stats`),

  getUserGuilds: () =>
    request('GET', '/dashboard/guilds'),
};
