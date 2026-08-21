import type { Metadata } from "next";
import Image from "next/image";
import styles from "./projects.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "koyachitoが制作したWebアプリケーションとCプログラムを紹介します。",
};

export default function ProjectsPage() {
  return (
    <main className={styles.projects}>
      <header className="page-intro">
        <p className="eyebrow">Projects</p>
        <h1>制作物</h1>

        <p>
          新しい技術に興味を持ったら、WebやAIを使って調べ、
          実際に動くものとして形にし、完成まで持っていくことを
          大切にしています。
        </p>
      </header>

      <div className={styles.projectList}>
        <article
          className={`${styles.projectCard} ${styles.projectCardWide}`}
        >
          <div className={styles.projectContent}>
            <p className="eyebrow">TypeScript / Web CMS</p>
            <h2>koya-blog</h2>

            <p className={styles.summary}>
              TypeScriptとCRUDを学ぶために制作した、
              個人ブログ兼ポートフォリオサイトです。
            </p>

            <section>
              <h3>制作した理由</h3>

              <p>
                TypeScriptを使ったWeb開発を学び、
                データの作成・取得・更新・削除というCRUDの基本を
                一通り実装することを目的に制作しました。
              </p>
            </section>

            <section>
              <h3>取り組んだこと</h3>

              <p>
                記事管理だけでなく、Google OAuthによる認証、
                メールアドレスによる管理者認可、Markdown表示、
                カテゴリー・タグ管理、公開・下書き機能まで実装しました。
              </p>

              <p>
                AIの支援も利用しましたが、提示されたコードを
                そのまま採用せず、Webでも調査しながら、
                一行ずつ動作と役割を理解してから使用しました。
              </p>
            </section>

            <section>
              <h3>得られたこと</h3>

              <p>
                React、Next.js、データベース、認証・認可、
                デプロイまで、現代的なWebアプリケーション開発の流れを
                一通り経験できました。
              </p>

              <p>
                開発中に仕様を必要以上に拡大せず、
                定めた期限までにデプロイ可能な状態へ
                まとめることができました。
              </p>
            </section>

            <ul className={styles.technologyList}>
              <li>TypeScript</li>
              <li>Next.js</li>
              <li>React</li>
              <li>PostgreSQL</li>
              <li>Prisma</li>
              <li>Auth.js</li>
              <li>Docker</li>
              <li>Vercel</li>
            </ul>

            <div className={styles.projectLinks}>
              <a
                className="button-link"
                href="https://koyachito.com"
              >
                公開サイト
              </a>

              <a
                href="https://github.com/koyachito/koya-blog"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        </article>

        <article className={styles.projectCard}>
          <div className={styles.ramenGallery}>
            <div className={styles.ramenMainImage}>
              <Image
                className={styles.ramenImage}
                src="/projects/ramen1.png"
                alt="ラーメン免罪符の診断開始画面"
                fill
                sizes="(max-width: 850px) 100vw, 420px"
              />
            </div>

            <div className={styles.ramenSubImages}>
              <div className={styles.ramenSubImage}>
                <Image
                  className={styles.ramenImage}
                  src="/projects/ramen2.jpeg"
                  alt="シスターからの質問に回答する診断画面"
                  fill
                  sizes="(max-width: 850px) 50vw, 210px"
                />
              </div>

              <div className={styles.ramenSubImage}>
                <Image
                  className={styles.ramenImage}
                  src="/projects/ramen3.jpeg"
                  alt="ラーメンを食べることが赦された診断結果画面"
                  fill
                  sizes="(max-width: 850px) 50vw, 210px"
                />
              </div>
            </div>
          </div>

          <div className={styles.projectContent}>
            <p className="eyebrow">AI-assisted Web Application</p>
            <h2>ラーメン免罪符</h2>

            <p className={styles.summary}>
              今日ラーメンを食べてもよい理由を、
              シスターとの事情聴取を通して審議するジョークWebアプリです。
            </p>

            <section>
              <h3>制作した理由</h3>

              <p>
                AIを主体とした開発手法、いわゆるバイブコーディングを
                実際に試し、アプリを企画から公開まで完成させることを
                目的に制作しました。
              </p>
            </section>

            <section>
              <h3>取り組んだこと</h3>

              <p>
                Codexを実装に活用しながら、コンセプト、仕様、
                世界観、文言、実装範囲、リリース可否を自分で判断しました。
              </p>

              <p>
                AIの提案が当初の仕様から外れたり、
                必要以上に機能が増えたりすることもありました。
                その都度、採用・修正・撤回を判断し、
                アプリの目的に合う形へ調整しました。
              </p>

              <p>
                公開後は友人11人に実際に試してもらい、
                操作感や文言についてのフィードバックを受け、
                質問フロー、判定、表示などを改善しました。
              </p>
            </section>

            <section>
              <h3>得られたこと</h3>

              <p>
                AIへ実装を依頼するだけでなく、仕様を管理し、
                出力を検証し、利用者の反応をもとに改善するという
                アプリ開発の流れを経験できました。
              </p>
            </section>

            <ul className={styles.technologyList}>
              <li>Python</li>
              <li>FastAPI</li>
              <li>Jinja2</li>
              <li>JavaScript</li>
              <li>SQLite</li>
              <li>pytest</li>
              <li>Render</li>
              <li>Codex</li>
            </ul>

            <div className={styles.projectLinks}>
              <a
                className="button-link"
                href="https://ramen-indulgence.onrender.com/"
                target="_blank"
                rel="noreferrer"
              >
                アプリを試す
              </a>

              <a
                href="https://github.com/koyachito/ramen_indulgence"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>

            <p className={styles.note}>
              初回アクセス時は、起動に時間がかかる場合があります。
            </p>
          </div>
        </article>

        <article className={styles.projectCard}>
          <div
            className={`${styles.projectMedia} ${styles.projectMediaContain}`}
          >
            <Image
              className={styles.projectImage}
              src="/projects/catt-demo.gif"
              alt="猫がターミナル上を歩くcattコマンドの実行画面"
              fill
              unoptimized
              sizes="(max-width: 850px) 100vw, 420px"
            />
          </div>

          <div className={styles.projectContent}>
            <p className="eyebrow">C / CLI</p>
            <h2>catt</h2>

            <p className={styles.summary}>
              実行するとASCIIアートの猫がターミナル上を歩く、
              Cで制作したジョークCLIコマンドです。
            </p>

            <section>
              <h3>制作した理由</h3>

              <p>
                C言語を学ぶことになり、文法を練習するだけではなく、
                自分が実際に使って楽しめるものを作りながら
                学習したいと考えて制作しました。
              </p>
            </section>

            <section>
              <h3>取り組んだこと</h3>

              <p>
                ncursesによる画面制御、複数フレームによる歩行表現、
                画面外にはみ出す文字の安全な描画、
                Makefileによるビルドとインストール処理を実装しました。
              </p>

              <p>
                既存のターミナルコマンドであるslの構成を参考にしつつ、
                設計と実装はほぼ自力で行いました。
              </p>
            </section>

            <section>
              <h3>得られたこと</h3>

              <p>
                Cの基本文法だけでなく、関数への責務分割、
                画面サイズを考慮した境界処理、ヘッダーファイル、
                Makefileを使ったビルドの基礎を学びました。
              </p>
            </section>

            <ul className={styles.technologyList}>
              <li>C</li>
              <li>ncurses</li>
              <li>Makefile</li>
              <li>GitHub Actions</li>
            </ul>

            <div className={styles.projectLinks}>
              <a
                className="button-link"
                href="https://github.com/koyachito/catt"
                target="_blank"
                rel="noreferrer"
              >
                GitHubを見る
              </a>
            </div>
          </div>
        </article>
      </div>
    </main>
  );
}