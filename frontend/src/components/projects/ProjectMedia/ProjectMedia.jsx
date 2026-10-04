import './ProjectMedia.scss';

function ProjectMedia({ media, title }) {
  return (
    <a
      className="project-media"
      href={media.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open campaign media: ${title}`}
    >
      <img src={media.thumbnail} alt={media.alt} loading="lazy" />
      <span className="project-media__shade" />
      <span className="project-media__play" aria-hidden="true">
        play_arrow
      </span>
      <span className="project-media__label">Campaign highlight</span>
    </a>
  );
}

export default ProjectMedia;
