import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { L, useLang, coLinks, CO_KEYS, prefixFor } from '../i18n.jsx';
import { Icon, SOL_ICON } from '../icons.jsx';
import { IMG, LOGOS } from '../config.js';

const CO_ICON = { about: 'building-2', team: 'users', leadership: 'briefcase', history: 'route' };

/* Which top-level nav item and which company sub-page are current */
export function useNavKey() {
  const { pathname } = useLocation();
  const { prefix } = useLang();
  const parts = pathname.slice(prefix.length).split('/').filter(Boolean);
  const key = parts[0] || 'home';
  const coKey = key === 'company' ? CO_KEYS[parts[1] || 'about-us'] : CO_KEYS[key] || null;
  return { key, coKey };
}

/* Same page in the other language */
function LangSwitch() {
  const { t, lang } = useLang();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const switchLang = () => {
    const other = lang === 'ar' ? 'en' : 'ar';
    const rest = pathname.slice(prefixFor(lang).length) || '/';
    navigate((prefixFor(other) + (rest === '/' && prefixFor(other) ? '' : rest)) + search);
  };
  return <button type="button" className="lang-btn" lang={lang === 'ar' ? 'en' : 'ar'} aria-label={t.switchAria} onClick={switchLang}><Icon name="languages" /><span>{t.switchLabel}</span></button>;
}

/* ---------- header ---------- */
const canHover = typeof matchMedia !== 'undefined' && matchMedia('(hover:hover)').matches;

function Header() {
  const { t, D, co, lang } = useLang();
  const logo = LOGOS[lang] || LOGOS.en;
  const { key, coKey } = useNavKey();
  const inAboutMenu = ['about', 'team', 'leadership', 'history'].includes(key);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(null);       // id of the open dropdown: 'company' | 'solutions' | null
  const [megaTop, setMegaTop] = useState(0);
  const [mOpen, setMOpen] = useState(false);
  const by = useRef(null), timer = useRef(), hdr = useRef(), dds = useRef({}), btns = useRef({});

  const set = (id, on) => {
    if (on) { setMegaTop(hdr.current.getBoundingClientRect().bottom); setOpen(id); }
    else { by.current = null; setOpen(o => (o === id ? null : o)); }
  };

  useEffect(() => { setOpen(null); setMOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const onClick = e => { if (!dds.current[open]?.contains(e.target)) set(open, false); };
    const onKey = e => { if (e.key === 'Escape') { const id = open; set(id, false); btns.current[id]?.focus(); } };
    const onScroll = () => setMegaTop(hdr.current.getBoundingClientRect().bottom);
    document.addEventListener('click', onClick); document.addEventListener('keydown', onKey);
    addEventListener('scroll', onScroll, { passive: true });
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); removeEventListener('scroll', onScroll); };
  }, [open]);

  const ddProps = id => ({
    ref: el => { dds.current[id] = el; },
    'data-nav': id,
    ...(canHover && {
      onMouseEnter: () => { clearTimeout(timer.current); if (open !== id) by.current = 'hover'; set(id, true); },
      onMouseLeave: () => { timer.current = setTimeout(() => set(id, false), 180); },
    }),
  });
  const ddButton = id => ({
    ref: el => { btns.current[id] = el; }, type: 'button', 'aria-expanded': open === id,
    onClick: e => { e.stopPropagation(); if (open === id && by.current === 'click') set(id, false); else { set(id, true); by.current = 'click'; } },
  });
  const nav = (k, to, label) => <L key={k} to={to} className={key === k ? 'active' : undefined} aria-current={key === k ? 'page' : undefined}>{label}</L>;
  const coNav = (l, inner) => <L key={l.key} to={l.to} className={coKey === l.key ? 'active' : undefined} aria-current={coKey === l.key ? 'page' : undefined}>{inner}</L>;
  const cl = coLinks(co);

  return (
    <header className="site" ref={hdr}>
      <div className="wrap">
        <div className="bar">
          <L className="brand" to="/" aria-label={t.brandAria} title={t.brandAria}>
            <img className="logo-light" src={logo.navy} alt={t.logoAlt} width={logo.w} height={logo.h} />
            <img className="logo-dark" src={logo.white} alt={t.logoAlt} width={logo.w} height={logo.h} />
          </L>
          <nav className="main" aria-label="Main">
            {nav('home', '/', t.home)}
            <div className={'dd compact' + (inAboutMenu ? ' active' : '')} {...ddProps('company')}>
              <button {...ddButton('company')} aria-controls="coMenu"><span>{co.nav}</span><Icon name="chevron-down" /></button>
              <div className={'dd-menu compact' + (open === 'company' ? ' open' : '')} id="coMenu" onMouseEnter={() => clearTimeout(timer.current)}>
                <div className="co-inner">{cl.map(l => coNav(l, <><Icon name={CO_ICON[l.key]} /><span>{l.label}</span></>))}</div>
              </div>
            </div>
            <div className={'dd' + (key === 'solutions' ? ' active' : '')} {...ddProps('solutions')}>
              <button {...ddButton('solutions')} aria-controls="ddMenu"><span>{t.solutions}</span><Icon name="chevron-down" /></button>
              <div className={'dd-menu' + (open === 'solutions' ? ' open' : '')} id="ddMenu" style={{ top: megaTop + 'px' }} onMouseEnter={() => clearTimeout(timer.current)}>
                <div className="dd-inner dd-flat">
                  <div className="ddcol">{D.SOL.map(s => <L key={s.id} to={'/solutions/' + s.id}><Icon name={SOL_ICON[s.id]} /><span>{s.name}</span></L>)}</div>
                  <div className="dd-all"><L className="link" to="/solutions">{t.viewAll} <Icon name="arrow-right" /></L></div>
                </div>
              </div>
            </div>
            {nav('innovation', '/innovation', t.innovation)}
            {nav('contact', '/contact', t.contact)}
          </nav>
          <LangSwitch />
          <L className="btn btn-primary" to="/contact">{t.demo}</L>
          <button className="menu-btn" type="button" aria-expanded={mOpen} aria-controls="mnav" onClick={() => setMOpen(o => !o)}><Icon name="menu" /><span>{mOpen ? t.close : t.menu}</span></button>
        </div>
      </div>
      <nav className={'mobile-nav' + (mOpen ? ' open' : '')} id="mnav" aria-label="Mobile"><div className="wrap">
        {nav('home', '/', t.home)}
        <div className="mco"><p className="mco-h">{co.nav}</p>{cl.map(l => coNav(l, l.label))}</div>
        {nav('solutions', '/solutions', t.solutions)}{nav('innovation', '/innovation', t.innovation)}{nav('contact', '/contact', t.contact)}
        <L className="btn btn-primary" to="/contact">{t.demo}</L>
      </div></nav>
    </header>
  );
}

