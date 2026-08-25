import { notFound } from "next/navigation";
import { ProjectForm } from "@/components/admin/project-form";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase!.from("projects").select("*, project_media(*)").eq("id", id).maybeSingle();
  if (!data) notFound();
  return <ProjectForm project={data as Project} />;
}
