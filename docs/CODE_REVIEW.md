# コードレビュー観点

## 基本方針
レビューでは、動作するかどうかだけでなく、責務分離・保守性・将来拡張しやすさも確認する。
このリポジトリでは、Fastify / GraphQL Yoga / Pothos / DataLoader の責務境界を崩していないかを特に重視する。

## Fastify 観点
- HTTP の責務が Fastify 側に保たれているか
- health check や将来の非 GraphQL endpoint と GraphQL 実装が混ざりすぎていないか
- plugin 構成が不必要に崩れていないか

## GraphQL Yoga 観点
- `/graphql` の実行責務に集中しているか
- Fastify 固有ロジックを Yoga 周辺に書きすぎていないか
- GraphiQL や GraphQL endpoint 設定が壊れていないか

## Pothos 観点
- schema 定義が `src/graphql/modules/` に整理されているか
- `schema.ts` が組み立て専用になっているか
- object 型、Query、Mutation の責務が適切に分かれているか

## Resolver 観点
- resolver が薄いか
- resolver に業務ロジックを詰め込みすぎていないか
- resolver に直接外部 API 呼び出しを書きすぎていないか
- service や loader に処理を寄せられる余地があるか

## DataLoader 観点
- DataLoader が request 単位で生成されているか
- グローバル singleton になっていないか
- relation 解決で直接取得を多用していないか
- batching を使うべき箇所で loader を利用しているか

## Context 観点
- context が肥大化していないか
- requestId や loaders のような必要な値だけが入っているか
- 暗黙の shared state を持ち込んでいないか

## Codegen 観点
- schema や document を変更したのに codegen を更新し忘れていないか
- 生成物更新が必要な変更かどうかが確認されているか
- `pnpm codegen` を実行した前提になっているか

## 依存関係観点
- 新しい依存ライブラリは本当に必要か
- 既存スタックで解決できるのに増やしていないか
- 将来の保守コストに見合うか

## 命名観点
- Query 名、Mutation 名、型名が分かりやすいか
- フロントエンドから見て自然な名前か
- 一時的な内部都合の名前を公開していないか

## 変更の大きさ観点
- 必要以上に大きな責務変更になっていないか
- 無関係なリファクタが混ざっていないか
- 今回の目的に対して変更範囲が適切か

## レビュー時の確認コマンド
最低限、次が通る前提でレビューする。

```bash
pnpm typecheck
pnpm build
pnpm codegen
```

## 指摘の優先順位
1. 動作不良や契約破壊
2. request 単位 state の破壊
3. 責務分離の崩れ
4. 保守性の低下
5. 命名や整理の改善

## マージ前の確認
- schema 変更の意図が明確か
- フロントエンド契約への影響が把握されているか
- 追加した実装が docs 更新を必要としないか
- 残課題や未対応事項が明記されているか
