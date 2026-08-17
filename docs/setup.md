# 開発環境構築手順
## 前提
以下がインストールされていることを前提とする。

- Git
- Node.js
- npm
- Docker / Docker Compose

バージョン確認：

```bash
git --version
node --version
npm --version
docker --version
docker compose version
```

1. リポジトリ取得
git clone git@github.com:koyachito/koya-blog.git
cd koya-blog

2. 依存パッケージ
npm ci

バージョン確認:
npx next --version
npx prisma --version
npx tsc --version
npx tsx --version


3. 環境変数
cp .env.example .env
.envを環境に合わせて設定する

4. PostgreSQL
docker compose up -d
docker compose ps

5. Prisma
npx prisma generate
npx prisma migrate dev

6. Auth.js
npm instakk next-auth