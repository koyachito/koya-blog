import { prisma } from "./prisma";

export async function createPost (
    title: string, 
    content: string,
    categoryId: string | null,
    tagIds: string[],
    published: boolean,
) {
    return prisma.post.create({
        data: {
            title,
            content,
            published,
            category: categoryId
                ? {
                    connect: {
                        id: categoryId,
                    },
                }
                : undefined,
            tags: {
                connect: tagIds.map((id) => ({
                    id,
                })),
            },
        },
    });
}

export async function getPost (id: string) 
{
    return prisma.post.findUnique({
        where: {id},
        include: {
            category: true,
            tags: {
                orderBy: {
                    name: "asc",
                },
            },
        },
    });
}

export async function getPosts ()
{
    return prisma.post.findMany({
        include: {
            category: true,
            tags: {
                orderBy: {
                    name: "asc",
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function updatePost(
    id: string,
    title: string,
    content: string,
    categoryId: string | null,
    tagIds: string[],
    published: boolean,
) {
    return prisma.post.update ({
        where: {id},
        data: {
            title,
            content,
            published,
            category: categoryId
                ? {
                    connect: {
                        id: categoryId,
                    },
                }
                : {
                    disconnect: true,
                },
            tags: {
                set: tagIds.map((tagId) => ({
                    id: tagId,
                })),
            },
        },
    });
}

export async function deletePost(id:string)
{
    return prisma.post.delete({
        where:{id},
    });
}

export async function getPublishedPosts() {
    return prisma.post.findMany({
        where: {
            published: true,
        },
        include: {
            category: true,
            tags: {
                orderBy: {
                    name: "asc",
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    });
}

export async function getPublishedPost(id: string) {
    return prisma.post.findFirst({
        where: {
            id,
            published: true,
        },
        include: {
            category: true,
            tags: {
                orderBy: {
                    name: "asc",
                },
            },
        },
    });
}