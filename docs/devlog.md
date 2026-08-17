# dev-log
## 目的
このログでは，koya-blogの開発過程を記録する。
単なる作業記録ではなく，

- 何を実施したか
- なぜ実施したか
- どのコマンド・設定を使ったか
- 実行によって何が起きるか
- 技術的に何を理解したか
- どのような判断をしたか
- どのような問題が発生したか

を記録し，後から自分で開発内容を説明できる状態にする。

## Day1 - 2026/08/12
### 実施したこと
- `npx create-next-app@latest koya-blog`
- TypeScript, ESLint, React Compiler, App RouterをYesにした
- `app/page.tsx`,`app/layout.tsx`,`globals.css`,`page.module.css`を読んだ
- 簡潔なREADME.md初版を書いた

### 学び
- 今回はCSS凝らないのでTailwindはなし
- page.tsx
    - export default function Home()の戻り値がJSX
    - CSS Moduleのクラスとしてstyles.pageを読み込んでいる
    - next/imageのImageコンポーネントを読み込んでいる
- layout.tsx
    - RootLayoutで各ページを共通のHTML構造で包む
    - LayoutProps<"/">型のオブジェクトを受け取り，childrenプロパティを取り出して変数に（分割代入）
    - metadata
    - next/font/googleからGoogle FontsのGeistを使用
- globals.cssで全体，pages.module.cssでページごとのスタイルを作る

### 詰まったところ
- 初期設定でどれを入れるか・入れないかの判断はやや時間がかかった

### 次にやること
- 要件定義
- 環境構築の続き
    - Docker Compose
    - Prisma
    - PostgreSQLとの接続

## Day2 - 2026/08/13
### 実施したこと
- docs/requirements
- docker
    - docker-compose.yaml
    - docker compose up -d
    - docker compose ps
- prisma
    - npx prisma init
    - .env, .env.example, schema.prismaの変更
    - npx prisma migrate dev --name init

### 学び
- 要件定義
    - 開発途中でブレないように要件を定義，Geminiなどを使ってブラッシュアップ
- DockerによるDBコンテナ構築
    - ローカル環境に直接PostgreSQLをインストールせず，コンテナ上に独立したDB環境を構築。
    - 開発環境が汚染されないことと，チーム開発でも同一環境が再現できるのが強み
    - `-d`オプションでバックグラウンドで常駐実行
    - `ps`で確認
- Prismaセットアップ，DB接続
    - ORM(Object Relational Mapping): TypeScriptとDB構造を自動で対応づけ、SQLを書かずにTypeScriptからDBを叩けるようにする
    - `.env`でデータベース接続情報などの機密情報を管理，`.gitignore`に含める
    - `compose.yaml`の方ではなく`.env`にDB接続情報を書き，変数で管理
    - `.env.example`は環境構築把握のためのもの，githubコミットする
    - `schema.prisma`でデータベースのテーブル構造（モデル），リレーションを定義
        - 今回はPostとTagの多対多リレーションを定義
    - マイグレーション: `schema.prisma`の差分を検出して，`prisma/migrations`にSQLを自動生成し，DBへ適応
        - 正確にはDDL: データ定義言語によってテーブルの作成や変更が行われる。SQL命令
        - `schema.prisma`の変更・保存だけではPostgreSQL内部のテーブル構造は変更されない。マイグレーションを行なって初めてSQL命令が実行され，テーブルが追加・変更される
        - テーブルや列，インデックスが実際に作成される
        - `_prisma_migrations`テーブルでどのマイグレーションファイルがいつ適応されたかメタデータを保存する
    - 多対多リレーションの場合，中間テーブル(Junction Table)を作成
        - 今回の場合だとPostテーブルのidとTagテーブルidのペアを保存する_PostTagsテーブルを作成

### 詰まったところ
- 要件定義時の具体的な技術選定は，初めてのTyoeScriptプロジェクトということもあり知識が乏しく，インターネット検索で記事を調べたりAIに聞いたりして最適なサービスを探すのに時間がかかった
- 当初compose.yamlに DB情報をハードコーディングしてしまっていたのでセキュリティ的に危険な状態だった

