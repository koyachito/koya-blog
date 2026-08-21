"use server";

import { Prisma } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";
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
    await requireAdmin();

    const id = formData.get("id");
    const categoryIdValue = formData.get("categoryId");

    if (typeof id !== "string" || id.length === 0) {
        return {
            error: "記事IDが不正です。",
        };
    }

    const categoryId =
        categoryIdValue === ""
            ? null
            : categoryIdValue;

    const result = postSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        categoryId,
        tagIds: formData.getAll("tagIds"),
    });
    if (!result.success) {
        return {
            error:
                result.error.issues[0]?.message
                ?? "入力内容が不正です。",
        };
    }
    try {
        await updatePost(
            id,
            result.data.title,
            result.data.content,
            result.data.categoryId,
            result.data.tagIds
        );
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2025"
        ) {
            return {
                error:
                    "記事、カテゴリー、またはタグが見つかりません。",
            };
        }
        throw error;
    }
    redirect("/admin");
}