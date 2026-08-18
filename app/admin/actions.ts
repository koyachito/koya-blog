"use server";

import { deletePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export async function handleDelete(formData: FormData) {
    const id = formData.get("id");

    if (typeof id !== "string") {
        throw new Error("記事IDが不正です");
    }

    await deletePost(id);

    redirect("/admin");
}