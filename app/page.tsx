import Link from "next/link";
import { formatDate } from "@/lib/date";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <main>
      <h1>記事一覧</h1>
      {posts.length === 0 ? (
        <p>記事はまだありません</p>
      ) : (
        posts.map((post) => (
          <article key={post.id}>
            <h2>
              <Link href={`/posts/${post.id}`}>{post.title}</Link>
            </h2>

            <p>カテゴリー: {post.category?.name ?? "なし"}</p>
            <p>
              タグ:
              {post.tags.length > 0
                ? post.tags
                    .map((tag) => tag.name)
                  .join(",")
                : "なし"}
            </p>
            <p>
              作成日時:
              <time
                dateTime={
                  post.createdAt.toISOString()
                }
              >{formatDate(post.createdAt)}</time>
            </p>
          </article>
        ))
      )}
    </main>
  );
}