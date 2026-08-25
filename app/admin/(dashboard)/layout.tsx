import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) redirect("/admin/login");
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  const { data: admin } = await supabase.from("admin_users").select("id").eq("id", user.id).maybeSingle();
  if (!admin) {
    await supabase.auth.signOut();
    redirect("/admin/login?erro=sem-permissao");
  }
  return <AdminShell email={user.email || "Administrador"}>{children}</AdminShell>;
}
