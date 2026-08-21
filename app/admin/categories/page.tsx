import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getCategories } from "@/lib/categories";
import CategoryCreateForm from "./CategoryCreateForm";
import CategoryEditForm from "./CategoryEditForm";
import DeleteCategoryButton from "./DeleteCategoryButton";

export default async function CategoriesPage(){
    await requireAdmin();

    const categories = await getCategories();

    return (
        <main>
            <h1>カテゴリー管理</h1>
            <p>
                <Link href="/admin">管理画面に戻る</Link>
            </p>

            <section>
                <h2>新規作成</h2>
                <CategoryCreateForm />
            </section>

            <section>
                <h2>カテゴリー一覧</h2>

                {categories.length === 0 ? (
                    <p>カテゴリーはまだありません</p>
                ) : (
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <p>{category.name}</p>
                                
                                <CategoryEditForm
                                    categoryId={category.id}
                                    categoryName={category.name}
                                />

                                <DeleteCategoryButton
                                    categoryId={category.id}
                                    categoryName={category.name}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </section>
        </main>
    );
}