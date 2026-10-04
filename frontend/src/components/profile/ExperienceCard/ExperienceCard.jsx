import Badge from '../../shared/Badge/Badge';
import './ExperienceCard.scss';

function ExperienceCard({ experience }) {
  return (
    <article className="experience-card">
      <div className="experience-card__topline">
        <div className="experience-card__identity">
          <Badge variant={experience.badge === 'CURRENT' ? 'solid' : 'muted'}>
            {experience.badge}
          </Badge>
          <h3>{experience.organization}</h3>
        </div>
        <span className="experience-card__period">{experience.period}</span>
      </div>
      <p>{experience.role}</p>
    </article>
  );
}

export default ExperienceCard;
