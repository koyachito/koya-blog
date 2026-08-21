"use server";

import { Prisma } from "@/generated/prisma/client";
import { requireAdmin } from "@/lib/auth";
import { 
    countPostsByTag,
    createTag,
    deleteTag,
    updateTag 
} from "@/lib/tags";
import { tagSchema } from "@/lib/validation";
import { redirect } from "next/navigation";

export type CreateTagState = {
    error?: string;
};

export type UpdateTagState = {
    error?: string;
};

export type DeleteTagState = {
    error?: string;
};

export async function handleCreateTag (
    _prevState: CreateTagState,
    formData: FormData
): Promise<CreateTagState> {
    await requireAdmin();

    const result = tagSchema.safeParse({
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
        await createTag(result.data.name);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2002"
        ) {
            return {
                error: "同じ名前のタグがすでに存在します"
            };
        }
        throw error;
    }

    redirect("/admin/tags");
}

export async function handleUpdateTag(
    _prevState: UpdateTagState,
    formData: FormData
): Promise<UpdateTagState> {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || id.length === 0) {
        return {
            error: "タグIDが不正です。",
        };
    }

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
        await updateTag(
            id,
            result.data.name
        );
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2002"
        ) {
            return {
                error: "同じ名前のタグがすでに存在します。",
            };
        }

        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2025"
        ) {
            return {
                error: "タグが見つかりません。",
            };
        }

        throw error;
    }

    redirect("/admin/tags");
}

export async function handleDeleteTag(
    _prevState: DeleteTagState,
    formData: FormData
): Promise<DeleteTagState> {
    await requireAdmin();

    const id = formData.get("id");

    if (typeof id !== "string" || id.length === 0) {
        return {
            error: "タグIDが不正です。",
        };
    }

    const postCount = await countPostsByTag(id);

    if (postCount > 0) {
        return {
            error: "使用中のタグは削除できません。",
        };
    }

    try {
        await deleteTag(id);
    } catch (error) {
        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2003"
        ) {
            return {
                error: "使用中のタグは削除できません。",
            };
        }

        if (
            error instanceof Prisma.PrismaClientKnownRequestError
            && error.code === "P2025"
        ) {
            return {
                error: "タグが見つかりません。",
            };
        }

        throw error;
    }

    redirect("/admin/tags");
}