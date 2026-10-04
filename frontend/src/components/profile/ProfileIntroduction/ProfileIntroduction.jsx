import './ProfileIntroduction.scss';

function ProfileIntroduction({ name, role, introduction }) {
  return (
    <div className="profile-introduction">
      <div className="profile-introduction__eyebrow">GAME MARKETING PORTFOLIO</div>
      <h1 id="profile-title">{name}</h1>
      <p className="profile-introduction__role">{role}</p>
      <p className="profile-introduction__body">{introduction}</p>
    </div>
  );
}

export default ProfileIntroduction;
