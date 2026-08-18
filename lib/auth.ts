import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAdmin() {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    if (session.user.email !== process.env.ADMIN_EMAIL) {
        redirect("/403");
    }

    return session;
}