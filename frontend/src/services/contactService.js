/** Static contact resource shared by the profile and contact pages. */
const contact = {
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
  return contact;
}
