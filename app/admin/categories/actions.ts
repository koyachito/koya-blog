"use server";

import { Prisma } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";
import { 
    countPostsByCategory,
    createCategory,
    deleteCategory,
    updateCategory 
} from "@/lib/categories";
import { categorySchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export type CreateCategoryState = {
    error?: string;
};

export type UpdateCategoryState = {
    error?: string;
};

export type DeleteCategoryState = {
    error?: string;
};

export async function handleCreateCategory (
    _prevState: CreateCategoryState,
    formData: FormData
): Promise<CreateCategoryState> {
    await requireAdmin();

    const result = categorySchema.safeParse({
        name: formData.get("name"),
    });

    if (!result.success) {
        return {
            error:
                result.error.issues[0]?.message
                ?? "入力内容が不正です",
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
                error: "同じ名前のカテゴリーがすでに存在します"
            };
        }
        throw error;
    }

    redirect("/admin/categories");
}

export async function handleUpdateCategory(
    _prevState: UpdateCategoryState,
    formData: FormData
): Promise<UpdateCategoryState> {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || id.length === 0) {
        return {
            error: "カテゴリーIDが不正です。",
        };
    }

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
        await updateCategory(
            id,
            result.data.name
        );
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2002"
        ) {
            return {
                error: "同じ名前のカテゴリーがすでに存在します。",
            };
        }

        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2025"
        ) {
            return {
                error: "カテゴリーが見つかりません。",
            };
        }

        throw error;
    }

    redirect("/admin/categories");
}

export async function handleDeleteCategory(
    _prevState: DeleteCategoryState,
    formData: FormData
): Promise<DeleteCategoryState> {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || id.length === 0) {
        return {
            error: "カテゴリーIDが不正です。",
        };
    }

    const postCount = await countPostsByCategory(id);

    if (postCount > 0) {
        return {
            error: "使用中のカテゴリーは削除できません。",
        };
    }

    try {
        await deleteCategory(id);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2003"
        ) {
            return {
                error: "使用中のカテゴリーは削除できません。",
            };
        }

        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2025"
        ) {
            return {
                error: "カテゴリーが見つかりません。",
            };
        }

        throw error;
    }

    redirect("/admin/categories");
}