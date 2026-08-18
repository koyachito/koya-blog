"use server";

import { createPost } from "@/lib/posts";
import { postSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export type CreatePostState = {
    error?: string;
}

export async function handleCreate(
    _prevState: CreatePostState,
    formData: FormData
): Promise<CreatePostState> {
    const title = formData.get("title");
    const content = formData.get("content");
    const result = postSchema.safeParse({
        title,
        content,
    });

    if (!result.success) {
        return {
            error: "入力内容が不正です。",
        };
    }

    await createPost(
        result.data.title,
        result.data.content
    );
    redirect("/admin");
}