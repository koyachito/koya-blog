import { prisma } from "./prisma";

export async function createPost (title: string, content: string) 
{
    return prisma.post.create({
        data: {
            title,
            content,
        },
    });
}

export async function getPost (id: string) 
{
    return prisma.post.findUnique({
        where: {id},
    });
}

export async function getPosts ()
{
    return prisma.post.findMany();
}

export async function updatePost(
    id: string,
    title: string,
    content: string,
) {
    return prisma.post.update ({
        where: {id},
        data: {
            title,
            content,
        },
    });
}

export async function deletePost(id:string)
{
    return prisma.post.delete({
        where:{id},
    });
}