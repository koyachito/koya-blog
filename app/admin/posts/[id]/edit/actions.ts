"use server";

import { updatePost } from "@/lib/posts";
import { postSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export type UpdatePostState = {
    error?: string;
};

export async function handleUpdate(
    _prevState: UpdatePostState,
    formData: FormData
): Promise<UpdatePostState> {
    const id = formData.get("id");
    const title = formData.get("title");
    const content = formData.get("content");

    if (typeof id !== "string") {
        return {
            error: "記事IDが不正です",
        };
    }

    const result = postSchema.safeParse({
        title,
        content,
    });

    if (!result.success) {
        return {
            error: "入力内容が不正です",
        };
    }

    await updatePost(
        id,
        result.data.title,
        result.data.content
    );

    redirect("/admin");
}