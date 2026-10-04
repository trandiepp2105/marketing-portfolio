import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <span>404 // PAGE NOT FOUND</span>
      <h1>This page is off the map.</h1>
      <p>The address may have changed or does not exist.</p>
      <div>
        <Link to="/">Back to profile</Link>
        <Link to="/projects/crossfire-legends">Explore projects</Link>
      </div>
    </section>
  );
}

export default NotFoundPage;
