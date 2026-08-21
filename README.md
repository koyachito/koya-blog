# koya-blog

Next.jsとPostgreSQLで構築した、個人ブログ兼ポートフォリオサイトです。

記事の閲覧だけでなく、Google OAuthによる管理者認証、Markdown形式の記事作成、カテゴリー・タグ管理など、ブログ運営に必要なCMS機能を実装しています。

## URL

- Webサイト: https://koyachito.com
- Repository: https://github.com/koyachito/koya-blog

管理画面は登録された管理者アカウントのみ利用できます。

## 主な機能

### 一般ユーザー向け

- 公開済み記事の一覧表示
- 記事詳細の表示
- MarkdownのHTML表示
- カテゴリー・タグの表示
- 記事の作成日時・更新日時の表示
- 下書き記事へのアクセス制限

### 管理者向け

- Google OAuthによるログイン
- メールアドレスによる管理者認可
- 記事の作成・閲覧・編集・削除
- 記事の公開・下書き切り替え
- カテゴリーの作成・名前変更・削除
- タグの作成・名前変更・削除
- 記事へのカテゴリー・タグの設定
- 使用中のカテゴリー・タグの削除制限
- Zodによるフォーム入力値の検証

## 技術スタック

| 分類 | 技術 |
|---|---|
| Language | TypeScript |
| Framework | Next.js 16（App Router） |
| UI | React 19 |
| Authentication | Auth.js / Google OAuth |
| Database | PostgreSQL 16 |
| ORM | Prisma 7 |
| Markdown | react-markdown / remark-gfm / rehype-slug |
| Validation | Zod |
| Local environment | Docker / Docker Compose |
| Hosting | Vercel |
| Production database | Neon |
| Domain / DNS | Cloudflare |

## 設計・実装上のポイント

### Server ComponentsとServer Actions

記事やカテゴリーなどのデータ取得にはServer Componentsを使用しています。

フォーム送信やデータ更新にはServer Actionsを使用し、クライアントから独自APIを直接呼び出さずにサーバー側の処理を実行する構成にしました。

### 認証と認可

Auth.jsとGoogle OAuthを使用してログイン機能を実装しています。

ログイン済みかどうかだけでなく、環境変数`ADMIN_EMAIL`とログインユーザーのメールアドレスを照合し、管理者以外が管理画面や更新処理を利用できないようにしています。

### Markdownの表示

記事本文はMarkdown形式でデータベースに保存します。

表示時に`react-markdown`でReactコンポーネントへ変換し、`remark-gfm`によって表や取り消し線などのGitHub Flavored Markdownにも対応しています。

Markdown内のHTMLは解釈しない構成にしています。

### データベース設計

記事とカテゴリーは多対一、記事とタグは多対多の関係として設計しています。

カテゴリーとタグは独立したモデルとして管理し、記事作成・編集時に関連付けます。

## ディレクトリ構成

```text
app/
├── admin/          管理画面
├── api/auth/       Auth.jsのRoute Handler
├── login/          ログイン画面
├── posts/          一般ユーザー向け記事詳細
├── layout.tsx      共通レイアウト
└── page.tsx        トップページ

components/
└── MarkdownView.tsx

lib/
├── auth.ts         管理者認可
├── categories.ts   カテゴリーのDB操作
├── posts.ts        記事のDB操作
├── prisma.ts       Prisma Client
├── tags.ts         タグのDB操作
└── validation.ts   Zodスキーマ

prisma/
├── migrations/
└── schema.prisma

docs/
├── devlog.md
├── requirements.md
└── setup.md
```

## ローカル開発

環境構築に必要な手順と環境変数については、[開発環境構築手順](docs/setup.md)を参照してください。

## ドキュメント

- [要件定義](docs/requirements.md)
- [開発環境構築手順](docs/setup.md)
- [開発ログ](docs/devlog.md)

## 今後の改善予定

- 公開画面のデザイン調整
- プロフィールページ
- ポートフォリオページ
- 問い合わせページ
- エラーページ
- テストコード

## Author

[koyachito](https://github.com/koyachito)