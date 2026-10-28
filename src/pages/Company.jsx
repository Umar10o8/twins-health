/* Company pages: About Us, Our Team, Our Management, Our Journey */
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { L, useLang, coLink, CO_KEYS } from '../i18n.jsx';
import { Icon, Arr } from '../icons.jsx';
import { IMG, BADGE_LOGOS } from '../config.js';
import { Pattern, Banner, SHead, Cta, IconCard, BadgeCard, VisionMission, usePageMeta } from '../components/common.jsx';
import { Twin } from '../components/graphics.jsx';
import { NotFound } from './Main.jsx';

const RM = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Split a paragraph into its first sentence and the rest */
const splitFirst = s => { const m = s.match(/^(.*?[.؟!][”»]?)\s+(\S[\s\S]*)$/); return m ? [m[1], m[2]] : [s, '']; };

const CoBanner = ({ label, h1, sub }) => { const { co } = useLang(); return <Banner crumbs={[[co.nav, coLink('about')], [label]]} h1={h1} lede={sub} />; };

function AboutUs() {
  const { co: c } = useLang(), a = c.about;
  return <>
    <CoBanner label={c.aboutUs} h1={a.h1} sub={a.sub} />
    <section className="sec"><div className="wrap split" style={{ alignItems: 'center' }}>
      <div className="prose rv"><p className="eyebrow">{c.aboutUs}</p><h2 className="h2">{a.whoT}</h2>{a.who.map((p, i) => i ? <p key={i}>{p}</p> : <p key={i} className="lead" style={{ marginTop: '1rem' }}>{p}</p>)}</div>
      <div className="rv co-art"><img className="co-photo" src={IMG.aboutTerrace} alt="" width="1600" height="893" /></div>
    </div></section>
    <section className="sec alt"><div className="wrap"><SHead eyebrow={c.aboutUs} h2={a.doT} /><div className="grid g3">{a.do.map((d, i) => <IconCard key={i} item={d} className="co-cap" />)}</div></div></section>
    <section className="glance"><div className="wrap"><h2 className="sr-only">{a.glanceT}</h2><div className="glance-grid rv">{a.glance.map((g, i) => <div className="stat" key={i}><b>{g[0]}</b><span>{g[1]}</span></div>)}</div></div></section>
    <section className="sec"><div className="wrap"><VisionMission className="co-vm" vT={a.visionT} v={a.vision} mT={a.missionT} m={a.mission} /></div></section>
    <section className="sec alt"><div className="wrap"><SHead eyebrow={c.aboutUs} h2={a.valuesT} /><div className="grid g5">{a.values.map((v, i) => <IconCard key={i} item={v} />)}</div></div></section>
    <section className="sec v2030"><Pattern /><div className="wrap" style={{ position: 'relative' }}><div className="split" style={{ alignItems: 'center' }}><div className="rv"><p className="eyebrow">{c.aboutUs}</p><h2 className="h2" style={{ color: '#fff' }}>{a.v2030T}</h2></div><p className="rv co-light">{a.v2030}</p></div></div></section>
    <section className="sec"><div className="wrap"><SHead eyebrow={c.aboutUs} h2={a.mocT} /><div className="moc"><div className="big rv"><b>42</b><span>{a.mocBig}</span></div><div className="card rv co-text"><p>{a.moc}</p></div></div></div></section>
    <section className="sec alt"><div className="wrap split" style={{ alignItems: 'center' }}><div className="prose rv"><p className="eyebrow">{c.aboutUs}</p><h2 className="h2">{a.aiT}</h2><p className="lead" style={{ marginTop: '1rem' }}>{a.ai}</p></div><div className="rv"><Twin /></div></div></section>
    <section className="sec"><div className="wrap"><SHead eyebrow={c.aboutUs} h2={a.qT} /><div className="grid g4 badges">{a.q.map((b, i) => <BadgeCard key={i} item={b} logo={BADGE_LOGOS[i]} />)}</div></div></section>
    <section className="cta co-cta"><div className="wrap"><div><h2>{a.ctaT}</h2><p>{a.ctaP}</p><L className="btn btn-primary" to="/contact">{a.ctaBtn} <Arr /></L></div>
      <address className="co-addr"><a href="mailto:sales@twinshealth.sa"><Icon name="mail" /><span>sales@twinshealth.sa</span></a><a href="tel:+966115001950"><Icon name="phone" /><span dir="ltr">+966 11 500 1950</span></a><span><Icon name="map-pin" /><span>{a.address}</span></span></address></div></section>
  </>;
}

