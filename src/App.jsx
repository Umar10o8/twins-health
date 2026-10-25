import { useEffect, useMemo, useRef } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { LangContext, makeLang } from './i18n.jsx';
import Layout from './components/Layout.jsx';
import { Home, About, Solutions, Solution, Innovation, Leadership, NotFound } from './pages/Main.jsx';
import Contact from './pages/Contact.jsx';
import Company, { Team, History } from './pages/Company.jsx';

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Fade-up reveal for .rv elements; everything already on screen shows at once */
function reveal(root) {
  const els = root.querySelectorAll('.rv');
  if (RM || !('IntersectionObserver' in window)) { els.forEach(e => e.classList.add('in')); return; }
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach(e => { if (e.getBoundingClientRect().top < innerHeight) e.classList.add('in'); else io.observe(e); });
  return () => io.disconnect();
}

function Pages() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="team" element={<Team />} />
      <Route path="history" element={<History />} />
      <Route path="solutions" element={<Solutions />} />
      <Route path="solutions/:id" element={<Solution />} />
      <Route path="innovation" element={<Innovation />} />
      <Route path="leadership" element={<Leadership />} />
      <Route path="contact" element={<Contact />} />
      <Route path="company" element={<Company />} />
      <Route path="company/:sub" element={<Company />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

/* /en/... is the same page as the unprefixed English route */
function StripEn() {
  const rest = useParams()['*'];
  const { search, hash } = useLocation();
  return <Navigate to={'/' + (rest || '') + search + hash} replace />;
}

export default function App() {
  const { pathname } = useLocation();
  const lang = pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
  const value = useMemo(() => makeLang(lang), [lang]);
  const first = useRef(true);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang; root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  /* After each navigation: back to top, focus the page title (not on first load), start reveals */
  useEffect(() => {
    window.scrollTo(0, 0);
    if (!first.current) document.getElementById('pageTitle')?.focus({ preventScroll: true });
    first.current = false;
    return reveal(document.getElementById('app'));
  }, [pathname]);

  return (
    <LangContext.Provider value={value}>
      <Layout>
        <Routes>
          <Route path="/en/*" element={<StripEn />} />
          <Route path="/ar/*" element={<Pages />} />
          <Route path="/*" element={<Pages />} />
        </Routes>
      </Layout>
    </LangContext.Provider>
  );
}
