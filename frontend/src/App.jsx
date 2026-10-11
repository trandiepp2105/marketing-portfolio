import { Route, Routes } from 'react-router-dom';
import SiteFooter from './components/layout/SiteFooter/SiteFooter';
import SiteHeader from './components/layout/SiteHeader/SiteHeader';
import AdminAuthGate from './components/auth/AdminAuthGate/AdminAuthGate';
import ContactPage from './pages/ContactPage/ContactPage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ProjectsPage from './pages/ProjectsPage/ProjectsPage';
import ProjectsIndexPage from './pages/ProjectsIndexPage/ProjectsIndexPage';
import './App.scss';

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route
          path="/admin/*"
          element={
            <AdminAuthGate>
              <AdminDashboard />
            </AdminAuthGate>
          }
        />
        <Route path="*" element={<PublicPortfolio />} />
      </Routes>
    </div>
  );
}

function PublicPortfolio() {
  return (
    <>
      <SiteHeader />
      <main className="app-shell__main" id="main-content">
        <Routes>
          <Route path="/" element={<ProfilePage />} />
          <Route path="/projects" element={<ProjectsIndexPage />} />
          <Route path="/projects/:brandSlug" element={<ProjectsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </>
  );
}

export default App;
