import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getTags } from "@/lib/tags";
import TagCreateForm from "./TagCreateForm";
import TagEditForm from "./TagEditForm";
import DeleteTagButton from "./DeleteTagButton";

export default async function TagsPage(){
    await requireAdmin();

    const tags = await getTags();

    return (
        <main>
            <h1>タグ管理</h1>
            <p>
                <Link href="/admin">管理画面に戻る</Link>
            </p>

            <section>
                <h2>新規作成</h2>
                <TagCreateForm />
            </section>

            <section>
                <h2>タグ一覧</h2>

                {tags.length === 0 ? (
                    <p>タグはまだありません</p>
                ) : (
                    <ul>
                        {tags.map((tag) => (
                            <li key={tag.id}>
                                <p>{tag.name}</p>
                                
                                <TagEditForm
                                    tagId={tag.id}
                                    tagName={tag.name}
                                />

                                <DeleteTagButton
                                    tagId={tag.id}
                                    tagName={tag.name}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}