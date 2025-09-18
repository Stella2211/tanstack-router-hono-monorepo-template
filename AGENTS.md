# プロジェクトガイド

このドキュメントは、AIアシスタントがこのプロジェクトを理解し、効果的に作業するためのガイドです。

## 📌 プロジェクト概要

このプロジェクトは、TanStack RouterとHonoを使用したフルスタックWebアプリケーションのモノレポテンプレートです。フロントエンドとバックエンドが型安全に連携し、モダンな開発体験を提供します。

## 🏗️ アーキテクチャ

### モノレポ構成
- **Bunワークスペース**を使用してフロントエンドとバックエンドを管理
- ルートディレクトリから`bun run dev`で両方のサービスを同時起動可能

### フロントエンド（`/frontend`）
- **TanStack Router**: ファイルベースの型安全なルーティング
- **React 19**: 最新のReactフレームワーク
- **Tailwind CSS v4 + shadcn/ui**: スタイリングとUIコンポーネント
- **TanStack Query**: サーバーステート管理
- **Vite**: 開発サーバーとビルドツール

### バックエンド（`/backend`）
- **Hono**: 軽量・高速なWebフレームワーク
- **Cloudflare Workers**: エッジコンピューティング対応
- **Wrangler**: Cloudflare CLIツール

## 🔑 重要なファイルと役割

```
tanstack-hono-monorepo-template/
├── frontend/
│   ├── src/
│   │   ├── routes/          # TanStack Routerのルート定義
│   │   │   ├── __root.tsx   # ルートレイアウト
│   │   │   └── index.tsx    # ホームページ
│   │   ├── components/      # 再利用可能なコンポーネント
│   │   │   └── ui/          # shadcn/uiコンポーネント
│   │   ├── lib/
│   │   │   ├── utils.ts     # ユーティリティ関数
│   │   │   └── api.ts       # API クライアント（Hono RPC）
│   │   └── router.tsx       # ルーター設定
│   └── package.json
│
├── backend/
│   ├── src/
│   │   └── index.ts         # Honoアプリケーションのエントリー
│   ├── wrangler.toml        # Cloudflare Workers設定（要作成）
│   └── package.json
│
├── package.json             # ルートパッケージ（ワークスペース定義）
├── biome.json              # コードフォーマット・リント設定
└── tsconfig.json           # TypeScript設定
```

## 🛠️ 開発ワークフロー

### 新機能追加時の手順

1. **バックエンドAPIの実装**
   ```typescript
   // backend/src/index.ts
   const routes = app
     .get('/users', (c) => {
       return c.json([
         { id: 1, name: "John Doe", email: "john@example.com" },
         { id: 2, name: "Jane Smith", email: "jane@example.com" }
       ])
     })

   export type AppType = typeof routes  // 型エクスポート
   ```

2. **フロントエンドでの型安全な呼び出し**
   ```typescript
   // frontend/src/lib/api.ts
   import { hc } from 'hono/client'
   import type { AppType } from '../../backend/src/index'

   const client = hc<AppType>('http://localhost:8787')
   ```

   実装例は `frontend/src/routes/users.tsx` を参照してください。

3. **ルートの追加**（TanStack Router）
   - `frontend/src/routes/`に新しいファイルを作成
   - ファイル名がURLパスに対応（`about.tsx` → `/about`）
   - サーバが起動されている場合、自動的にテンプレートが生成されます

4. **UIコンポーネントの追加**
   - shadcn/uiのコンポーネントは`frontend/src/components/ui/`に配置済み
   - 必要に応じて追加
   - 今後の更新を容易にするため、`ui/`フォルダ内のコンポーネントは直接編集しないことを推奨

## 💡 開発のヒント

### 型安全性を保つ
- バックエンドの型定義（`AppType`）を必ずエクスポート
- フロントエンドでは`hono/client`の`hc`関数で型を適用
- TanStack Routerのファイルベースルーティングを活用

### パフォーマンス最適化
- TanStack Queryでサーバーステートをキャッシュ
- React.lazy()でコード分割
- Cloudflare WorkersでエッジにAPIをデプロイ

### エラーハンドリング
- バックエンドで`HttpException`を使用してHTTPエラーコードを適切に返す
- フロントエンドではTanStack QueryのエラーハンドリングとRCCを活用
- zod でバリデーション

## 📦 依存関係の管理

### 新しいパッケージの追加
```bash
# フロントエンドに追加
cd frontend && bun add package-name

# バックエンドに追加
cd backend && bun add package-name

# ルートに追加（開発ツール等）
bun add -D package-name
```

### 更新
```bash
bun update  # すべての依存関係を更新
```

## 🔍 トラブルシューティング

### よくある問題と解決方法

1. **型エラーが発生する**
   - `bun run check`で型チェック実行
   - バックエンドの`AppType`が正しくエクスポートされているか確認
   - `tsconfig.json`のパス設定を確認

2. **開発サーバーが起動しない**
   - ポート（3000, 8787）が使用中でないか確認
   - `node_modules`を削除して`bun install`を再実行

3. **Cloudflare Workersへのデプロイエラー**
   - まず`bunx wrangler login`でログインする
   - `wrangler.toml`が正しく設定されているか確認（必要に応じて作成）
   - Cloudflareアカウントでの認証状態を確認

## 🚀 推奨される実装パターン

### API エンドポイントの実装
```typescript
// グループ化とミドルウェアの適用
const api = new Hono()
  .use('*', cors())
  .use('*', logger())

const routes = api
  .get('/users', listUsers.GET)
  .post('/users', createUser.POST)
  .get('/users/:id', getUser.GET)
```

### フロントエンドのデータフェッチング
```typescript
// TanStack Queryのカスタムフック
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    async queryFn() {
      const res = await client.api.users.$get()
      if (!res.ok) throw new Error('Failed to fetch')
      return await res.json()
    }
  })
}
```

### フォーム処理
```tsx
// React Hook Form + Zodの使用
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email()
})

function Form() {
  const form = useForm({
    resolver: zodResolver(schema)
  })
  // ...
}
```

## 📝 コーディング規約

1. **命名規則**
   - コンポーネント: PascalCase
   - 関数・変数: camelCase
   - 定数: UPPER_SNAKE_CASE
   - ファイル名: kebab-case（コンポーネント以外）

2. **フォーマット**
   - Biomeで自動フォーマット: `bun run format`
   - インデント: スペース2つ
   - セミコロン: なし（Biome設定に従う）

3. **TypeScript**
   - `any`型や`as`による型アサーション、`ts-ignore`による抑制は避ける
   - 明示的な型定義を優先
   - `strict: true`を維持

## 🔒 セキュリティ考慮事項

1. **環境変数**
   - シークレットは`.env`ファイルに保存（gitignoreに追加済み）
   - Cloudflare Workersの場合はWrangler secretsを使用

2. **CORS**
   - 本番環境では適切なオリジンを設定
   - 開発環境のみ`*`を許可

3. **バリデーション**
   - フロントエンドとバックエンド両方でバリデーション
   - Zodスキーマを共有して一貫性を保つ

## 📚 参考リソース

- [TanStack Router ドキュメント](https://tanstack.com/router)
- [Hono ドキュメント](https://hono.dev/)
- [Hono RPC ガイド](https://hono.dev/docs/guides/rpc)
- [Cloudflare Workers ドキュメント](https://developers.cloudflare.com/workers/)
- [shadcn/ui コンポーネント](https://ui.shadcn.com/)
- [Bun ドキュメント](https://bun.sh/docs)

---

このガイドを参照しながら開発を進めてください。質問があれば、コードとこのドキュメントを参照して適切な回答を提供します。