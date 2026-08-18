import { requireAdmin } from "@/lib/auth";
import NewPostForm from "./NewPostForm";

export default async function NewPostPage () {
    await requireAdmin();

    return (
        <main>
            <h1>新規記事作成</h1>

            <NewPostForm />
        </main>
    )
}