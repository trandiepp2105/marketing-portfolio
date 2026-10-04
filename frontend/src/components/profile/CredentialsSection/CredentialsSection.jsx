import SectionHeading from '../../shared/SectionHeading/SectionHeading';
import AchievementList from '../AchievementList/AchievementList';
import SkillsPanel from '../SkillsPanel/SkillsPanel';
import './CredentialsSection.scss';

function CredentialsSection({ achievements, skills, expertise }) {
  const featuredAward = achievements[0];

  return (
    <section className="credentials-section" aria-labelledby="achievements-heading">
      <div className="credentials-section__inner">
        <div className="credentials-section__column">
          <SectionHeading
            eyebrow="Honors & competitions"
            title="Key Achievements"
            titleId="achievements-heading"
          />
          <AchievementList achievements={achievements} />
        </div>
        <SkillsPanel skills={skills} award={featuredAward} expertise={expertise} />
      </div>
    </section>
  );
}

export default CredentialsSection;
