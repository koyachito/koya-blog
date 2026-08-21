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
});

export const categorySchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "カテゴリー名を入力してください")
        .max(30, "カテゴリー名は30文字以内で入力してください"),
});


export const tagSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "タグ名を入力してください")
        .max(30, "タグ名は30文字以内で入力してください"),
});