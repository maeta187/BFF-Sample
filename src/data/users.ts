export interface UserRecord {
  id: string;
  name: string;
  email: string;
}

const users: UserRecord[] = [
  {
    id: '1',
    name: 'Taro Yamada',
    email: 'taro@example.com',
  },
  {
    id: '2',
    name: 'Hanako Sato',
    email: 'hanako@example.com',
  },
];

const userById = new Map(users.map((user) => [user.id, user]));

export function findCurrentUser(): UserRecord | null {
  return users[0] ?? null;
}

export async function findUsersByIds(ids: string[]): Promise<Array<UserRecord | null>> {
  return ids.map((id) => userById.get(id) ?? null);
}
