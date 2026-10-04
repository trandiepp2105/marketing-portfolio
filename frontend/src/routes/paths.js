export const ROUTES = Object.freeze({
  profile: '/',
  projects: '/projects',
  contact: '/contact',
});

/** Builds the route for a brand's project showcase. */
export function getBrandProjectsPath(brandSlug) {
  return `${ROUTES.projects}/${encodeURIComponent(brandSlug)}`;
}
