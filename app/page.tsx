import Link from "next/link";
import { formatDate } from "@/lib/date";
import { getLatestPublishedPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const posts = await getLatestPublishedPosts(3);

  return (
    <main className="home">
      <section className="hero">
        <p className="eyebrow">
          Portfolio & Dev Blog
        </p>

        <h1>koyachito</h1>

        <p className="hero-description">
          Webエンジニアを目指して、TypeScriptやNext.jsを中心に
          Web開発を学んでいます。制作物と学習記録を掲載しています。
        </p>

        <div className="hero-links">
          <Link className="button-link" href="/projects">
            制作物を見る
          </Link>

          <Link className="text-link" href="/about">
            プロフィールを見る
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <h2>Latest posts</h2>

          <Link href="/blog">
            すべての記事を見る
          </Link>
        </div>

        {posts.length === 0 ? (
          <p>記事はまだありません。</p>
        ) : (
          <div className="post-list">
            {posts.map((post) => (
              <article className="post-card" key={post.id}>
                <h3>
                  <Link href={`/posts/${post.id}`}>
                    {post.title}
                  </Link>
                </h3>

                <p>
                  カテゴリー：{post.category?.name ?? "なし"}
                </p>

                <p>
                  <time dateTime={post.createdAt.toISOString()}>
                    {formatDate(post.createdAt)}
                  </time>
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}