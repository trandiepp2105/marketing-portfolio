import { useEffect, useState } from 'react';
import ContactHero from '../../components/contact/ContactHero/ContactHero';
import ContactPanel from '../../components/contact/ContactPanel/ContactPanel';
import ReturnLinks from '../../components/contact/ReturnLinks/ReturnLinks';
import { getContact } from '../../services/contactService';
import './ContactPage.scss';

function ContactPage() {
  const [contact, setContact] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;
    getContact()
      .then((content) => {
        if (isCurrent) {
          setContact(content);
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError('Contact information could not be loaded. Please refresh the page.');
        }
      });
    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    document.title = 'Contact | Ly Gia Huy';
  }, []);

  if (error) {
    return (
      <div className="contact-page__message" role="alert">
        {error}
      </div>
    );
  }

  if (!contact) {
    return (
      <div className="contact-page__message" role="status">
        Loading contact details…
      </div>
    );
  }

  return (
    <div className="contact-page">
      <ContactHero contact={contact} />
      <ContactPanel contact={contact} />
      <ReturnLinks />
    </div>
  );
}

export default ContactPage;
