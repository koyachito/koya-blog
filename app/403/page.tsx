import { signOut } from "@/auth";

export default function ForbiddenPage() {
    return (
        <main>
            <h1>403 Forbidden</h1>
            <p>このページにアクセスする権限がありません。</p>
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