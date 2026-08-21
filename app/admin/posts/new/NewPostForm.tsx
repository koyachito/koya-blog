"use client";

import { useActionState } from "react";
import { handleCreate } from "./actions";

export default function NewPostForm () {
    const [state, formAction, isPending] = useActionState(
        handleCreate,
        {}
    );

    return (
            <form action={formAction}>
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
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">本文</label>
                    <textarea
                        id="content"
                        name="content"
                        required
                    />
                </div>

                    <button 
                        type="submit"
                        disabled={isPending}
                    >
                        {isPending ? "作成中" : "作成"}
                    </button>
            </form>
    );
}