import './CampaignSummary.scss';

function CampaignSummary({ children }) {
  return (
    <section className="campaign-summary">
      <h4>
        <span aria-hidden="true" />
        Campaign spotlight
      </h4>
      <p>{children}</p>
    </section>
  );
}

export default CampaignSummary;
