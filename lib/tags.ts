import { prisma } from "./prisma";

export async function createTag(name: string) {
    return prisma.tag.create({
        data: {
            name,
        },
    });
}

export async function getTags() {
    return prisma.tag.findMany({
        orderBy: {
            name: "asc",
        },
    });
}

export async function updateTag(
    id: string,
    name: string
) {
    return prisma.tag.update({
        where: {
            id,
        },
        data: {
            name,
        },
    });
}

export async function countPostsByTag(id: string) {
    const tag = await prisma.tag.findUnique({
        where: { id },
        select: {
            _count: {
                select: {
                    posts: true,
                },
            },
        },
    });
    
    return tag?._count.posts ?? 0;
}

export async function deleteTag(id: string) {
    return prisma.tag.delete({
        where: {
            id,
        },
    });
}