export function Team() {
  const { co: c } = useLang(), m = c.team;
  usePageMeta(c.TITLES.team, c.META.team);
  return <>
    <CoBanner label={c.teamL} h1={m.h1} sub={m.sub} />
    <section className="sec"><div className="wrap split" style={{ alignItems: 'center' }}><div className="prose rv"><p className="eyebrow">{c.teamL}</p><h2 className="h2">{m.whoT}</h2><p className="lead" style={{ marginTop: '1rem' }}>{m.who}</p></div><div className="rv co-art"><img className="co-photo team-photo" src={IMG.brandTablet} alt="" width="1100" height="1320" loading="lazy" /></div></div></section>
    <section className="sec alt"><div className="wrap"><SHead eyebrow={c.teamL} h2={m.bringT} /><div className="grid g2">{m.bring.map((b, i) => <IconCard key={i} item={b} className="co-cap" />)}</div></div></section>
    <section className="sec"><div className="wrap"><SHead eyebrow={c.teamL} h2={m.howT} /><div className="grid g4">{m.how.map((h, i) => <IconCard key={i} item={h} />)}</div></div></section>
    <section className="sec tint"><div className="wrap"><SHead eyebrow={c.teamL} h2={m.stdT} p={m.std} /><ul className="team-standards">{c.about.q.map(([icon, label]) => <li className="card rv" key={label}><Icon name={icon} /><span>{label}</span></li>)}</ul></div></section>
    <section className="cta"><div className="wrap"><div><h2>{m.joinT}</h2><p>{m.join}</p></div><div className="btns"><L className="btn btn-primary" to="/contact">{m.joinBtn} <Arr /></L></div></div></section>
  </>;
}

function Management() {
  const { co: c, q } = useLang(), g = c.mgmt;
  return <>
    <CoBanner label={c.mgmtL} h1={g.h1} sub={g.sub} />
    <section className="sec"><div className="wrap"><p className="lead co-intro rv">{g.intro}</p></div></section>
    <section className="sec alt"><div className="wrap"><SHead eyebrow={c.mgmtL} h2={g.groupT} /><div className="card ceo rv"><div className="ph"><img src={IMG.ao} alt={g.ceoName} width="480" height="480" /></div><div><h3 style={{ fontSize: '1.75rem' }}>{g.ceoName}</h3><p className="role">{g.ceoRole}</p><blockquote>{q(g.quote)}</blockquote></div></div></div></section>
    <section className="sec"><div className="wrap"><SHead eyebrow={c.mgmtL} h2={g.teamT} /><div className="grid g5">{g.team.map((p, i) => <div className={'person card rv' + (i ? '' : ' lead')} key={p[0]}><div className="ph"><img src={IMG[p[2]]} alt={p[0]} width="480" height="480" loading="lazy" /></div><h3>{p[0]}</h3><p>{p[1]}</p></div>)}</div></div></section>
    <Cta />
  </>;
}

function Milestone({ m, i, first }) {
  const { co: c } = useLang();
  const [open, setOpen] = useState(false);
  const [pre, rest] = splitFirst(m[3]), id = `ms-${i}`;
  return (
    <li className="jr-item rv" id={first ? `ms-${m[0]}` : undefined}><span className="jr-dot" aria-hidden="true" />
      <article className="card jr-card">
        <button type="button" className="jr-trigger" aria-expanded={open} aria-controls={id} onClick={() => setOpen(o => !o)}>
          <time className="jr-date">{m[1]}</time><span className="jr-title">{m[2]}</span><span className="jr-summary">{pre}</span>
          <span className="jr-btn">{open ? c.readLess : c.readMore} <Icon name="chevron-down" /></span>
        </button>
        <div className="jr-more" id={id} hidden={!open}><p>{rest || m[3]}</p></div>
      </article></li>
  );
}

export function History() {
  const { co: c } = useLang(), j = c.journey, years = [...new Set(j.ms.map(m => m[0]))];
  usePageMeta(c.TITLES.history, c.META.history);
  const jump = (e, y) => {
    e.preventDefault();
    const el = document.getElementById('ms-' + y); if (!el) return;
    el.classList.add('in'); el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth', block: 'start' }); el.querySelector('.jr-trigger')?.focus({ preventScroll: true });
  };
  return <>
    <CoBanner label={c.journeyL} h1={j.h1} sub={j.sub} />
    <section className="sec jr"><div className="wrap">
      <nav className="jr-years" aria-label={c.jumpTo}><span>{c.jumpTo}</span>{years.filter(y => y !== 'today').map(y => <a key={y} href={'#ms-' + y} dir="ltr" onClick={e => jump(e, y)}>{y}</a>)}</nav>
      <ol className="jr-line">{j.ms.map((m, i) => <Milestone key={i} m={m} i={i} first={j.ms.findIndex(x => x[0] === m[0]) === i} />)}</ol>
      <div className="jr-today rv"><Pattern /><div><p className="eyebrow">{c.journeyL}</p><h2>{j.todayT}</h2><p>{j.today}</p></div><img className="jr-today-photo" src={IMG.overhead} alt="" width="1441" height="1800" loading="lazy" /></div>
    </div></section>
    <Cta />
  </>;
}

const PAGES = { about: AboutUs, team: Team, leadership: Management, history: History };

export default function Company() {
  const { sub } = useParams();
  const { co } = useLang();
  const key = sub === undefined ? 'about' : CO_KEYS[sub];
  usePageMeta(key ? co.TITLES[key] : '', key ? co.META[key] : '');
  if (!key) return <NotFound />;
  const Page = PAGES[key];
  return <Page />;
}
