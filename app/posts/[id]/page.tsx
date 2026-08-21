import Link from "next/link";
import { notFound } from "next/navigation";
import MarkdownView from "@/components/MarkdownView";
import { formatDate } from "@/lib/date";
import { getPost } from "@/lib/posts";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
    const { id } = await params;

    const post = await getPost(id);

    if(!post) {
        notFound();
    }

    return (
        <main>
            <p>
                <Link href="/">
                    記事一覧に戻る
                </Link>
            </p>
            <article>
                <h1>{post.title}</h1>
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
                <p>
                    作成日時：
                    <time dateTime={post.createdAt.toISOString()}>
                        {formatDate(post.createdAt)}
                    </time>
                </p>
                <p>
                    更新日時：
                    <time dateTime={post.updatedAt.toISOString()}>
                        {formatDate(post.updatedAt)}
                    </time>
                </p>
                <MarkdownView source={post.content} />
            </article>
        </main>
    );
}