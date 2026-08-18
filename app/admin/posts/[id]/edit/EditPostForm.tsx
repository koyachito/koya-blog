"use client";

import { useActionState } from "react";
import { handleUpdate } from "./actions";

type Props = {
    post: {
        id: string;
        title: string;
        content: string;
    };
};

export default function EditPostForm({ post }: Props) {
    const [state, formAction, isPending] = useActionState(
        handleUpdate,
        {}
    );

    return (
        <form action={formAction}>
            <input
                type="hidden"
                name="id"
                value={post.id}
            />
            {state.error && (
                <p role="alert">
                    {state.error}
                </p>
            )}
            <div>
                <label htmlFor="title">タイトル</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={post.title}
                    required
                />
            </div>

            <div>
                <label htmlFor="content">本文</label>
                <textarea
                    id="content"
                    name="content"
                    defaultValue={post.content}
                    required
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending?"更新中...":"更新"}
            </button>
        </form>
    )
}