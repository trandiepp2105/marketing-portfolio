import Badge from '../../shared/Badge/Badge';
import './SkillGroup.scss';

function SkillGroup({ skill }) {
  const layoutClassName = skill.layout ? `skill-group--${skill.layout}` : '';

  return (
    <article className={`skill-group ${layoutClassName}`}>
      <span className="skill-group__icon" aria-hidden="true">
        {skill.icon || 'auto_awesome'}
      </span>

      <div className="skill-group__content">
        <div className="skill-group__heading">
          <h3>{skill.title}</h3>
          <Badge variant="muted">{skill.badge}</Badge>
        </div>
        {skill.certification && (
          <strong className="skill-group__certification">{skill.certification}</strong>
        )}
        {skill.issuer && <span className="skill-group__issuer">{skill.issuer}</span>}
        {skill.items?.length > 0 && (
          <ul className="skill-group__items">
            {skill.items.map((item) => {
              const itemLabel = typeof item === 'string' ? item : item.label;

              return (
                <li key={itemLabel}>
                  {typeof item === 'object' && item.detail ? (
                    <>
                      <span className="skill-group__item-label">{item.label}</span>
                      <span className="skill-group__item-detail">{item.detail}</span>
                    </>
                  ) : (
                    <>
                      {typeof item === 'object' && item.logo && (
                        <span
                          className={`skill-group__item-logo skill-group__item-logo--${item.logoVariant}`}
                          aria-hidden="true"
                        >
                          {item.logo}
                        </span>
                      )}
                      {itemLabel}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {skill.description && <p>{skill.description}</p>}
      </div>
    </article>
  );
}

export default SkillGroup;
