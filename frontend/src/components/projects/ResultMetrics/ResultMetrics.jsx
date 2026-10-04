import MetricCard from '../../shared/MetricCard/MetricCard';
import './ResultMetrics.scss';

function ResultMetrics({ results }) {
  return (
    <section className="result-metrics" aria-label="Key results">
      <h4>
        <span aria-hidden="true">insights</span> Key results
      </h4>
      <div className="result-metrics__grid">
        {results.map((result) => (
          <MetricCard key={`${result.value}-${result.label}`} {...result} />
        ))}
      </div>
    </section>
  );
}

export default ResultMetrics;
