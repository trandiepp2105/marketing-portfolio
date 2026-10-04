import ContactInfoGrid from '../../shared/ContactInfoGrid/ContactInfoGrid';
import ContactActions from '../ContactActions/ContactActions';
import './ContactPanel.scss';

function ContactPanel({ contact }) {
  const contactItems = [
    { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: 'call', label: 'Phone', value: contact.phoneDisplay, href: `tel:${contact.phone}` },
    { icon: 'location_on', label: 'Location', value: contact.location },
    {
      icon: 'link',
      label: 'LinkedIn',
      value: 'linkedin.com/in/ly-gia-huy/',
      href: contact.linkedIn,
    },
  ];

  return (
    <section className="contact-panel" aria-label="Contact details">
      <ContactInfoGrid items={contactItems} />
      <ContactActions contact={contact} />
    </section>
  );
}

export default ContactPanel;