### 次にやること
- MarkdownからHTMLに変換・サニタイズする関数の作成

## Day3 - 2026/08/14
### 実施したこと
- npm install react-markdown remark-gfm rehype-sanitize rehype-raw rehype-slug
    - 以下を参考にした
    https://www.issoh.co.jp/tech/details/3660/
- とりあえずMarkdown内のHTMLタグ実装は後回しでいいかも

### 学び
- JSXエスケープをデフォルトでやるreact-markdown便利
- 仕様を削ったことでより安全になった
- 別のブランチでnpm installした場合はmainでnpm ciしないとダメ

### 詰まったところ
- 戻り値を整理するのがやや混乱した

### 次にやること
- CRUD処理
- まずはRead -> Create -> Delete, Update
- これが参考になりそう
https://mikoto2000.blogspot.com/2025/01/prisma-typescript-postgresql.html

## Day4 - 2026/08/16
### 実施したこと
- `lib/posts.ts`でCRUD処理を実装
- `scripts/test-posts.ts`で動作確認
- Prisma 7のPostgreSQL用Driver Adapter `PrismaPg`を導入

### 学び
- ORMが便利すぎる，Prismaを使うことでSQLを直接書かなくてもTSからCRUDを簡潔に実装できる
- Prisma Clientま`schema.prisma`から生成される
- Prisma 7ではPostgreSQLへの接続にDriver Adapterが必要

### 詰まったところ
1. Prisma Clientが見つからない
- `npx tsc --noEmit`したら`lib/prisma.ts`のPrismaClientがないとエラーが出た
- schema.prismaからPrisma Clientが生成されてなかった
    - `npx prisma generate`でClientのコードを生成
    - npx tsc --noEmitで解決を確認

2. docker compose psがエラー("invalid proto:")
    - compose.yamlでvolume:を書き忘れ, portsの方に書いてしまっていた

3. TypeScriptのテスト実行環境
- npm install -D tsx
    - npx installではない

4. Prisma 7でPrismaClientの初期化に失敗
- new PrismaClient()で初期化したところ，
- PrismaClientInitializationError: PrismaClient was instantiated without any options. A driver adapter is required to connect to your database.
というエラーが出た

- Prisma 7ではPostgreSQLへの接続にDriver Adapterが必要

- アダプターをインストール
    - `npm install @prisma/adapter-pg pg`
    - prisma/schema.prismaを`prisma-client-js`から`prisma-client`に修正，保存先をgenerated/prismaに
    - lib/prisma.tsでPrismaPgを導入
        - .envのDATABASE_URLが存在することをチェック
    - npx prisma generateを再生成
    - npx tsc --noEmitで型チェック
    - npx scripts/test-posts.tsでCRUD動作を確認

### 次にやること
- Next.jsからgetPosts()を呼び出して記事一覧を表示
- getPost()を使って記事詳細を表示
- 管理画面からCRUD操作ができるようにする


## Day5 - 2026/08/17
### 実施したこと
- `docs/requirements`の修正
    - サニタイズ要件の削除（react-markdownのため不必要に)
    - Markdown内でHTMLタグを使わない旨明記
    - 認証要件，パスワードのハッシュ化は場合によっては必要ないので技術選定に関わらない形に書き直し
- 開発環境構築手順書の作成
- 要件変更により使用しなくなったパッケージをアンインストール

### 学び
### 詰まったところ
### 詰まったところ
- Auth.js実装時に`handlers`が`undefined`になるエラー
    - `next-auth@4.24.15`がインストールされていた
    - v4とv5ではAuth.jsのAPIが異なり，`handlers`を使用する現在の実装はv5向けだった
    - `npm install next-auth@beta`でv5へ更新
    - `auth.ts`の実装例をそのまま使ったため，インストールされているバージョンとの違いに気づかなかった
- Auth.jsでMissingSecretエラー
    - `/api/auth/providers`へアクセスしたところ`MissingSecret`が発生
    - Google OAuthの`AUTH_GOOGLE_SECRET`とは別に，Auth.js自身の`AUTH_SECRET`が必要
    - `npx auth secret`で`BETTER_AUTH_SECRET`を生成し`.env`に設定

