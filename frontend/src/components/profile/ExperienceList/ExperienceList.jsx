import ExperienceCard from '../ExperienceCard/ExperienceCard';
import './ExperienceList.scss';

function ExperienceList({ experiences }) {
  return (
    <div className="experience-list">
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </div>
  );
}

export default ExperienceList;
