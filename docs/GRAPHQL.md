# GraphQL 実装方針

## 基本方針
このリポジトリにおける GraphQL は、フロントエンドとの契約境界である。
内部実装の都合をそのまま露出するのではなく、BFF として分かりやすい schema を提供する。

## schema の考え方
- schema は公開契約として扱う
- 型名、Query 名、Mutation 名は安定した名前にする
- 一時的な内部事情をそのまま公開しない
- 破壊的変更は慎重に扱う

## ファイル配置
- `src/graphql/builder.ts`: Pothos builder
- `src/graphql/context.ts`: GraphQL context
- `src/graphql/schema.ts`: schema 組み立て
- `src/graphql/modules/`: 型・field・Query・Mutation
- `src/graphql/documents/`: Codegen 用 document

## modules のルール
- GraphQL の object 型は `modules/` に置く
- Query / Mutation も `modules/` に置く
- schema.ts は import と組み立てに集中させる
- schema.ts に業務ロジックを書かない

## resolver のルール
- resolver は薄く保つ
- 役割は入力の受け取りと委譲に寄せる
- 複雑な処理は service 層へ寄せる
- 外部 API 呼び出しを resolver に直接書きすぎない
- relation 解決では DataLoader を使う

## DataLoader のルール
- DataLoader は request 単位で生成する
- グローバル singleton にしない
- context 作成時に new する
- 同一 request 内の batching / caching に限定して使う
- relation 解決で複数回同種アクセスが発生する場合は優先して利用する

## Context のルール
context には最低限、次のような情報を持たせる。
- requestId
- loaders
- 認証済みユーザー情報（将来追加）

次のような値は必要になるまで増やさない。
- 多すぎる helper
- 暗黙の shared state
- request と無関係な cache

## 命名ルール
- Query 名は役割が分かる名前にする
- 型名は単数形を基本にする
- field 名はフロントエンドから見て自然な名前を優先する
- `me`, `user`, `requestId` のような基本 Query はサンプルとして壊さない

## documents のルール
- Codegen 対象の document は `src/graphql/documents/` に置く
- schema を変えたら、必要に応じて document も更新する
- document を追加・変更したら `pnpm codegen` を実行する

## 変更時のチェックポイント
### Query / 型追加時
- 命名が分かりやすいか
- resolver が肥大化していないか
- DataLoader を使うべき箇所を直接取得していないか
- document と codegen への影響を確認したか

### 既存 schema の変更時
- 破壊的変更ではないか
- 既存の document を壊していないか
- フロントエンド契約に影響する箇所を把握しているか
- 必要なら docs も更新したか

## 将来的な拡張方針
- Mutation を追加する
- 認証情報を context に追加する
- service 層を通した resolver 実装に寄せる
- query complexity 制御を入れる
- observability を追加する
