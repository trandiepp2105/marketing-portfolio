import { Navigate, Route, Routes } from 'react-router-dom';
import SiteFooter from './components/layout/SiteFooter/SiteFooter';
import SiteHeader from './components/layout/SiteHeader/SiteHeader';
import ContactPage from './pages/ContactPage/ContactPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import './App.scss';

function App() {
  return (
    <div className="app-shell">
      <SiteHeader />
      <main className="app-shell__main" id="main-content">
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/projects" element={<Navigate to="/projects/crossfire-legends" replace />} />
          <Route path="/projects/:brandSlug" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}

export default App;
