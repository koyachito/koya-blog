import { getPost } from "@/lib/posts";
import MarkdownView from "@/components/MarkdownView";

type Props = {
    params: Promise<{ id: string }>;
};

export default async function PostPage({ params }: Props) {
    const { id } = await params;

    const post = await getPost(id);

    if(!post) {
        return <h1>記事が見つかりません</h1>;
    }

    return (
        <main>
            <h1>{post.title}</h1>
            <MarkdownView source={post.content} />
        </main>
    );
}