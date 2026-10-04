import ProjectShowcase from '../ProjectShowcase/ProjectShowcase';
import './ProjectsSection.scss';

function ProjectsSection({ brand, projects, onAssetSelect }) {
  return (
    <section className="projects-section" aria-labelledby="projects-section-title">
      <div className="projects-section__header">
        <div className="projects-section__heading">
          <svg
            className="projects-section__icon"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M12 3 20 8 12 13 4 8 12 3Z" />
            <path d="m4 12 8 5 8-5" />
          </svg>
          <h2 className="projects-section__title" id="projects-section-title">
            My Projects
          </h2>
          <span className="projects-section__badge projects-section__badge--brand">
            Brand: {brand.name}
          </span>
          <span className="projects-section__badge projects-section__badge--count">
            {projects.length} initiatives
          </span>
        </div>
        <p className="projects-section__hint">Click any brand above to filter showcase projects</p>
      </div>
      {projects.length > 0 ? (
        <div className="projects-section__list">
          {projects.map((project) => (
            <ProjectShowcase
              key={project.id}
              project={project}
              brandName={brand.name}
              onAssetSelect={onAssetSelect}
            />
          ))}
        </div>
      ) : (
        <p className="projects-section__empty">
          There are no projects published for this brand yet.
        </p>
      )}
    </section>
  );
}

export default ProjectsSection;
