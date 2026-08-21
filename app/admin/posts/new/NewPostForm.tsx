"use client";

import { useActionState } from "react";
import { handleCreate } from "./actions";

type Props = {
    categories: {
        id: string;
        name: string;
    } [];
    tags: {
        id: string;
        name: string;
    }[];
};

export default function NewPostForm ({categories, tags}: Props) {
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
                
                <div>
                    <label htmlFor="category">カテゴリー</label>
                    <select
                        id="category"
                        name="categoryId"
                        defaultValue=""
                    >
                        <option value="">
                            カテゴリーなし
                        </option>
                        {categories.map((category) => (
                            <option
                                key={category.id}
                                value={category.id}>
                                    {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                
                <fieldset>
                    <legend>タグ</legend>
                    {tags.length === 0 ? (
                        <p>タグはまだありません</p>
                    ) : (
                        tags.map((tag) => (
                            <label
                                key={tag.id}
                                htmlFor={`tag-${tag.id}`}
                            >
                                <input  
                                    id={`tag-${tag.id}`}
                                    name="tagIds"
                                    type="checkbox"
                                    value={tag.id}
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
                        />
                        公開する
                    </label>
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