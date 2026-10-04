import { Link } from 'react-router-dom';
import './ContactCta.scss';

function ContactCta({ content, contact }) {
  return (
    <section className="contact-cta">
      <div className="contact-cta__inner">
        <div className="contact-cta__copy">
          <span>{content.eyebrow}</span>
          <h2>{content.title}</h2>
          <p>{content.description}</p>
        </div>
        <div className="contact-cta__actions">
          <a className="contact-cta__primary" href={`mailto:${contact.email}`}>
            Send email <span aria-hidden="true">arrow_forward</span>
          </a>
          <Link className="contact-cta__secondary" to="/contact">
            Contact page <span aria-hidden="true">north_east</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default ContactCta;
