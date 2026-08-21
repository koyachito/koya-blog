"use client";

import { useActionState } from "react";
import { handleCreateCategory } from "./actions";

export default function CategoryCreateForm() {
    const [state, formAction, isPending] = useActionState(
        handleCreateCategory,
        {}
    );

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="category-name">
                    カテゴリー名
                </label>

                <input
                    id="category-name"
                    name="name"
                    type="text"
                    maxLength={30}
                    required
                />
            </div>

            {state.error && (
                <p role="alert">
                    {state.error}
                </p>
            )}

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "作成中..." : "作成"}
            </button>
        </form>
    );
}