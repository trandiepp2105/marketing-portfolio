import './ContactInfoItem.scss';

function ContactInfoItem({ icon, label, value, href }) {
  const content = (
    <>
      <span className="contact-info-item__icon" aria-hidden="true">
        {icon}
      </span>
      <span className="contact-info-item__content">
        <span className="contact-info-item__label">{label}</span>
        <span className="contact-info-item__value">{value}</span>
      </span>
    </>
  );

  if (href) {
    const isExternal = href.startsWith('https://');
    return (
      <a
        className="contact-info-item"
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return <div className="contact-info-item">{content}</div>;
}

export default ContactInfoItem;
