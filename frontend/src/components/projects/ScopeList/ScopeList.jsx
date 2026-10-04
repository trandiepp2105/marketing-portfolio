import './ScopeList.scss';

function ScopeList({ items }) {
  return (
    <section className="project-list-card">
      <h4>
        <span aria-hidden="true">assignment_ind</span> My scope
      </h4>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

export default ScopeList;
