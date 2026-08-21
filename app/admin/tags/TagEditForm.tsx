"use client";

import { useActionState } from "react";
import { handleUpdateTag } from "./actions";

type Props = {
    tagId: string;
    tagName: string;
};

export default function TagEditForm({
    tagId,
    tagName,
}: Props) {
    const [state, formAction, isPending] = useActionState(
        handleUpdateTag,
        {}
    );

    return (
        <form action={formAction}>
            <input
                type="hidden"
                name="id"
                value={tagId}
            />

            <label htmlFor={`tag-${tagId}`}>
                タグ名
            </label>

            <input
                id={`tag-${tagId}`}
                name="name"
                type="text"
                defaultValue={tagName}
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