export interface BackendUserDto {
  user_id: string;
  first_name: string;
  last_name: string;
  email_address: string | null;
  birthday_at: string | null;
  tier_code: 'free' | 'pro' | 'enterprise';
  last_login_at: string | null;
}

const backendUsers: Record<string, BackendUserDto> = {
  '1': {
    user_id: '1',
    first_name: 'Taro',
    last_name: 'Yamada',
    email_address: 'taro.backend@example.com',
    birthday_at: '1990-04-10T00:00:00+09:00',
    tier_code: 'pro',
    last_login_at: '2026-03-20T12:34:56.000Z',
  },
  '2': {
    user_id: '2',
    first_name: 'Hanako',
    last_name: 'Sato',
    email_address: null,
    birthday_at: '1995-12-01T00:00:00+09:00',
    tier_code: 'free',
    last_login_at: '2025-11-01T08:00:00.000Z',
  },
};

export async function fetchBackendUserById(id: string): Promise<BackendUserDto | null> {
  return backendUsers[id] ?? null;
}
