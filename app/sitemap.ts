import type { MetadataRoute } from 'next';
import { allProjects } from '../data/projects';

const SITE_URL = 'https://shivanshtechlabs.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${SITE_URL}/industries`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/our-work`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = allProjects.map((project) => ({
    url: `${SITE_URL}/our-work/${project.slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes];
}
