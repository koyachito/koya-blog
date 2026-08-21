"use server";

import { Prisma } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";
import { createCategory } from "@/lib/categories";
import { createPost } from "@/lib/posts";
import { createTag } from "@/lib/tags";
import { categorySchema, postSchema, tagSchema} from "@/lib/validation";
import { revalidatePath } from "next/cache"; 
import { redirect } from "next/navigation";

export type CreatePostState = {
    error?: string;
}

export type CreateOptionState = {
    error?: string;
    message?: string;
};

export async function handleCreate(
    _prevState: CreatePostState,
    formData: FormData
): Promise<CreatePostState> {
    await requireAdmin();
    
    const categoryIdValue = formData.get("categoryId");

    const categoryId =
        categoryIdValue === ""
            ? null
            : categoryIdValue;

    const published = formData.get("published") === "on";

    const result = postSchema.safeParse({
        title: formData.get("title"),
        content: formData.get("content"),
        categoryId,
        tagIds: formData.getAll("tagIds"),
        published,
    });

    if (!result.success) {
        return {
            error: 
                result.error.issues[0]?.message
                ?? "入力内容が不正です。",
        };
    }

    try {
        await createPost(
            result.data.title,
            result.data.content,
            result.data.categoryId,
            result.data.tagIds,
            result.data.published,
        );
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2025"
        ) {
            return {
                error:
                    "選択したカテゴリーまたはタグが見つかりません"
            };
        }

        throw error;
    }
    redirect("/admin");
}

export async function handleCreateCategoryForPost(
    _prevState: CreateOptionState,
    formData: FormData
): Promise<CreateOptionState> {
    await requireAdmin();

    const result = categorySchema.safeParse({
        name: formData.get("name"),
    });

    if (!result.success) {
        return {
            error:
                result.error.issues[0]?.message
                ?? "入力内容が不正です。",
        };
    }

    try {
        await createCategory(result.data.name);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2002"
        ) {
            return {
                error:
                    "同じ名前のカテゴリーがすでに存在します。",
            };
        }

        throw error;
    }

    revalidatePath("/admin/posts/new");

    return {
        message: "カテゴリーを作成しました。",
    };
}

export async function handleCreateTagForPost(
    _prevState: CreateOptionState,
    formData: FormData
): Promise<CreateOptionState> {
    await requireAdmin();

    const result = tagSchema.safeParse({
        name: formData.get("name"),
    });

    if (!result.success) {
        return {
            error:
                result.error.issues[0]?.message
                ?? "入力内容が不正です。",
        };
    }

    try {
        await createTag(result.data.name);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2002"
        ) {
            return {
                error:
                    "同じ名前のタグがすでに存在します。",
            };
        }

        throw error;
    }

    revalidatePath("/admin/posts/new");

    return {
        message: "タグを作成しました。",
    };
}