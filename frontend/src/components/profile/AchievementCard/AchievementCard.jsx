import Badge from '../../shared/Badge/Badge';
import './AchievementCard.scss';

function AchievementCard({ achievement }) {
  return (
    <article className="achievement-card">
      <span className="achievement-card__icon" aria-hidden="true">
        {achievement.icon || 'award_star'}
      </span>
      <div className="achievement-card__content">
        <div className="achievement-card__heading">
          <h3>{achievement.title}</h3>
          <Badge variant={achievement.badge === 'WINNER' ? 'solid' : 'muted'}>
            {achievement.badge}
          </Badge>
        </div>
        {achievement.subtitle && (
          <p className="achievement-card__subtitle">{achievement.subtitle}</p>
        )}
        <p className="achievement-card__description">{achievement.description}</p>
      </div>
    </article>
  );
}

export default AchievementCard;
