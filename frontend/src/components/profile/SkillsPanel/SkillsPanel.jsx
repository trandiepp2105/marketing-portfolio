import SkillGroup from '../SkillGroup/SkillGroup';
import AchievementCard from '../AchievementCard/AchievementCard';
import './SkillsPanel.scss';

function SkillsPanel({ skills, award, expertise }) {
  return (
    <section className="skills-panel" aria-labelledby="skills-title">
      <div className="skills-panel__heading">
        <span>Practical expertise</span>
        <h2 id="skills-title">Skills & Certifications</h2>
      </div>
      <AchievementCard achievement={award} />
      <div className="skills-panel__groups">
        {skills.map((skill) => (
          <SkillGroup key={skill.id} skill={skill} />
        ))}
      </div>
      <div className="skills-panel__expertise" aria-label="Additional expertise">
        {expertise.map((item, index) => (
          <span key={item} className={index === 0 ? 'is-highlighted' : ''}>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export default SkillsPanel;
