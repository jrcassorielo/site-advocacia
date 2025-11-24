import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import CookieConsent from './components/CookieConsent';
import HomePage from './pages/HomePage';
import TrabalhistaPage from './pages/TrabalhistaPage';
import FamiliaPage from './pages/FamiliaPage';
import PrevidenciarioPage from './pages/PrevidenciarioPage';
import ServidoresPage from './pages/ServidoresPage';
import ProfessoresPage from './pages/ProfessoresPage';
import SaudePage from './pages/SaudePage';
import ApoioPage from './pages/ApoioPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import AdminPage from './pages/AdminPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <SmoothScroll />
        <SmoothScroll />
        <CustomCursor />
        <CookieConsent />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/trabalhista" element={<TrabalhistaPage />} />
          <Route path="/familia" element={<FamiliaPage />} />
          <Route path="/previdenciario" element={<PrevidenciarioPage />} />
          <Route path="/servidores" element={<ServidoresPage />} />
          <Route path="/professores" element={<ProfessoresPage />} />
          <Route path="/saude" element={<SaudePage />} />
          <Route path="/apoio-escolar" element={<ApoioPage />} />
          <Route path="/apoio-escolar" element={<ApoioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
