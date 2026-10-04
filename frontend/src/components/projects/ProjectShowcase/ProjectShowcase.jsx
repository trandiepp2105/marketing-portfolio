import { useCallback } from 'react';
import AssetGallery from '../AssetGallery/AssetGallery';
import CampaignSummary from '../CampaignSummary/CampaignSummary';
import LearningList from '../LearningList/LearningList';
import ProjectMedia from '../ProjectMedia/ProjectMedia';
import ResultMetrics from '../ResultMetrics/ResultMetrics';
import ScopeList from '../ScopeList/ScopeList';
import './ProjectShowcase.scss';

function ProjectShowcase({ project, brandName, onAssetSelect }) {
  const handleAssetSelect = useCallback(
    (asset) => {
      onAssetSelect(asset);
    },
    [onAssetSelect],
  );

  return (
    <article className="project-showcase" id={project.id}>
      <div className="project-showcase__media-column">
        <header className="project-showcase__heading">
          <span>
            {brandName}
            {' // Project '}
            {String(project.order).padStart(2, '0')}
          </span>
          <h3>{project.title}</h3>
        </header>
        <ProjectMedia media={project.media} title={project.title} />
        <AssetGallery assets={project.assets} onSelect={handleAssetSelect} />
      </div>
      <div className="project-showcase__details-column">
        <CampaignSummary>{project.campaignSpotlight}</CampaignSummary>
        <div className="project-showcase__lists">
          <ScopeList items={project.scope} />
          <LearningList items={project.learnings} />
        </div>
        <ResultMetrics results={project.results} />
      </div>
    </article>
  );
}

export default ProjectShowcase;
