import Badge from '../../shared/Badge/Badge';
import './PortraitCard.scss';

function PortraitCard({ portrait, label, specialistLabel }) {
  return (
    <div className="portrait-card">
      <img src={portrait.src} alt={portrait.alt} />
      <div className="portrait-card__shade" />
      <div className="portrait-card__caption">
        <span className="portrait-card__status">
          <span />
          {label}
        </span>
        <Badge variant="solid">{specialistLabel}</Badge>
      </div>
    </div>
  );
}

export default PortraitCard;
