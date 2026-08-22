"use client";

import { useActionState, useRef } from "react";
import { handleUpdate } from "./actions";
import ImageUploader from "@/components/ImageUploader";

type Props = {
    post: {
        id: string;
        title: string;
        content: string;
        published: boolean;
        categoryId: string | null;
        tags: {
            id: string;
            name: string;
        }[];
    };
    categories: {
        id: string;
        name: string;
    }[];
    tags: {
        id: string;
        name: string;
    }[];
};

export default function EditPostForm({
    post,
    categories,
    tags,
}: Props) {
    const [state, formAction, isPending] = useActionState(
        handleUpdate,
        {}
    );

    const contentRef = useRef<HTMLTextAreaElement>(null);

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
                <label htmlFor="title">
                    タイトル
                </label>

                <input
                    id="title"
                    name="title"
                    type="text"
                    defaultValue={post.title}
                    required
                />
            </div>

            <div>
                <label htmlFor="content">
                    本文
                </label>

                <textarea
                    ref={contentRef}
                    id="content"
                    name="content"
                    defaultValue={post.content}
                    required
                />
                <ImageUploader textareaRef={contentRef} />
            </div>

            <div>
                <label htmlFor="category">
                    カテゴリー
                </label>

                <select
                    id="category"
                    name="categoryId"
                    defaultValue={post.categoryId ?? ""}
                >
                    <option value="">
                        カテゴリーなし
                    </option>

                    {categories.map((category) => (
                        <option
                            key={category.id}
                            value={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <fieldset>
                <legend>タグ</legend>

                {tags.length === 0 ? (
                    <p>タグはまだありません。</p>
                ) : (
                    tags.map((tag) => (
                        <label
                            key={tag.id}
                            htmlFor={`edit-tag-${tag.id}`}
                        >
                            <input
                                id={`edit-tag-${tag.id}`}
                                name="tagIds"
                                type="checkbox"
                                value={tag.id}
                                defaultChecked={post.tags.some(
                                    (postTag) =>
                                        postTag.id === tag.id
                                )}
                            />
                            {tag.name}
                        </label>
                    ))
                )}
            </fieldset>

            <div>
                <label htmlFor="published">
                    <input
                        id="published"
                        name="published"
                        type="checkbox"
                        defaultChecked={post.published}
                    />
                    公開する
                </label>
            </div>

            <button
                type="submit"
                disabled={isPending}
            >
                {isPending ? "更新中..." : "更新"}
            </button>
        </form>
    );
}