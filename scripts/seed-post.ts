import { createPost } from "../lib/posts";

async function main(){
    const post1 = await createPost(
        "Next.jsから取得した記事",
        "これは記事一覧表示のテストです。"
    );

    const post2 = await createPost(
        "記事2",
        "これは記事一覧表示のテスト2です。"
    );

    console.log(post1);
    console.log(post2);
}


main();