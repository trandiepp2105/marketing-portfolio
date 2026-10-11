import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getBrandProjectsPath } from '../../routes/paths';
import { getBrands } from '../../services/brandService';
import './ProjectsIndexPage.scss';

/** Sends the generic projects route to the first currently published brand. */
function ProjectsIndexPage() {
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    let isCurrent = true;

    getBrands()
      .then((brands) => {
        if (isCurrent) {
          setDestination(brands[0] ? getBrandProjectsPath(brands[0].slug) : '/');
        }
      })
      .catch(() => {
        if (isCurrent) {
          setDestination('/');
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  if (!destination) {
    return (
      <div className="projects-index-page" role="status">
        Loading projects…
      </div>
    );
  }

  return <Navigate to={destination} replace />;
}

export default ProjectsIndexPage;
