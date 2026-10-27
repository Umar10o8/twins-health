import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { L, useLang } from '../i18n.jsx';
import { Icon, Arr, SOL_ICON } from '../icons.jsx';
import { IMG, SITE_URL } from '../config.js';

export const Pattern = () => <div className="pattern" aria-hidden="true" />;

/* Per-route <title>, meta description, canonical and hreflang */
export function usePageMeta(title, desc) {
  const { pathname } = useLocation();
  const { prefix } = useLang();
  useEffect(() => {
    if (!title) return;
    document.title = title;
    const set = (sel, v) => { const m = document.querySelector(sel); if (m) m.setAttribute('content', v); };
    set('meta[name=description]', desc); set('meta[property="og:title"]', title); set('meta[property="og:description"]', desc);
    set('meta[name="twitter:title"]', title); set('meta[name="twitter:description"]', desc);
    const rest = prefix ? pathname.slice(prefix.length) || '/' : pathname;
    const url = p => SITE_URL + p;
    const link = (sel, v) => { const m = document.querySelector(sel); if (m) m.setAttribute('href', v); };
    link('link[rel=canonical]', url(pathname)); set('meta[property="og:url"]', url(pathname));
    link('link[hreflang=en]', url(rest)); link('link[hreflang=x-default]', url(rest));
    link('link[hreflang=ar]', url('/ar' + (rest === '/' ? '' : rest)));
  }, [title, desc, pathname, prefix]);
}

/* sub: the heading in the other language, shown under the h1 */
export function Banner({ crumbs, h1, sub, lede, children }) {
  const { t, lang } = useLang();
  const other = lang === 'ar' ? 'en' : 'ar';
  return (
    <section className="banner"><Pattern /><div className="wrap"><div>
      <nav className="crumbs" aria-label="Breadcrumb"><ol><li><L to="/">{t.home}</L></li>
        {crumbs.map((c, i) => i === crumbs.length - 1
          ? <li key={i} aria-current="page">{c[0]}</li>
          : <li key={i}><L to={c[1]}>{c[0]}</L></li>)}
      </ol></nav>
      <h1 id="pageTitle" tabIndex={-1}>{h1}</h1>{sub && <p className="sub" lang={other} dir={other === 'ar' ? 'rtl' : 'ltr'}>{sub}</p>}{lede && <p className="lede">{lede}</p>}{children}</div></div></section>
  );
}

export const SHead = ({ eyebrow, h2, p, center }) => (
  <div className={'shead' + (center ? ' center' : '') + ' rv'}><p className="eyebrow">{eyebrow}</p><h2>{h2}</h2>{p && <p>{p}</p>}</div>
);

export function Cta() {
  const { t } = useLang();
  return <section className="cta"><div className="wrap"><div><h2>{t.ctaT}</h2><p>{t.ctaP}</p></div><div className="btns"><L className="btn btn-primary" to="/contact">{t.demo} <Arr /></L><L className="btn btn-outline" to="/solutions">{t.explore}</L></div></div></section>;
}

/* Icon card used across pages: [icon, title, text] */
export const IconCard = ({ item: [ic, h, p], className = '' }) => (
  <div className={'card rv' + (className ? ' ' + className : '')}><span className="ic"><Icon name={ic} /></span><h3>{h}</h3><p>{p}</p></div>
);
export const BadgeCard = ({ item: [ic, h, p], logo }) => (
  <div className={'card rv' + (logo ? ' has-logo' : '')}>{logo
    ? <span className="badge-logo"><img src={logo.src} alt="" width={logo.w} height={logo.h} loading="lazy" /></span>
    : <span className="ic"><Icon name={ic} /></span>}<div><h3>{h}</h3><p>{p}</p></div></div>
);

export function VisionMission({ vT, v, mT, m, className = '' }) {
  return <div className={'vm rv' + (className ? ' ' + className : '')}><div className="card"><h3><Icon name="eye" />{vT}</h3><p>{v}</p></div><div className="card navy"><h3><Icon name="target" />{mT}</h3><p>{m}</p></div></div>;
}

export function Ticks({ items, style }) {
  return <ul className="ticks" style={style}>{items.map((x, i) => <li key={i}><Icon name="circle-check" /><span>{x}</span></li>)}</ul>;
}

export function SolCard({ s, image }) {
  const { t, D, lang } = useLang();
  const zone = D.ZONES.find(z => z.z === s.z);
  const previewVideo = typeof s.previewVideo === 'string' ? s.previewVideo : s.previewVideo?.[lang];
  const startPreview = e => {
    e.currentTarget.play().catch(error => {
      if (error.name !== 'NotAllowedError' && error.name !== 'AbortError') console.error('Could not play solution preview video.', error);
    });
  };
  const stopPreview = e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; };
  return <L className="card rv sol-card" to={'/solutions/' + s.id}>
    {image && <img className="sol-image" src={image} alt="" loading="lazy" />}
    {previewVideo && <video className="sol-preview" src={previewVideo} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} onMouseEnter={startPreview} onMouseLeave={stopPreview} />}
    <div className="top"><span className="ic"><Icon name={SOL_ICON[s.id]} /></span>{zone && <span className="zbadge">{t.zone(zone)}</span>}</div><h3>{s.name}</h3><p>{s.short}</p><span className="more">{t.learn} <Icon name="arrow-right" /></span></L>;
}


export function ProductVideo({ videos = [], label = 'Product videos' }) {
  const items = videos.filter(video => video && typeof video.src === 'string' && video.src.trim());
  if (!items.length) return null;
  return <section className="product-videos" aria-label={label}><div className="wrap">
    {items.map((video, i) => <video className="product-video" key={video.src} controls playsInline muted preload="none" aria-label={video.label || `${label} ${i + 1}`}>
      <source src={video.src} type={video.type || 'video/mp4'} />
    </video>)}
  </div></section>;
}
