import { z } from "zod";

export const postSchema = z.object({
    title: z
        .string()
        .trim()
        .min(1, "タイトルを入力してください")
        .max(50, "タイトルは50文字以内で入力してください"),

    content: z
        .string()
        .trim()
        .min(1, "本文を入力してください"),
})