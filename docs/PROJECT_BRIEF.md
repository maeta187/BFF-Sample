# PROJECT_BRIEF.md

## 目的

Fastify + GraphQL Yoga + Pothos + DataLoader + GraphQL Codegen で、
別リポジトリの GraphQL BFF 開発環境を構築したい。

## 前提

- フロントは Next.js App Router
- BFF は Next.js とは別環境
- パッケージマネージャーは pnpm
- BFF は Node.js 環境
- まずはローカルで起動できる最小構成を作る
- 将来的に monorepo 化する可能性はあるが、今は別 repo 前提

## 採用技術

- Fastify
- GraphQL Yoga
- Pothos
- DataLoader
- GraphQL Codegen

## 期待する成果物

1. `package.json`
2. `tsconfig.json`
3. `.env.example`
4. `src/app.ts`
5. `src/server.ts`
6. `src/plugins/graphql.ts`
7. `src/graphql/builder.ts`
8. `src/graphql/context.ts`
9. `src/graphql/schema.ts`
10. `src/graphql/modules/user.ts`
11. `src/data/users.ts`
12. `codegen.ts`
13. `src/graphql/documents/GetMe.graphql`

## 要件

- `/healthz` を持つ
- `/graphql` で GraphiQL を使える
- request ごとに DataLoader を生成する
- Pothos で Query を 1 つ以上定義する
- GraphQL Codegen が動く
- `pnpm dev` で起動
- `pnpm codegen` で型生成
- ESM / TypeScript / strict true

## 補足

- Fastify plugin 構成にする
- GraphQL は Yoga を Fastify に載せる
- GraphQL context に `requestId` と `loaders` を持たせる
- ダミーデータでよいので `me` / `user` クエリを用意する
- まずは最小構成とし、その後に認証や外部 API client を追加しやすい形にする
