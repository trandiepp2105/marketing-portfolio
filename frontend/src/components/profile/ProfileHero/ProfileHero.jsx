import ContactInfoGrid from '../../shared/ContactInfoGrid/ContactInfoGrid';
import HeroMetrics from '../HeroMetrics/HeroMetrics';
import PortraitCard from '../PortraitCard/PortraitCard';
import ProfileIntroduction from '../ProfileIntroduction/ProfileIntroduction';
import './ProfileHero.scss';

function ProfileHero({ profile, contact }) {
  const contactItems = [
    { icon: 'mail', label: 'Email', value: contact.email, href: `mailto:${contact.email}` },
    { icon: 'call', label: 'Phone', value: contact.phone, href: `tel:${contact.phone}` },
    { icon: 'location_on', label: 'Location', value: contact.location },
    {
      icon: 'link',
      label: 'LinkedIn',
      value: 'linkedin.com/in/ly-gia-huy/',
      href: contact.linkedIn,
    },
  ];

  return (
    <section className="profile-hero" aria-labelledby="profile-title">
      <div className="profile-hero__glow" aria-hidden="true" />
      <div className="profile-hero__inner">
        <PortraitCard
          portrait={profile.portrait}
          label={profile.portfolioLabel}
          specialistLabel={profile.specialistLabel}
        />
        <div className="profile-hero__details">
          <ProfileIntroduction
            name={profile.name}
            role={profile.role}
            introduction={profile.introduction}
          />
          <ContactInfoGrid items={contactItems} />
          <HeroMetrics highlights={profile.highlights} />
        </div>
      </div>
    </section>
  );
}

export default ProfileHero;
