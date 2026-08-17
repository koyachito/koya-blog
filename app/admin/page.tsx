import { requireAdmin } from "@/lib/auth";
import { signOut } from "@/auth";

export default async function AdminPage() {
    const session = await requireAdmin();

    return (
        <main>
            <h1>管理画面</h1>
            <p>
                ログイン中: {session.user.email}
            </p>
            <p>
                ここから記事を管理できます。
            </p>
            <form
                action={async () => {
                    "use server";
                    await signOut({
                        redirectTo: "/login",
                    });
                }}
            >
                <button type="submit">
                    ログアウト
                </button>
            </form>
        </main>
    );
}