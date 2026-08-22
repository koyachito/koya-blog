"use client";

import { upload } from "@vercel/blob/client";
import {
    useRef,
    useState,
    type RefObject,
} from "react";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];

type Props = {
    textareaRef:
        RefObject<HTMLTextAreaElement | null>;
};

export default function ImageUploader({
    textareaRef,
}: Props) {
    const fileInputRef =
        useRef<HTMLInputElement>(null);

    const [isUploading, setIsUploading] =
        useState(false);

    const [message, setMessage] =
        useState<string>();

    const [error, setError] =
        useState<string>();

    async function handleUpload() {
        const file =
            fileInputRef.current?.files?.[0];

        setMessage(undefined);
        setError(undefined);

        if (!file) {
            setError("画像を選択してください");
            return;
        }

        if (
            !ALLOWED_IMAGE_TYPES.includes(file.type)
        ) {
            setError(
                "JPEG、PNG、WebP、GIFを選択してください"
            );
            return;
        }

        if (file.size > MAX_IMAGE_SIZE) {
            setError(
                "画像は5MB以下にしてください"
            );
            return;
        }

        const textarea = textareaRef.current;

        if (!textarea) {
            setError(
                "本文入力欄が見つかりません"
            );
            return;
        }

        setIsUploading(true);

        try {
            const blob = await upload(
                `post-images/${file.name}`,
                file,
                {
                    access: "public",
                    handleUploadUrl:
                        "/api/images/upload",
                }
            );

            const start =
                textarea.selectionStart;

            const end =
                textarea.selectionEnd;

            const selectedText =
                textarea.value.slice(start, end);

            const altText =
                selectedText ||
                file.name.replace(/\.[^.]+$/, "");

            const markdown =
                `![${altText}](${blob.url})`;

            textarea.setRangeText(
                markdown,
                start,
                end,
                "end"
            );

            textarea.focus();

            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }

            setMessage(
                "画像を本文へ挿入しました"
            );
        } catch {
            setError(
                "画像のアップロードに失敗しました"
            );
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="image-uploader">
            <label htmlFor="post-image">
                本文に画像を挿入
            </label>

            <input
                ref={fileInputRef}
                id="post-image"
                type="file"
                accept={ALLOWED_IMAGE_TYPES.join(",")}
                disabled={isUploading}
            />

            <button
                type="button"
                onClick={handleUpload}
                disabled={isUploading}
            >
                {isUploading
                    ? "アップロード中..."
                    : "画像をアップロード"}
            </button>

            <small>
                JPEG・PNG・WebP・GIF、5MBまで
            </small>

            <div aria-live="polite">
                {message && <p>{message}</p>}

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}
            </div>
        </div>
    );
}