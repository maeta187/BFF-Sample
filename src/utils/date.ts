const DEFAULT_JA_TIME_ZONE = 'Asia/Tokyo'

/**
 * `Date` オブジェクトを指定タイムゾーンで `yyyy年mm月dd日` 形式に変換します。
 *
 * @param date 変換対象の `Date` オブジェクト。
 * @param timeZone IANA タイムゾーン文字列。
 * @returns 整形済みの日付文字列。整形に必要なトークンが取得できない場合は `null`。
 */
function formatToJapaneseDate(date: Date, timeZone: string): string | null {
  const formatter = new Intl.DateTimeFormat('ja-JP', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const parts = formatter.formatToParts(date)
  const year = parts.find((part) => part.type === 'year')?.value
  const month = parts.find((part) => part.type === 'month')?.value
  const day = parts.find((part) => part.type === 'day')?.value

  if (!year || !month || !day) {
    return null
  }

  return `${year}年${month}月${day}日`
}

/**
 * 日時文字列を `yyyy年mm月dd日` 形式に変換します。
 *
 * @param dateTime 日時文字列（例: ISO8601）。
 * @param timeZone IANA タイムゾーン文字列。省略時は `Asia/Tokyo`。
 * @returns 整形済みの日付文字列。入力が空または不正な場合は `null`。
 */
export function formatAsJapaneseDate(
  dateTime: string | null,
  timeZone: string = DEFAULT_JA_TIME_ZONE
): string | null {
  if (!dateTime) {
    return null
  }

  const date = new Date(dateTime)

  if (Number.isNaN(date.getTime())) {
    return null
  }

  return formatToJapaneseDate(date, timeZone)
}
