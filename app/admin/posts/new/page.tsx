import { requireAdmin } from "@/lib/auth";
import { getCategories } from "@/lib/categories";
import { getTags } from "@/lib/tags";
import InlineCategoryCreateForm from "./InlineCategoryCreateForm";
import InlineTagCreateForm from "./InlineTagCreateForm";
import NewPostForm from "./NewPostForm";

export default async function NewPostPage () {
    await requireAdmin();

    const [categories, tags] = await Promise.all([
        getCategories(),
        getTags(),
    ]);

    return (
        <main>
            <h1>新規記事作成</h1>

            <section>
                <h2>カテゴリーを追加</h2>
                <InlineCategoryCreateForm />
            </section>

            <section>
                <h2>タグを追加</h2>
                <InlineTagCreateForm />
            </section>

            <section>
                <h2>記事内容</h2>
                <NewPostForm
                    categories={categories}
                    tags={tags}
                />
            </section>
        </main>
    );
}