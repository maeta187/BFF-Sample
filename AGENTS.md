# AGENTS.md

## このリポジトリの目的

このリポジトリは、Next.js App Router のフロントエンドから利用するための GraphQL BFF です。

主な技術構成:

- Fastify
- GraphQL Yoga
- Pothos
- DataLoader
- GraphQL Code Generator
- TypeScript
- pnpm

BFF はフロントエンドとは別環境です。
フロントエンドとの結合は GraphQL schema を契約として保ち、不要な密結合を避けてください。

## 最初に確認するドキュメント

設計や責務に関わる変更を行う前に、以下を確認してください。

- docs/ARCHITECTURE.md
- docs/GRAPHQL.md
- docs/DEVELOPMENT.md

レビュー観点や整理方針を確認する場合は以下を確認してください。

- docs/CODE_REVIEW.md

設計の目的や初期要件を確認する前に、以下を参照してください。

- docs/PROJECT_BRIEF.md

## 重要なディレクトリと役割

- src/app.ts: Fastify アプリの組み立て
- src/server.ts: ローカル起動用のエントリポイント
- src/plugins/graphql.ts: Fastify への GraphQL Yoga 組み込み
- src/graphql/builder.ts: Pothos の builder 定義
- src/graphql/context.ts: request 単位の GraphQL context
- src/graphql/schema.ts: schema の組み立て
- src/graphql/modules/: GraphQL の型と Query/Mutation 定義
- src/data/: 一時的なデータソースや adapter
- src/graphql/documents/: Codegen 用の GraphQL document

## 使用するコマンド

パッケージ管理には必ず pnpm を使用してください。

セットアップ:

- pnpm install

開発:

- pnpm dev

確認:

- pnpm typecheck
- pnpm build
- pnpm codegen

GraphQL schema または GraphQL documents を変更した場合は、必ず以下を実行してください。

- pnpm codegen

作業完了前には、少なくとも以下を実行してください。

- pnpm typecheck
- pnpm build
- pnpm codegen

## アーキテクチャ上のルール

- Fastify は HTTP の入り口と GraphQL 以外の endpoint を担当する
- GraphQL Yoga は GraphQL の実行を担当する
- Pothos は schema 定義を担当する
- DataLoader は request 単位で生成する
- DataLoader をグローバルな singleton にしない
- GraphQL の型や field 定義は src/graphql/modules に置く
- resolver は薄く保ち、loader や service に処理を寄せる
- GraphQL schema をフロントエンドとの契約境界として扱う
- context は必要最小限に保ち、暗黙の値を増やしすぎない

## 実装上のルール

- ESM の import/export を使用する
- TypeScript strict mode 前提で実装する
- 小さく分割された関数を優先する
- 公開境界では型を明示する
- 新しい依存ライブラリは、本当に必要な場合だけ追加する
- 明示的な指示がない限り、採用技術を置き換えない
- 大きな責務移動やファイル移動は、必要な理由がある場合だけ行う

## 禁止事項

- 明示的な指示がない限り、外部サービスに接続しない
- 明示的な指示がない限り、認証を追加しない
- 明示的な指示がない限り、DB を追加しない
- 明示的な指示がない限り、Fastify / Yoga / Pothos を別技術に置き換えない
- relation 解決で batching が想定される箇所は、DataLoader を使わずに直接取得しない

## GraphQL 固有のルール

- Query 名、Mutation 名、型名は分かりやすく安定した名前にする
- requestId が必要な箇所では context から参照できるようにする
- me / user などの基本サンプル query は、意図がない限り壊さない
- schema を変更した場合は、関連する documents や codegen 生成物も同じ変更内で更新する
- 契約変更がある場合は、必要に応じて docs も更新する

## 完了条件

作業は以下を満たしたときに完了とします。

- 必要なファイルが更新されている
- プロジェクトが build できる
- typecheck が通る
- schema/documents を変更した場合は codegen が通る
- 変更内容が最終報告で明確に説明されている
- 残課題やリスクがある場合は明記されている

## このファイルの更新方針

同じ失敗や迷いが 2 回起きたら、再発防止のためにこの AGENTS.md に具体的なルールを追加してください。

このファイルは短く実用的に保ってください。
詳細な説明は docs/\*.md に分離し、このファイルから参照してください。
