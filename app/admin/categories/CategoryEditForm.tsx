"use client";

import { useActionState } from "react";
import { handleUpdateCategory } from "./actions";

type Props = {
    categoryId: string;
    categoryName: string;
};

export default function CategoryEditForm({
    categoryId,
    categoryName,
}: Props) {
    const [state, formAction, isPending] = useActionState(
        handleUpdateCategory,
        {}
    );

    return (
        <form action={formAction}>
            <input
                type="hidden"
                name="id"
                value={categoryId}
            />

            <label htmlFor={`category-${categoryId}`}>
                カテゴリー名
            </label>

            <input
                id={`category-${categoryId}`}
                name="name"
                type="text"
                defaultValue={categoryName}
                maxLength={30}
                required
            />

            {state.error && (
                <p role="alert">
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "変更中..." : "名前を変更"}
            </button>
        </form>
    );
}