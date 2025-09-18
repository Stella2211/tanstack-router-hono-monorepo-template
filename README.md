# TanStack Router + Hono モノレポテンプレート

モダンなフルスタックWebアプリケーション開発のためのモノレポテンプレートです。フロントエンドにTanStack Router、バックエンドにHonoを使用し、型安全な開発体験を提供します。

## 🚀 特徴

- **フロントエンド**
  - ⚡ [TanStack Router](https://tanstack.com/router) - 型安全なルーティング
  - ⚛️ React 19
  - 🎨 Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com/)
  - 📦 [TanStack Query](https://tanstack.com/query) - データフェッチング

- **バックエンド**
  - 🔥 [Hono](https://hono.dev/) - 軽量で高速なWebフレームワーク
  - ☁️ Cloudflare Workers対応
  - 🔗 [Hono RPC](https://hono.dev/docs/guides/rpc) - 型安全なAPI通信

- **開発環境**
  - 🐰 [Bun](https://bun.com) - 高速なJavaScriptランタイム
  - 📦 Bunワークスペースによるモノレポ管理
  - 🔧 TypeScript - 完全な型サポート
  - 🎯 Biome - 高速なフォーマッター/リンター

## 📋 前提条件

- [Bun](https://bun.sh) がインストールされていること

## 🛠️ セットアップ

### 1. リポジトリをクローン

```bash
git clone https://github.com/Stella2211/tanstack-hono-monorepo-template.git
cd tanstack-hono-monorepo-template
```

### 2. 依存関係をインストール

```bash
bun install
```

### 3. 開発サーバーを起動

```bash
bun run dev
```

これにより以下が起動します：
- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:8787

## 📁 プロジェクト構造

```
.
├── frontend/               # フロントエンドアプリケーション
│   ├── src/
│   │   ├── components/     # Reactコンポーネント
│   │   ├── routes/         # TanStack Routerのルート
│   │   ├── hooks/          # カスタムフック
│   │   ├── lib/           # ユーティリティ関数
│   │   └── styles.css     # グローバルスタイル
│   └── package.json
│
├── backend/               # バックエンドAPI
│   ├── src/
│   │   └── index.ts      # Honoアプリケーションのエントリーポイント
│   └── package.json
│
├── package.json          # ルートpackage.json
├── biome.json           # Biome設定
└── tsconfig.json        # TypeScript設定
```

## 🔗 Hono RPCで型安全なAPI通信を実現

Hono RPCを使用すると、バックエンドのAPIをフロントエンドから型安全に呼び出すことができます。

使用例は`frontend/src/routes/users.tsx`にあります。

## 📝 利用可能なスクリプト

### ルートディレクトリ

- `bun run dev` - フロントエンドとバックエンドを同時起動
- `bun run check` - TypeScriptの型チェック
- `bun run format` - コードフォーマット（Biome）

### フロントエンド（`frontend/`）

- `bun run dev` - 開発サーバー起動（ポート3000）
- `bun run build` - プロダクションビルド
- `bun run serve` - ビルドしたアプリのプレビュー
- `bun run test` - テスト実行
- `bun run format` - コードフォーマット（Biome）

### バックエンド（`backend/`）

- `bun run dev` - Wrangler開発サーバー起動
- `bun run deploy` - Cloudflare Workersへデプロイ
- `bun run cf-typegen` - Cloudflareバインディングの型生成

## 🚀 デプロイ

### バックエンド（Cloudflare Workers）

1. `wrangler`にログイン

```bashbash
cd backend
bunx wrangler login

2. デプロイ実行:

```bash
bun run deploy
```

### フロントエンド

任意の静的サイトホスティングサービス（Cloudflare Pages、Vercel、Netlifyなど）にデプロイできます。

```bash
cd frontend
bun run build
# distディレクトリをホスティングサービスにアップロード
```

## 🤝 貢献

何か改善点があれば、積極的にプルリクエストを送ってください！

## 📄 ライセンス

MIT
