import Badge from '../../shared/Badge/Badge';
import './ContactHero.scss';

function ContactHero({ contact }) {
  return (
    <header className="contact-hero">
      <Badge>
        <span className="contact-hero__pulse" />
        {contact.availability}
      </Badge>
      <h1 aria-label={contact.headline}>{contact.headline}</h1>
      <p>{contact.tagline}</p>
    </header>
  );
}

export default ContactHero;
