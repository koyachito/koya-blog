"use client";

import { useActionState } from "react";
import {
    handleCreateTagForPost,
} from "./actions";

export default function InlineTagCreateForm() {
    const [state, formAction, isPending] = useActionState(
        handleCreateTagForPost,
        {}
    );

    return (
        <form action={formAction}>
            <label htmlFor="new-tag-name">
                新しいタグ
            </label>

            <input
                id="new-tag-name"
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
                    : "タグを作成"}
            </button>
        </form>
    );
}