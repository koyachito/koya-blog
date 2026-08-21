"use client";

import { useActionState, useState } from "react";
import { handleDeleteCategory } from "./actions";

type Props = {
    categoryId: string;
    categoryName: string;
};

export default function DeleteCategoryButton({
    categoryId,
    categoryName,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const [state, formAction, isPending] = useActionState(
        handleDeleteCategory,
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
                        「{categoryName}」を削除しますか？
                    </p>

                    <form action={formAction}>
                        <input
                            type="hidden"
                            name="id"
                            value={categoryId}
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