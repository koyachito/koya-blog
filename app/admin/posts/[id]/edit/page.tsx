import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getPost } from "@/lib/posts";
import EditPostForm from "./EditPostForm";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditPostPage({ params }: Props){
    await requireAdmin();

    const { id } = await params;

    const post = await getPost(id);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <h1>記事編集</h1>

            <EditPostForm post={post} />
        </main>
    )
}