- Auth.jsのSecret設定
    -  `npx auth secret`で生成した環境変数名が`BETTER_AUTH_SECRET`になっていた
    - 今回はAuth.jsを使用しているため，`AUTH_SECRET`として`.env`に設定
    - `/api/auth/providers`にアクセスし，Google Providerの情報がJSONで返ることを確認

- CodespacesでOAuthのURLがlocalhostになる
    - Auth.jsがOAuthの`signinUrl`，`callbackUrl`を`localhost:3000`として生成
    - Codespacesの外部URLをAuth.jsに設定
    - Google Cloud側にもCodespacesのURLを設定
    - Google OAuthによるログインを確認
## GitHub CodespacesでServer Actionsが実行できない問題

### 症状

管理画面にログアウト用のServer Actionを実装したところ、以下のエラーが発生した。

Invalid Server Actions request.

Next.js:
16.3.0 (Turbopack)

### 切り分け

最初はAuth.jsのsignOut()が原因だと考えた。

しかし、signOut()を外して最小のServer Actionにしても同じエラーが発生した。

"use server";

export async function testAction() {
    console.log("Server Action executed");
}

このことから、signOut()ではなくServer Actions自体に問題があると判断した。

### 原因

今回の開発環境はGitHub Codespacesを使用している。

Codespace内部ではNext.jsがlocalhost:3000で動作しているが、ブラウザからは以下のようなGitHub Codespacesの転送URLからアクセスしている。

https://xxxxx-3000.app.github.dev

つまり、

ブラウザ
↓
https://xxxxx-3000.app.github.dev
↓
GitHub Codespacesのポートフォワーディング
↓
localhost:3000
↓
Next.js

という構成になっている。

Next.jsのServer ActionsにはOrigin/Hostに関するセキュリティチェックがあるため、Codespacesのポートフォワーディングによって外部URLと内部のホスト情報が異なることで、Server Actionのリクエストが拒否されていた。

### Auth.jsの設定との違い

.envには以下を設定していた。

AUTH_TRUST_HOST=true
AUTH_URL=https://xxxxx-3000.app.github.dev

しかし、これらはAuth.js側の設定であり、Next.jsのServer ActionsのOrigin検証とは別の仕組みだった。

そのため、Google OAuthによるログインは正常に動作していたが、Server Actionsだけがエラーになっていた。

### 解決

next.config.tsにServer Actionsの許可Originを追加した。

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactCompiler: true,

    experimental: {
        serverActions: {
            allowedOrigins: [
                "localhost:3000",
                "*.app.github.dev",
                "*.github.dev",
                "*.githubpreview.dev",
            ],
        },
    },
};

export default nextConfig;

設定変更後、.nextを削除してNext.jsを再起動した。

rm -rf .next
npm run dev

その後、最小のServer Actionを実行したところ正常に動作した。

### 学んだこと

・GitHub Codespacesでは、アプリ内部のURLとブラウザからアクセスするURLが異なる
・ポートフォワーディングによってlocalhost:3000が*.app.github.devとして公開される
・Auth.jsのAUTH_URL / AUTH_TRUST_HOSTと、Next.js Server ActionsのOrigin検証は別の仕組み
・エラーが発生したライブラリをすぐに原因と決めつけず、最小構成にして切り分けることが重要
・signOut()を外してもエラーが再現したことで、Auth.jsを原因から除外できた
・最小のServer Actionでもエラーが発生したため、Next.jsおよびCodespacesの環境側を調査して解決した

### デバッグの流れ

signOut()でエラー
↓
signOut()を外してもエラー
↓
最小のServer Actionでもエラー
↓
Auth.jsが原因ではないと判断
↓
Next.js Server Actions側を調査
↓
CodespacesのポートフォワーディングによるOrigin/Hostの違いを確認
↓
allowedOriginsを設定
↓
解決


### 次にやること

## Day6 - 2026/08/18
### 実施したこと
### 学び
### 詰まったところ
### 次にやること

## Day7 - 2026/08/19
### 実施したこと
### 学び
### 詰まったところ
### 次にやること
