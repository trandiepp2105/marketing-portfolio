import ContactInfoItem from '../ContactInfoItem/ContactInfoItem';
import './ContactInfoGrid.scss';

function ContactInfoGrid({ items }) {
  return (
    <div className="contact-info-grid">
      {items.map((item) => (
        <ContactInfoItem key={item.label} {...item} />
      ))}
    </div>
  );
}

export default ContactInfoGrid;
