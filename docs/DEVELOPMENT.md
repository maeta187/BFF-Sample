# 開発手順

## 前提
- Node.js を使用する
- パッケージマネージャーは pnpm を使用する
- ESM / TypeScript 前提で開発する

## 初回セットアップ
```bash
pnpm install
```

## 開発サーバー起動
```bash
pnpm dev
```

起動後の確認先:
- `http://localhost:4000/healthz`
- `http://localhost:4000/graphql`

## よく使うコマンド
### 型チェック
```bash
pnpm typecheck
```

### ビルド
```bash
pnpm build
```

### Codegen
```bash
pnpm codegen
```

### セキュリティ確認
```bash
pnpm run security:axios
pnpm run security:audit
```

## 作業の基本フロー
### 1. GraphQL 型や Query を追加する場合
1. `src/graphql/modules/` に型や field を追加する
2. 必要に応じて `src/graphql/documents/` に document を追加する
3. `pnpm codegen` を実行する
4. `pnpm typecheck` を実行する
5. `pnpm build` を実行する

### 2. Fastify endpoint を追加する場合
1. `src/app.ts` または `src/plugins/` を更新する
2. GraphQL の責務と混ざっていないか確認する
3. `pnpm typecheck` を実行する
4. `pnpm build` を実行する

### 3. データ取得処理を追加する場合
1. `src/data/` または将来の `src/services/`, `src/clients/` に実装する
2. resolver から直接複雑なロジックを書きすぎない
3. relation 解決は DataLoader の利用を検討する
4. `pnpm typecheck` を実行する
5. 必要に応じて `pnpm codegen` を実行する

## 環境変数
`.env.example` を参照する。
必要な値はまず最小限に保つ。

例:
- `PORT`
- `HOST`

認証や外部 API 追加時に環境変数が増える場合は、`.env.example` を必ず更新する。

## GraphiQL での確認
開発時は `/graphql` にアクセスして Query を試す。
最低限、次の Query が動く状態を保つ。

```graphql
query GetMe {
  me {
    id
    name
    email
  }
  requestId
}
```

## 変更後の確認手順
最低限、次を実行する。

```bash
pnpm typecheck
pnpm build
pnpm codegen
```

schema や document を変更していない場合でも、少なくとも `typecheck` と `build` は実行する。

## つまずきやすいポイント
### `pnpm codegen` が失敗する
- 開発サーバーが起動していない可能性がある
- `codegen.ts` の schema URL が正しいか確認する
- GraphQL schema に syntax error がないか確認する

### GraphiQL が開かない
- `pnpm dev` が起動しているか確認する
- `/graphql` の route が Fastify に登録されているか確認する
- ポート番号が環境変数で変わっていないか確認する

### DataLoader が効いていない
- DataLoader を request ごとに生成しているか確認する
- resolver で loader を使わず直接取得していないか確認する

## 今後追加する候補
- 認証
- 外部 API client
- service 層
- テスト
- logger の整理
- query complexity 制御