/* ---------- footer ---------- */
function Footer() {
  const { t, co, lang } = useLang();
  const logo = LOGOS[lang] || LOGOS.en;
  return (
    <footer>
      <div className="wrap">
        <div className="f-top">
          <div className="f-brand">
            <img className="flogo" src={logo.white} alt={t.logoAlt} width={logo.w} height={logo.h} />
            <p className="fnote">{t.fdesc}</p>
            <h2>{t.follow}</h2>
            <p className="follow">
              <a href="https://www.linkedin.com/company/twinshealth/" target="_blank" rel="noopener" aria-label="LinkedIn"><Icon name="linkedin" /></a>
              <a href="https://x.com/twinshealthsa" target="_blank" rel="noopener" aria-label="X"><Icon name="twitter" /></a>
              <a href="https://www.instagram.com/twinshealthsa/" target="_blank" rel="noopener" aria-label="Instagram"><Icon name="instagram" /></a>
            </p>
          </div>
          <div className="f-contact"><h2>{t.fcontact}</h2><ul>
            <li><span className="f-ic"><Icon name="map-pin" /></span><span>{t.address}</span></li>
            <li><a href="tel:+966115001950"><span className="f-ic"><Icon name="phone" /></span><span dir="ltr">+966 11 500 1950</span></a></li>
            <li><a href="mailto:sales@twinshealth.sa"><span className="f-ic"><Icon name="mail" /></span><span>sales@twinshealth.sa</span></a></li>
          </ul></div>
          <nav className="f-quick" aria-label={t.quick}><h2>{t.quick}</h2><ul>
            {coLinks(co).map(l => <li key={l.key}><L to={l.to}>{l.label}</L></li>)}
            <li><L to="/solutions">{t.solutions}</L></li><li><L to="/innovation">{t.innovation}</L></li><li><L to="/contact">{t.contact}</L></li>
          </ul></nav>
        </div>
        <div className="legal"><span>{t.rights}</span><span className="v-note"><i aria-hidden="true" /><span>{t.vnote}</span></span><span className="lk"><a href="https://sanedhealth.com/privacy-policy" target="_blank" rel="noopener">{t.privacy}</a><a href="https://sanedhealth.com/terms-and-conditions" target="_blank" rel="noopener">{t.terms}</a></span></div>
      </div>
    </footer>
  );
}

export default function Layout({ children }) {
  const { t } = useLang();
  const focusTitle = () => { const h = document.getElementById('pageTitle'); (h || document.getElementById('app')).focus(); };
  return <>
    <button className="skip" type="button" onClick={focusTitle}>{t.skip}</button>
    <Header />
    <main id="app" tabIndex={-1}>{children}</main>
    <Footer />
  </>;
}
