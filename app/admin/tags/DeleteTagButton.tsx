"use client";

import { useActionState, useState } from "react";
import { handleDeleteTag } from "./actions";

type Props = {
    tagId: string;
    tagName: string;
};

export default function DeleteTagButton({
    tagId,
    tagName,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const [state, formAction, isPending] = useActionState(
        handleDeleteTag,
        {}
    );

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
            >
                削除
            </button>

            {isOpen && (
                <div>
                    <p>
                        「{tagName}」を削除しますか？
                    </p>

                    <form action={formAction}>
                        <input
                            type="hidden"
                            name="id"
                            value={tagId}
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
                            {isPending
                                ? "削除中..."
                                : "削除する"}
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            disabled={isPending}
                        >
                            キャンセル
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}