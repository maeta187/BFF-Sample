export type MembershipTierCode = 'free' | 'pro' | 'enterprise'

/**
 * バックエンドの tier code を画面表示向けラベルへ変換します。
 *
 * @param tierCode バックエンド由来の会員ティアコード。
 * @returns GraphQL レスポンスで利用する表示用ラベル。
 */
export function toMembershipLabel(tierCode: MembershipTierCode): string {
  switch (tierCode) {
    case 'enterprise':
      return 'Enterprise'
    case 'pro':
      return 'Pro'
    default:
      return 'Free'
  }
}

/**
 * ユーザーを休眠扱いにするか判定します。
 *
 * 次のいずれかを満たす場合に休眠と判定します。
 * - `lastLoginAt` が未設定
 * - `lastLoginAt` が不正な日時
 * - 経過日数が `dormantDays` を超過
 *
 * @param lastLoginAt 最終ログイン日時（ISO文字列）。
 * @param dormantDays 休眠判定の日数しきい値。省略時は `90`。
 * @param now 比較基準となる現在時刻。省略時は実行時刻。
 * @returns 休眠の場合は `true`、それ以外は `false`。
 */
export function isDormant(
  lastLoginAt: string | null,
  dormantDays: number = 90,
  now: Date = new Date()
): boolean {
  if (!lastLoginAt) {
    return true
  }

  const lastLoginTime = new Date(lastLoginAt).getTime()

  if (Number.isNaN(lastLoginTime)) {
    return true
  }

  const dormantMs = dormantDays * 24 * 60 * 60 * 1000

  return now.getTime() - lastLoginTime > dormantMs
}
