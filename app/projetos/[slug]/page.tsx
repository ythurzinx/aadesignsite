import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectNavigation } from "@/components/ProjectNavigation";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) return {};

  return {
    title: `${project.title} | AA Design & Mídia`,
    description: project.description,
    openGraph: { images: [project.cover] },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((item) => item.slug === slug);

  if (projectIndex < 0) notFound();

  const project = projects[projectIndex];
  const previous =
    projects[(projectIndex - 1 + projects.length) % projects.length];
  const next = projects[(projectIndex + 1) % projects.length];

  const details = [
    ["Projeto", project.title],
    ["Cliente", project.client],
    ["Categoria", project.category],
    ["Ano", project.year],
  ];

  return (
    <main>
      <section className="relative h-[82svh] min-h-[560px]">
        <Image
          src={project.cover}
          alt={`Capa do projeto ${project.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-black/10 to-black/40" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-[1600px] px-5 pb-12 md:px-10">
          <p className="eyebrow">
            {project.category} / {project.year}
          </p>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3rem,8vw,8rem)] leading-[0.86] tracking-[-0.055em]">
            {project.title}
          </h1>
        </div>
      </section>

      <section className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[1600px] gap-14 lg:grid-cols-2">
          <dl className="grid grid-cols-2 gap-8">
            {details.map(([label, value]) => (
              <div className="border-t border-white/15 pt-4" key={label}>
                <dt className="text-[10px] uppercase tracking-widest text-white/35">
                  {label}
                </dt>
                <dd className="mt-2 text-sm">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="max-w-xl font-display text-2xl leading-relaxed text-white/70">
            {project.description}
          </p>
        </div>

        {project.video ? (
          <div className="mx-auto mt-24 max-w-[1600px]">
            <p className="mb-5 text-xs tracking-widest text-white/40">
              FILME PRINCIPAL
            </p>
            <video
              controls
              preload="none"
              poster={project.cover}
              className="aspect-video w-full bg-black"
            >
              <source src={project.video} type="video/mp4" />
              Seu navegador não suporta vídeo HTML5.
            </video>
          </div>
        ) : null}

        <div className="mx-auto mt-4 grid max-w-[1600px] gap-4 md:grid-cols-2">
          {project.gallery.map((image, index) => (
            <div
              className={`relative ${index % 3 === 0 ? "aspect-[4/3]" : "aspect-square"}`}
              key={`${project.slug}-${image}`}
            >
              <Image
                src={image}
                alt={`Galeria de ${project.title}, imagem ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      <ProjectNavigation previous={previous} next={next} />

      <section className="px-5 py-28 text-center md:px-10">
        <h2 className="font-display text-4xl md:text-7xl">
          Tem um projeto em mente?
        </h2>
        <Link
          href="/contato"
          className="mt-8 inline-block rounded-full bg-electric px-7 py-4 text-sm font-semibold transition-colors hover:bg-white hover:text-black"
        >
          Vamos conversar
        </Link>
      </section>
    </main>
  );
}
