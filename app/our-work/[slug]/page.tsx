import type { Metadata } from 'next';
import ProjectDetailPage from '../../../page-components/ProjectDetailPage/ProjectDetailPage';
import { allProjects } from '../../../data/projects';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return allProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.title} — Case Study`;
  const description = project.desc;

  return {
    title,
    description,
    alternates: { canonical: `/our-work/${project.slug}` },
    openGraph: {
      title: `${project.title} | Shivansh Tech Lab`,
      description,
      url: `/our-work/${project.slug}`,
      images: project.image ? [{ url: project.image, width: 800, height: 500, alt: project.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Shivansh Tech Lab`,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default function Page() {
  return <ProjectDetailPage />;
}
