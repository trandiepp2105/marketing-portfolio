import MetricCard from '../../shared/MetricCard/MetricCard';
import './HeroMetrics.scss';

function HeroMetrics({ highlights }) {
  return (
    <div className="hero-metrics" aria-label="Career highlights">
      {highlights.map((metric, index) => (
        <MetricCard key={metric.id} {...metric} tone={index === 1 ? 'white' : 'orange'} />
      ))}
    </div>
  );
}

export default HeroMetrics;
