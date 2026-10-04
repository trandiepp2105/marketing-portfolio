import './LearningList.scss';

function LearningList({ items }) {
  return (
    <section className="project-list-card project-list-card--learning">
      <h4>
        <span aria-hidden="true">school</span> Key learnings
      </h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default LearningList;
