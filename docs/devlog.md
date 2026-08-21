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
    - Markdown内でHTMLタグを使用しない仕様にしたため、別途HTMLサニタイズ処理を行う要件を削除
    - Markdown内でHTMLタグを使わない旨明記
    - 認証要件について、パスワード認証を採用する場合にのみパスワードハッシュ化が必要になるため、特定の認証方式に依存しない形に修
- 開発環境構築手順書の作成
- 要件変更により使用しなくなったパッケージをアンインストール
- Auth.jsの導入
- OAuthの導入
- /admin, /login, /403ページの実装
- OAuthによる/adminへのアクセス認可の実装
- 未ログイン、権限のないユーザー、管理者それぞれのアクセス制御を確認
- ログアウト処理の実装

### 学び
- GitHub Codespacesで開発しているため、ブラウザからアクセスするURLと、Codespace内部でNext.jsが動作しているURLが異なる
- OAuthやServer Actionsでは、このURLの違いによって追加設定が必要になる場合がある
- Auth.jsの認証とNext.jsのServer Actionsは別の仕組みとして動作している

詰まったところ

Auth.js実装時にhandlersがundefinedになる

* next-auth@4.24.15がインストールされていた
* v4とv5ではAuth.jsのAPIが異なり、handlersを使用する現在の実装はv5向けだった
* npm install next-auth@betaでv5へ更新
* auth.tsの実装例をそのまま使用したため、インストールされているバージョンとの違いに気づかなかった

Auth.jsでMissingSecretエラー

* /api/auth/providersへアクセスしたところ、MissingSecretが発生
* Google OAuthのAUTH_GOOGLE_SECRETとは別に、Auth.js自身が使用するSecretが必要だった
* npx auth secretでSecretを生成して.envに設定

Auth.jsのSecret設定

* npx auth secretで生成された環境変数名がBETTER_AUTH_SECRETになっていた
* 今回はAuth.jsを使用しているため、AUTH_SECRETとして.envに設定
* /api/auth/providersにアクセスし、Google Providerの情報がJSONで返ることを確認

CodespacesでOAuthのURLがlocalhostになる

* Auth.jsがOAuthのsigninUrl、callbackUrlをlocalhost:3000として生成していた
* Codespacesの外部URLをAuth.jsに設定
* Google Cloud側にもCodespacesのURLを設定
* Google OAuthによるログインを確認

GitHub CodespacesでServer Actionsが実行できない

* 管理画面にログアウト用のServer Actionを実装したところ、Invalid Server Actions request.が発生
* 最初はAuth.jsのsignOut()が原因だと考えた
* signOut()を外して最小のServer Actionにしても同じエラーが発生したため、Auth.jsではなくServer Actions自体の問題だと切り分けた
* Codespacesではブラウザからアクセスする*.app.github.devと、Codespace内部のlocalhost:3000が異なる
* Next.jsのServer ActionsにはOrigin/Hostに関するセキュリティチェックがあり、Codespacesのポートフォワーディングによるホストの違いでリクエストが拒否されていた
* next.config.tsにServer ActionsのallowedOriginsを設定
* .nextを削除してNext.jsを再起動することで正常に動作した

デバッグの流れ

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
- /adminへの記事CRUD実装
- /adminへのアクセス制限だけでなく、Server Action側にもrequireAdmin()を実装する


## Day6 - 2026/08/18
### 実施したこと
- 管理画面の記事CRUDを実装
    - Create：新規記事作成
    - Read：記事一覧表示
    - Update：記事編集
    - Delete：記事削除
- Server Actionを利用したフォーム処理を実装
- Zodによるサーバー側バリデーションを実装
- `useActionState` を利用してServer Actionの結果をClient Componentで処理
- 記事削除時の確認UIを実装
- 存在しない記事IDに対して404を返す処理を実装
- `npm run dev` でCRUDの正常系動作を確認
- env.exampleの追加

### 学び
- Server ComponentとClient Componentの役割
    - Server Component：サーバー側でデータ取得などを行う
    - Client Component：ブラウザ側で状態管理やイベント処理を行う
- Server Action
    - フォームから送信されたデータをサーバー側で処理できる
    - `FormData` からフォームの入力値を取得し、Prismaを通してDBを更新する
- `useActionState`
    - Server Actionの実行結果をClient Component側で受け取り、エラー表示などのUIに反映できる
- `useState`
    - 削除確認UIの表示・非表示など、Client Component内の状態を管理する
- HTMLの`required`とZodの役割の違い
    - `required`：ブラウザ上での入力チェック
    - Zod：サーバー側での入力値の検証
- `notFound()`を利用して、存在しない記事IDへのアクセスを404として処理できる

### 詰まったところ

#### Prisma依存パッケージの脆弱性
- `npm audit` で `deepmerge-ts < 8.0.0` にHigh severityの脆弱性を検出。
- `deepmerge-ts` は Prisma → `@prisma/config` 経由の間接依存で、現在使用している Prisma 7.9.1 および最新の `@prisma/config` でも `deepmerge-ts 7.1.5` が指定されている。
- `npm audit fix --force` では Prisma 6.12.0 へのダウングレードが提案されるため、今回は実行せず保留。
- 現時点では自分で直接アップデートできる依存関係ではないため、Prisma側で依存関係が更新された際に対応する。

### 次にやること
- Markdown記事の表示・編集フローの確認
- 管理画面のUI改善

## Day7 - 2026/08/19
### 実施したこと
### 学び
### 詰まったところ
- prisma.post.findMany() で500エラー
- P1001: Can't reach database server at localhost:5432
- docker compose up -d をやり直したところ解消

### 学んだこと
- Prismaのエラーが出た場合でも、必ずしもPrismaやクエリが原因とは限らない。

今回のようなDBアクセスのエラーでは、

1. DBコンテナが起動しているか
2. localhost:5432 に接続できるか
3. DATABASE_URL が正しいか
4. その上でPrismaのschemaやクエリを確認する

という順番で切り分けるとよい。

## Day8 - 2026/08/20
### 実施したこと
- Categoryを任意設定に変更し、migrationを適用
- CategoryのDB操作・入力検証を実装
- 管理画面にCategoryの作成・一覧表示を追加

### 学び
- 任意relationでは外部キーとrelation fieldの両方に?が必要
- Server Action内でも認可が必要
- onDelete: Restrictで使用中Categoryの削除をDB側でも防げる

### 詰まったところ
- @relation()の複数行記述でvalidation errorが発生し、1行にして解決

