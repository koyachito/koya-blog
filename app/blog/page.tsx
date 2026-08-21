import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/lib/date";
import { getPublishedPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "開発や学習についての記事一覧です。",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main>
      <h1>Blog</h1>

      <p>開発や学習について記録しています。</p>

      {posts.length === 0 ? (
        <p>記事はまだありません。</p>
      ) : (
        posts.map((post) => (
          <article className="post-card" key={post.id}>
            <h2>
              <Link href={`/posts/${post.id}`}>
                {post.title}
              </Link>
            </h2>

            <p>
              カテゴリー：{post.category?.name ?? "なし"}
            </p>

            <p>
              タグ：
              {post.tags.length > 0
                ? post.tags.map((tag) => tag.name).join(", ")
                : "なし"}
            </p>

            <p>
              <time dateTime={post.createdAt.toISOString()}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </article>
        ))
      )}
    </main>
  );
}