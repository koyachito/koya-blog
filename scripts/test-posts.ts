import {
    createPost,
    getPost,
    getPosts,
    updatePost,
    deletePost,
} from "../lib/posts"

async function main ()
{
    const post = await createPost(
        "テスト記事",
        "これはCRUDのテストです",
    );
    console.log("CREATE:", post);

    const foundPost = await getPost(post.id);
    console.log("READ ONE:", foundPost);

    const post2 = await createPost(
        "Test2",
        "This is test no.2",
    );

    const posts = await getPosts();
    console.log("READ ALL:", posts);

    const updatedPost = await updatePost(
        post.id,
        "更新後タイトル",
        "更新後記事",
    );
    console.log("UPDATE:", updatedPost);

    const deletedPost = await deletePost(post.id);
    console.log("DELETE:", deletedPost);

    await deletePost(post2.id);

    const result = await getPosts();
    console.log(result);
}

main().catch((error) => {
    console.error(error);
});