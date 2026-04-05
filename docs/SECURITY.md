# セキュリティ運用（pnpm）

## 背景

2026年3月31日に axios のサプライチェーン攻撃が発生し、`axios@1.14.1` / `axios@0.30.4` が侵害バージョンとして報告されました。  
このリポジトリでは、pnpm 前提で次の防御を有効化しています。

## 現在の防御設定

### 1. クールダウン（公開直後バージョンの導入遅延）

`pnpm-workspace.yaml`:

```yaml
minimumReleaseAge: 10080
```

- 7日（10080分）未満の新規公開バージョンはインストールしない
- 短時間で削除される悪意あるバージョンを取り込むリスクを下げる

### 2. インストールスクリプトの厳格運用

`pnpm-workspace.yaml`:

```yaml
strictDepBuilds: true
allowBuilds: {}
```

- 依存パッケージの `preinstall/install/postinstall` は明示承認が必要
- 追加承認が必要な場合は `pnpm approve-builds` でレビューして許可する

### 3. axios の安全版固定（transitive dependency 対策）

`package.json`:

```json
{
	"pnpm": {
		"overrides": {
			"axios": "1.14.0"
		}
	}
}
```

- 直接依存がなくても、間接依存経由で侵害版が入るリスクを抑制する

## 運用コマンド

### CI の固定インストール

```bash
pnpm run install:ci
```

### axios 混入確認

```bash
pnpm run security:axios
```

### 依存脆弱性監査

```bash
pnpm run security:audit
```

## 補足

- `overrides` は緊急回避にも使う設定です。上流が安全化した後も固定の要否を定期的に見直してください。
- lockfile 更新を含むPRは必ず差分レビューしてください。
