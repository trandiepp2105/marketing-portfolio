import Badge from '../../shared/Badge/Badge';
import './EducationCard.scss';

function EducationCard({ education }) {
  return (
    <article className="education-card">
      <Badge variant="light">school&nbsp; Academic Background</Badge>
      <div>
        <h3>{education.institution}</h3>
        <p className="education-card__period">{education.period}</p>
      </div>
      <div className="education-card__major">
        <strong>Major: {education.major}</strong>
        <Badge variant="light">GPA: {education.gpa}</Badge>
        <p>{education.description}</p>
      </div>
      <div className="education-card__coursework">
        <span>Notable coursework highlights</span>
        <div>
          {education.coursework.map((course) => (
            <article key={course.subject}>
              <strong>{course.score}</strong>
              <span>{course.subject}</span>
            </article>
          ))}
        </div>
      </div>
    </article>
  );
}

export default EducationCard;
