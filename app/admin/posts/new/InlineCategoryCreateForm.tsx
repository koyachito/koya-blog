"use client";

import { useActionState } from "react";
import {
    handleCreateCategoryForPost,
} from "./actions";

export default function InlineCategoryCreateForm() {
    const [state, formAction, isPending] = useActionState(
        handleCreateCategoryForPost,
        {}
    );

    return (
        <form action={formAction}>
            <label htmlFor="new-category-name">
                新しいカテゴリー
            </label>

            <input
                id="new-category-name"
                name="name"
                type="text"
                maxLength={30}
                required
            />

            {state.error && (
                <p role="alert">
                    {state.error}
                </p>
            )}

            {state.message && (
                <p role="status">
                    {state.message}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending
                    ? "作成中..."
                    : "カテゴリーを作成"}
            </button>
        </form>
    );
}