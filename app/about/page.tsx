import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description: "koyachitoの経歴、強み、学習中の技術について紹介します。",
};

export default function AboutPage() {
  return (
    <main className="about">
      <header className="page-intro">
        <p className="eyebrow">About</p>
        <h1>プロフィール</h1>

        <p>
          文系分野での学習・実務経験と語学力を生かしながら、
          Webエンジニアを目指してソフトウェア開発を学んでいます。
        </p>
      </header>

      <section className="about-section">
        <h2>現在</h2>

        <p>
          TypeScript、Next.js、PostgreSQLなどを使用した
          Webアプリケーション開発に取り組んでいます。
        </p>

        <p>
          2026年8月から42TokyoのPiscineに参加し、
          C言語、Linux、Git、チームでの相互レビューを通じて、
          コンピューターサイエンスとソフトウェア開発の基礎を学びます。
        </p>
      </section>

      <section className="about-section">
        <h2>経歴</h2>

        <div className="timeline">
          <article className="timeline-item">
            <p className="timeline-period">2019–2024</p>
            <div>
              <h3>早稲田大学 文化構想学部</h3>
              <p>
                文化、社会、言語などの人文・社会科学分野を学びました。
              </p>
            </div>
          </article>

          <article className="timeline-item">
            <p className="timeline-period">2024</p>
            <div>
              <h3>出版社</h3>
              <p>
                営業職として、書店や取引先への提案と調整を担当しました。
              </p>
            </div>
          </article>

          <article className="timeline-item">
            <p className="timeline-period">2025</p>
            <div>
              <h3>政策調査・広報補助</h3>
              <p>
                調査資料や答弁素案の作成、会議運営、
                NotionやGoogle Apps Scriptを使った業務改善に取り組みました。
              </p>
            </div>
          </article>

          <article className="timeline-item">
            <p className="timeline-period">2025–2026</p>
            <div>
              <h3>メキシコ留学</h3>
              <p>
                メキシコ国立自治大学の語学教育機関で、
                スペイン語とメキシコの社会・文化について学びました。
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="about-section">
        <h2>技術</h2>

        <div className="about-grid">
          <article className="about-card">
            <h3>制作で使用</h3>
            <ul>
              <li>TypeScript / JavaScript</li>
              <li>Next.js / React / Node.js</li>
              <li>PostgreSQL / Prisma</li>
              <li>Docker / Git / GitHub</li>
              <li>Vercel / Neon / Cloudflare</li>
            </ul>
          </article>

          <article className="about-card">
            <h3>学習中</h3>
            <ul>
              <li>C</li>
              <li>Linux / Bash</li>
              <li>データ構造とアルゴリズム</li>
              <li>Webバックエンド</li>
              <li>インフラ基礎</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="about-section">
        <h2>語学</h2>

        <ul>
          <li>英語：TOEIC 920</li>
          <li>スペイン語：SIELE B2</li>
          <li>日本語：母語</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>強み</h2>

        <ul>
          <li>複雑な情報を整理し、文章や資料にまとめること</li>
          <li>異なる専門や文化的背景を持つ相手とのコミュニケーション</li>
          <li>必要な技術を調べ、動くものとして実装すること</li>
          <li>ツールを導入し、作業手順を改善すること</li>
        </ul>
      </section>

      <nav className="page-links" aria-label="関連ページ">
        <Link className="button-link" href="/projects">
          制作物を見る
        </Link>

        <Link className="text-link" href="/blog">
          ブログを読む
        </Link>
      </nav>
    </main>
  );
}