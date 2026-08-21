import { signOut } from "@/auth";
import { requireAdmin } from "@/lib/auth";
import { getPosts } from "@/lib/posts"
import Link from "next/link";
import DeletePostButton from "./DeletePostButton";

export default async function AdminPage() {
    const session = await requireAdmin();
    const posts = await getPosts();

    return (
        <main>
            <h1>管理画面</h1>
            <p>
                ログイン中: {session.user?.email}
            </p>
            <p>
                ここから記事を管理できます。
            </p>
            <form
                action={async () => {
                    "use server";
                    await signOut({
                        redirectTo: "/login",
                    });
                }}
            >
                <button type="submit">
                    ログアウト
                </button>
            </form>

            <h2>記事一覧</h2>

            <Link href="/admin/posts/new">
                新規作成
            </Link>
            
            {posts.length === 0 ? (
                <p>記事はまだありません</p>
            ) : (
                posts.map((post) => (
                    <article key={post.id}>
                        <h3>
                            {post.published ? (
                            <Link href={`/posts/${post.id}`}>
                            {post.title}
                            </Link>
                            ) : (
                                post.title
                            )}
                        </h3>

                        <p>
                            状態: 
                            {post.published
                                ? "公開"
                                : "下書き"}
                        </p>
                    
                        <p>
                            カテゴリー：
                            {post.category?.name ?? "なし"}
                        </p>

                        <p>
                            タグ：
                            {post.tags.length > 0
                                ? post.tags
                                    .map((tag) => tag.name)
                                    .join(", ")
                                : "なし"}
                        </p>

                        <Link href={`/admin/posts/${post.id}/edit`}>
                            編集
                        </Link>

                        <DeletePostButton
                            postId={post.id}
                            postTitle={post.title}
                        />
                    </article>
            ))
            )}
            <nav aria-label="分類管理">
                <p>
                    <Link href="/admin/categories">カテゴリー管理</Link>
                </p>
                <p>
                    <Link href="/admin/tags">タグ管理</Link>
                </p>
            </nav>
        </main>
    );
}