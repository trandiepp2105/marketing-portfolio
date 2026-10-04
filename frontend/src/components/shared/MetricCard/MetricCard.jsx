import './MetricCard.scss';

function MetricCard({ value, label, tone = 'orange' }) {
  return (
    <article className={`metric-card metric-card--${tone}`}>
      <strong className="metric-card__value">{value}</strong>
      <span className="metric-card__label">{label}</span>
    </article>
  );
}

export default MetricCard;
