import { useEffect, useState } from 'react';
import { getContact } from '../../services/contactService';
import { getProfile } from '../../services/profileService';
import ContactCta from '../../components/profile/ContactCta/ContactCta';
import CareerSection from '../../components/profile/CareerSection/CareerSection';
import CredentialsSection from '../../components/profile/CredentialsSection/CredentialsSection';
import ProfileHero from '../../components/profile/ProfileHero/ProfileHero';
import './ProfilePage.scss';

function ProfilePage() {
  const [pageData, setPageData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let isCurrent = true;

    Promise.all([getProfile(), getContact()])
      .then(([profile, contact]) => {
        if (isCurrent) {
          setPageData({ profile, contact });
        }
      })
      .catch(() => {
        if (isCurrent) {
          setError('Profile information could not be loaded. Please refresh the page.');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    document.title = 'Ly Gia Huy | Game Marketing';
  }, []);

  if (error) {
    return (
      <div className="page-message page-message--error" role="alert">
        {error}
      </div>
    );
  }

  if (!pageData) {
    return (
      <div className="page-message" role="status">
        Loading profile…
      </div>
    );
  }

  const { profile, contact } = pageData;

  return (
    <div className="profile-page">
      <ProfileHero profile={profile} contact={contact} />
      <CareerSection experience={profile.experience} education={profile.education} />
      <CredentialsSection
        achievements={profile.achievements}
        skills={profile.skills}
        expertise={profile.expertise}
      />
      <ContactCta content={profile.contactCta} contact={contact} />
    </div>
  );
}

export default ProfilePage;
