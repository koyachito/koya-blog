import Link from "next/link";
import { getPosts } from "@/lib/posts";

export default async function Home() {
  const posts = await getPosts();
  
  return (
    <main>
      <h1>記事一覧</h1>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>
            <Link href={`/posts/${post.id}`}>
              {post.title}
            </Link>
          </h2>
        </article>
      ))}
    </main>
  );
}