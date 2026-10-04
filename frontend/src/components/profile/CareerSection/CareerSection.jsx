import SectionHeading from '../../shared/SectionHeading/SectionHeading';
import EducationCard from '../EducationCard/EducationCard';
import ExperienceList from '../ExperienceList/ExperienceList';
import './CareerSection.scss';

function CareerSection({ experience, education }) {
  return (
    <section className="career-section" id="experience" aria-labelledby="career-heading">
      <div className="career-section__inner">
        <SectionHeading
          eyebrow="Verified record"
          title="Experience & Education"
          titleId="career-heading"
        />
        <div className="career-section__grid">
          <ExperienceList experiences={experience} />
          <EducationCard education={education} />
        </div>
      </div>
    </section>
  );
}

export default CareerSection;
