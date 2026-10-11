import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured, requireFirebase } from './firebaseClient';

/** Bundled contact resource used until Firebase is configured. */
export const bundledContact = {
  email: 'huygia171204@gmail.com',
  phone: '0847391011',
  phoneDisplay: '0847391011 (+84 847 391 011)',
  location: 'Xo Viet Nghe Tinh, Thanh My Tay Ward, Ho Chi Minh City, Vietnam',
  linkedIn: 'https://linkedin.com/in/ly-gia-huy/',
  availability: 'Available For New Opportunities',
  headline: 'THANK YOU',
  tagline: 'LET’S PLAY!',
};

/**
 * Returns public contact details and contact-page copy.
 * @returns {Promise<Object>} Email, phone, location, LinkedIn and display copy.
 */
export async function getContact() {
  if (!isFirebaseConfigured) {
    return bundledContact;
  }

  const contactDocument = await getDoc(doc(db, 'contact', 'primary'));

  return contactDocument.exists() ? contactDocument.data() : bundledContact;
}

/** Stores the public contact record under its stable document ID. */
export async function updateContact(contact) {
  requireFirebase();
  await setDoc(doc(db, 'contact', 'primary'), contact);
}
