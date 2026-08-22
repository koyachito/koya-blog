import {
    handleUpload,
    type HandleUploadBody,
} from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
];

export async function POST(request: Request) {
    const session = await auth();

    if (
        !session?.user?.email ||
        session.user.email !== process.env.ADMIN_EMAIL
    ) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body =
            (await request.json()) as HandleUploadBody;

        const response = await handleUpload({
            request,
            body,

            onBeforeGenerateToken: async (pathname) => {
                if (!pathname.startsWith("post-images/")) {
                    throw new Error("Invalid upload path");
                }

                return {
                    allowedContentTypes:
                        ALLOWED_IMAGE_TYPES,
                    maximumSizeInBytes:
                        MAX_IMAGE_SIZE,

                    addRandomSuffix: true,
                };
            },
        });

        return NextResponse.json(response);
     } catch (error) {
        console.error(
            "Vercel Blob upload error:",
            error
        );

        return NextResponse.json(
            {
                error:
                    "画像のアップロードに失敗しました",
            },
            { status: 400 }
        );
    }
}