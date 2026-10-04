import './SectionHeading.scss';

function SectionHeading({ eyebrow, title, aside, titleId }) {
  return (
    <div className="section-heading">
      <div className="section-heading__title-group">
        {eyebrow && <span className="section-heading__eyebrow">{eyebrow}</span>}
        <h2 className="section-heading__title" id={titleId}>
          {title}
        </h2>
      </div>
      {aside && <span className="section-heading__aside">{aside}</span>}
    </div>
  );
}

export default SectionHeading;
