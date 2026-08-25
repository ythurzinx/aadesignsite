import { ProjectsTable } from "@/components/admin/projects-table";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Project } from "@/lib/types";

export default async function ProjectsPage() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase!.from("projects").select("*, project_media(*)").order("position");
  return <ProjectsTable initialProjects={(data ?? []) as Project[]} />;
}
