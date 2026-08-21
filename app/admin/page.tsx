import { requireAdmin } from "@/lib/auth";
import { signOut } from "@/auth";
import Link from "next/link";
import { getPosts } from "@/lib/posts"
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

            {posts.map((post) => (
                <article key={post.id}>
                    <h3>
                        <Link href={`/posts/${post.id}`}>
                        {post.title}
                        </Link>
                    </h3>
                    
                    <Link href={`/admin/posts/${post.id}/edit`}>
                        編集
                    </Link>

                    <DeletePostButton
                        postId={post.id}
                        postTitle={post.title}
                    />
                </article>
            ))}

            <Link href="/admin/categories">カテゴリー管理</Link>
            <Link href="/admin/tags">タグ管理</Link>

        </main>
    );
}