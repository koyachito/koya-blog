import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { getCategories } from "@/lib/categories";
import { getPost } from "@/lib/posts";
import { getTags } from "@/lib/tags";
import EditPostForm from "./EditPostForm";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

export default async function EditPostPage({ params }: Props){
    await requireAdmin();

    const { id } = await params;

    const [post, categories, tags] = await Promise.all([
        getPost(id),
        getCategories(),
        getTags(),
    ]);

    if (!post) {
        notFound();
    }

    return (
        <main>
            <h1>記事編集</h1>

            <EditPostForm
                post={post}
                categories={categories}
                tags={tags}
            />
        </main>
    )
}