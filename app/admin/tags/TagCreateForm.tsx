"use client";

import { useActionState } from "react";
import { handleCreateTag } from "./actions";

export default function TagCreateForm() {
    const [state, formAction, isPending] = useActionState(
        handleCreateTag,
        {}
    );

    return (
        <form action={formAction}>
            <div>
                <label htmlFor="tag-name">
                    タグ名
                </label>

                <input
                    id="tag-name"
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