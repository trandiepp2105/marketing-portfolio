import './ContactActions.scss';

function ContactActions({ contact }) {
  return (
    <div className="contact-actions">
      <a className="contact-actions__primary" href={`mailto:${contact.email}`}>
        <span aria-hidden="true">send</span> Send email
      </a>
      <a
        className="contact-actions__secondary"
        href={contact.linkedIn}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span aria-hidden="true">open_in_new</span> Connect LinkedIn
      </a>
    </div>
  );
}

export default ContactActions;
