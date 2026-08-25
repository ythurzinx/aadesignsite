import { LeadsTable } from "@/components/admin/leads-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Lead } from "@/lib/types";

export default async function LeadsPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase!.from("leads").select("*").order("created_at", { ascending: false });
  return <LeadsTable initialLeads={(data ?? []) as Lead[]} />;
}
