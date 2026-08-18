"use client";

import { useState } from "react";
import { handleDelete } from "./actions";

type Props = {
    postId: string;
    postTitle: string;
};

export default function DeletePostButton({
    postId,
    postTitle,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

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
                    <p>「{postTitle}」を削除しますか？</p>
                
                    <form action={handleDelete}>
                        <input
                            type="hidden"
                            name="id"
                            value={postId}
                        />

                        <button type="submit">削除する</button>

                        <button 
                            type="button"
                            onClick={() => setIsOpen(false)}
                        >
                            キャンセル
                        </button>
                    </form>
                </div>
            )}
        </>
    );
}