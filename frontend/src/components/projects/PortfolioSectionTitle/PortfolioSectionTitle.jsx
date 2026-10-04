import './PortfolioSectionTitle.scss';

function PortfolioSectionTitle({ as: Heading = 'h2', children, className = '', id }) {
  return (
    <Heading className={`portfolio-section-title ${className}`.trim()} id={id}>
      {children}
    </Heading>
  );
}

export default PortfolioSectionTitle;
