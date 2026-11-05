/* Decorative illustrations: hero T mark, product mockups with sample data, digital twin, map */
import { useEffect, useRef, useState } from 'react';
import { useLang } from '../i18n.jsx';
import { Icon } from '../icons.jsx';

const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Number that counts up the first time it scrolls into view. Keeps separators and suffixes ("12,480", "87%");
   four-digit years and reduced motion show the value as it is. */
export function Count({ value }) {
  const ref = useRef();
  const [shown, setShown] = useState(value);
  useEffect(() => {
    setShown(value);
    const m = /^(\D*)([\d,]+)(.*)$/.exec(value);
    if (!m || /^\d{4}$/.test(value) || RM || !('IntersectionObserver' in window)) return;
    const n = +m[2].replace(/,/g, ''), fmt = v => m[1] + (m[2].includes(',') ? v.toLocaleString('en-US') : v) + m[3];
    let raf;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = now => { const p = Math.min(1, (now - t0) / 1400); setShown(fmt(Math.round(n * (1 - (1 - p) ** 3)))); if (p < 1) raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    }, { rootMargin: '0px 0px -8% 0px' });
    io.observe(ref.current);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value]);
  return <span ref={ref} className="count">{shown}</span>;
}

/* Twins Health "t", from assets/logos/t-mark.svg (viewBox 298 149.5 44 97) */
const T_PATH = 'M319.9,218.4c0,3.4,2.8,6.2,6.2,6.2h12.6c0.6,0,1.1,0.5,1.1,1.1v17.6c0,0.6-0.5,1.1-1.1,1.1h-11.8c-9.8,0-18.7-5.3-23.5-13.8c-2.2-4-3.4-8.5-3.4-13v-11.8c0-0.6,0.5-1.1,1.1-1.1h16.5c1,0,1.8-0.8,1.8-1.8v-2.6c0-6.7-5.5-12.2-12.2-12.2h-6.1c-0.6,0-1.1-0.5-1.1-1.1v-17.6c0-0.6,0.5-1.1,1.1-1.1h16.5c0.9,0,1.7-0.8,1.8-1.7v-13.8c0-0.6,0.5-1.1,1.1-1.1h6.1c6.7,0,12.2,5.5,12.2,12.2v3.3c0,0.6-0.5,1.1-1.1,1.1h-16.1c-1,0-1.8,0.8-1.8,1.8v16.4c0,1,0.8,1.8,1.8,1.8h17c0.6,0,1.1,0.5,1.1,1.1v14.3c0,0.6-0.5,1.1-1.1,1.1h-17c-1,0-1.8,0.8-1.8,1.8V218.4z';
const ECG = 'M0 20 H34 l5 -9 l6 19 l6 -27 l6 17 l4 0 H82 l4 -6 l4 6 H120';

const Ring = () => <svg viewBox="0 0 80 80"><circle cx="40" cy="40" r="32" className="rbg" /><circle cx="40" cy="40" r="32" className="rfg" /></svg>;

/* Care network rings and the T that draws itself, shared by the home hero and the page headers */
const Net = () => (
  <svg className="hv-net" viewBox="0 0 400 400">
    <circle className="hv-orbit" cx="200" cy="200" r="120" /><circle className="hv-orbit o2" cx="200" cy="200" r="176" />
    <g className="hv-spin"><circle className="hv-node" cx="200" cy="80" r="5" /><circle className="hv-node sm" cx="320" cy="200" r="3.5" /></g>
    <g className="hv-spin rev"><circle className="hv-node sm" cx="200" cy="376" r="4" /><circle className="hv-node" cx="24" cy="200" r="5" /></g>
  </svg>
);
const HeroT = ({ id }) => (
  <svg className="hv-t" viewBox="298 149.5 44 97">
    <defs><linearGradient id={id} gradientUnits="userSpaceOnUse" x1="302.5" y1="234.1" x2="347.4" y2="162.4"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#59C4C5" /></linearGradient></defs>
    <path className="hv-t-fill" d={T_PATH} fill={'url(#' + id + ')'} /><path className="hv-t-line" d={T_PATH} pathLength="1" />
  </svg>
);

/* Page headers: a quieter version of the home hero art, so the page title still leads */
export const BannerArt = () => <div className="b-art" aria-hidden="true"><Net /><span className="hv-glow" /><HeroT id="baTg" /></div>;

/* Home hero: the T assembles inside a slowly turning care network, with sample patient cards floating around it */
export function HeroVisual() {
  const m = useLang().t.mock, p = m.rows[2];
  return (
    <div className="hero-viz" aria-hidden="true">
      <Net />
      <span className="hv-glow" />
      <HeroT id="hvTg" />
      <div className="hv-card hv-bp"><span className="hv-ic"><Icon name="activity" /></span><div><b>{m.cards[2][1]}</b><small>{m.cards[2][2]}</small></div>
        <svg className="hv-ecg" viewBox="0 0 120 32" preserveAspectRatio="none"><path d={ECG} /><path className="pulse" d={ECG} pathLength="1" /></svg></div>
      <div className="hv-card hv-visit"><span className="hv-ic"><Icon name="video" /></span><div><b>{m.cards[0][1]}</b><small>{m.cards[0][2]}</small></div><i className="live" /></div>
      <div className="hv-card hv-pt"><span className="pav">{p[0]}</span><div><b>{p[1]}</b><small>{p[2]}</small></div><em className={'risk ' + p[4]}>{p[3]}</em></div>
      <div className="hv-card hv-ring"><Ring /><div><b>72%</b><small>{m.ring}</small></div></div>
    </div>
  );
}

/* Admissions avoided, last 12 months (sample data) */
const LINE = 'M0 110 L38 104 L76 98 L114 100 L152 86 L190 80 L228 72 L266 60 L304 56 L342 42 L380 34 L420 22';

/* Saned Health population dashboard and Beneficiary App, with sample data */
export function Dashboard() {
  const { t } = useLang(), m = t.mock;
  return (
    <div className="stage dash">
      <div className="mock-wrap" role="img" aria-label={m.aria}>
        <div className="win" aria-hidden="true"><div className="win-bar"><span /><span /><span /><b>{m.title}</b></div>
          <div className="win-body">
            <div className="win-side">{['layout-dashboard', 'users', 'heart-pulse', 'calendar', 'bar-chart-3', 'settings'].map((n, i) => <span className={i ? '' : 'on'} key={n}><Icon name={n} /></span>)}</div>
            <div className="win-main">
              <div className="kpis">{m.k.map(k => <div className="kpi" key={k[0]}><small>{k[0]}</small><b><Count value={k[1]} /></b><em>{k[2]}</em></div>)}</div>
              <div className="chart-card"><div className="cc-h"><b>{m.chartT}</b><span>{m.chartS}</span></div>
                <div className="chart-box">
                  <svg viewBox="0 0 420 130" className="chart" preserveAspectRatio="none"><g className="gridl">{[20, 55, 90, 125].map(y => <line key={y} x1="0" x2="420" y1={y} y2={y} />)}</g></svg>
                  <svg viewBox="0 0 420 130" className="chart draw" preserveAspectRatio="none"><path className="area" d={LINE + ' L420 130 L0 130Z'} /><path className="line" d={LINE} /></svg>
                </div></div>
              <div className="plist">{m.rows.map(r => <div className="prow" key={r[1]}><span className="pav">{r[0]}</span><div><b>{r[1]}</b><small>{r[2]}</small></div><em className={'risk ' + r[4]}>{r[3]}</em></div>)}</div>
            </div></div></div>
        <div className="phone" aria-hidden="true"><div className="ph-notch" /><div className="ph-screen"><small className="ph-hi">{m.hi}</small><b className="ph-name">{m.name}</b>
          <div className="ph-ring"><Ring /><div><b>72%</b><small>{m.ring}</small></div></div>
          {m.cards.map(c => <div className="ph-card" key={c[1]}><Icon name={c[0]} /><div><b>{c[1]}</b><small>{c[2]}</small></div></div>)}</div></div>
      </div>
      <p className="mock-cap">{t.mockCap}</p>
    </div>
  );
}

/* Saned Health at a glance, from the site's own data: the 17 solutions by solution area, and the 42 Model of Care
   interventions by System of Care */
export function Insights() {
  const { t, D } = useLang();
  const C = 2 * Math.PI * 42, total = D.SOL.length, max = Math.max(...D.MOC.map(m => m[1]));
  const zones = D.ZONES.map(z => [z, D.SOL.filter(s => s.z === z.z).length]);
  let start = 0;
  return (
    <div className="insights">
      <p className="ins-h"><i className="live" />{t.platEyebrow}</p>
      <div className="ins-grid">
        <div className="donut" aria-hidden="true"><svg viewBox="0 0 100 100"><circle className="seg-bg" cx="50" cy="50" r="42" />
          {zones.map(([z, n], k) => { const len = n / total * C, el = <circle key={z.z} className={'seg z' + z.z} cx="50" cy="50" r="42" strokeDasharray={`${len} ${C}`} strokeDashoffset={-start} style={{ '--k': k }} />; start += len; return el; })}</svg>
          <div className="donut-c"><b><Count value={t.stats[0][0]} /></b><small>{t.solutions}</small></div></div>
        <ul className="legend">{zones.map(([z, n]) => <li key={z.z}><i className={'z' + z.z} /><span><small>{t.zone(z)}</small>{z.name}</span><b><Count value={String(n)} /></b></li>)}</ul>
      </div>
      <div className="moc-card"><div className="cc-h"><b><Count value={t.stats[1][0]} /> {t.mocBig}</b><span>{t.mocEyebrow}</span></div>
        {D.MOC.map((m, k) => <div className={'ins-bar' + (m[2] ? ' cc' : '')} key={m[0]}><span>{m[0]}</span><span className="mt"><i style={{ '--w': (m[1] / max * 100).toFixed(0) + '%', '--k': k }} /></span><b>{m[1]}</b></div>)}
      </div>
    </div>
  );
}

/* Large, faint Twins Health "t" for dark brand sections */
export const TWatermark = () => <svg className="t-watermark" viewBox="298 149.5 44 97" aria-hidden="true"><path d={T_PATH} /></svg>;

const BODY = 'M0 0 C -40 0 -58 30 -62 70 L -66 150 C -66 160 -52 162 -50 152 L -42 92 L -40 230 C -40 242 -22 244 -20 232 L -8 140 L 8 140 L 20 232 C 22 244 40 242 40 230 L 42 92 L 50 152 C 52 162 66 160 66 150 L 62 70 C 58 30 40 0 0 0Z';
const LINK1 = 'M175 120 C 230 90, 250 90, 285 120';

export function Twin() {
  const w = useLang().t.twin;
  return (
    <svg className="twin" viewBox="0 0 520 380" role="img" aria-label={w.aria}>
      <defs><linearGradient id="tg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#57BDC1" /><stop offset="1" stopColor="#263367" /></linearGradient>
        <pattern id="tdots" width="9" height="9" patternUnits="userSpaceOnUse"><circle cx="4.5" cy="4.5" r="1.7" fill="#43859C" /></pattern>
        <clipPath id="tclip"><circle cx="330" cy="56" r="26" /><path transform="translate(330 92)" d={BODY} /></clipPath></defs>
      <g><circle cx="130" cy="56" r="26" fill="url(#tg)" /><path transform="translate(130 92)" d={BODY} fill="url(#tg)" /></g>
      <g className="tw-links"><path d={LINK1} /><path d="M180 210 C 230 240, 250 240, 285 210" /><circle className="tw-pulse" r="4"><animateMotion dur="2.6s" repeatCount="indefinite" path={LINK1} /></circle></g>
      <g clipPath="url(#tclip)"><rect x="250" y="20" width="170" height="320" fill="url(#tdots)" opacity=".85" /></g>
      <circle cx="330" cy="56" r="26" className="tw-out" /><path transform="translate(330 92)" d={BODY} className="tw-out" />
      <g className="tw-tags">
        <g transform="translate(372 70)"><line x1="0" y1="0" x2="34" y2="-18" /><rect x="34" y="-34" width="100" height="30" rx="6" /><text x="84" y="-15">{w.vitals}</text></g>
        <g transform="translate(380 170)"><line x1="0" y1="0" x2="30" y2="0" /><rect x="30" y="-15" width="100" height="30" rx="6" /><text x="80" y="4">{w.risk}</text></g>
        <g transform="translate(360 280)"><line x1="0" y1="0" x2="34" y2="20" /><rect x="34" y="6" width="100" height="30" rx="6" /><text x="84" y="25">{w.plan}</text></g>
      </g>
      <text x="130" y="362" className="tw-lab">{w.patient}</text><text x="330" y="362" className="tw-lab">{w.twin}</text>
    </svg>
  );
}

export function MapCard() {
  const { t } = useLang();
  return (
    <div className="card mapcard" aria-hidden="true"><svg viewBox="0 0 400 250"><path className="rd" d="M-10 70 L410 50" /><path className="rd" d="M-10 200 L410 180" /><path className="rd" d="M110 -10 L130 260" /><path className="rd" d="M300 -10 L315 260" /><path className="main" d="M-10 135 L410 115" /><path className="rd2" d="M-10 20 L410 5" /><path className="rd2" d="M40 -10 L55 260" /><path className="rd2" d="M210 -10 L220 260" /><path className="rd2" d="M370 -10 L380 260" /><path className="pin" d="M205 62c-20 0-35 15-35 34 0 26 35 63 35 63s35-37 35-63c0-19-15-34-35-34zm0 47a13 13 0 1 1 0-26 13 13 0 0 1 0 26z" /></svg><span className="chip">{t.mapLabel}</span></div>
  );
}

/* Innovation: data from many sources flows through AI, cloud and interoperability into decisions for three audiences.
   Lines are drawn left to right and mirrored in RTL by CSS. */
const rows = n => Array.from({ length: n }, (_, i) => ((i + .5) / n * 100).toFixed(1));
export function DataFlow() {
  const v = useLang().t.viz.data;
  return (
    <div className="dflow" role="img" aria-label={v.aria}>
      <svg className="df-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {rows(v.src.length).map((y, i) => <path key={'s' + i} d={`M18 ${y} C 36 ${y}, 34 50, 50 50`} />)}
        {rows(v.out.length).map((y, i) => <path key={'o' + i} className="out" d={`M50 50 C 66 50, 64 ${y}, 82 ${y}`} />)}
      </svg>
      <ul className="df-col df-src">{v.src.map(([ic, l]) => <li key={l}><Icon name={ic} />{l}</li>)}</ul>
      <div className="df-hub"><span className="df-ring" /><ul>{v.hub.map(([ic, l]) => <li key={l}><Icon name={ic} />{l}</li>)}</ul></div>
      <ul className="df-col df-out">{v.out.map(([ic, l]) => <li key={l}><Icon name={ic} />{l}</li>)}</ul>
    </div>
  );
}

/* About, our story: one patient, with medical, mental and social records in separate systems that don't connect.
   Card centres and break points are in % of the box (mirrored for Arabic); the SVG lines use the same 0-100 coordinates. */
const FRAG = [{ c: [30, 22], m: [40, 36] }, { c: [72, 40], m: [61, 45] }, { c: [33, 79], m: [38, 70] }];
export function Fragmented() {
  const { t, lang } = useLang(), v = t.viz.frag, X = x => (lang === 'ar' ? 100 - x : x) + '%';
  return (
    <div className="frag" role="img" aria-label={v.aria}>
      <svg className="frag-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
        {FRAG.map(({ c, m }, i) => <g key={i}>
          <path d={`M50 50 L${50 + (m[0] - 50) * .7} ${50 + (m[1] - 50) * .7}`} />
          <path d={`M${m[0] + (c[0] - m[0]) * .3} ${m[1] + (c[1] - m[1]) * .3} L${c[0]} ${c[1]}`} />
        </g>)}
      </svg>
      <div className="frag-patient"><svg viewBox="-70 28 140 220"><circle cx="0" cy="56" r="26" /><path transform="translate(0 92)" d={BODY} /></svg><b>{v.patient}</b></div>
      {v.sys.map(([ic, l], i) => <div className={'frag-card f' + i} key={l} style={{ left: X(FRAG[i].c[0]), top: FRAG[i].c[1] + '%' }}><span className="frag-ic"><Icon name={ic} /></span><b>{l}</b><i /><i /></div>)}
      {FRAG.map(({ m }, i) => <span className={'frag-break b' + i} key={i} style={{ left: X(m[0]), top: m[1] + '%' }}><Icon name="unlink" /></span>)}
    </div>
  );
}

/* History, today and beyond: a care network spreading outward from Riyadh in rings */
const NET = (() => {
  const C = [160, 250], ring = (r, n, off) => Array.from({ length: n }, (_, i) => { const a = off + i / n * 2 * Math.PI; return [C[0] + r * Math.cos(a), C[1] + r * Math.sin(a)]; });
  const R = [ring(62, 6, -Math.PI / 2), ring(118, 10, -Math.PI / 2.4), ring(178, 14, -Math.PI / 2.2)];
  const near = (p, list) => list.reduce((b, q) => (Math.hypot(q[0] - p[0], q[1] - p[1]) < Math.hypot(b[0] - p[0], b[1] - p[1]) ? q : b));
  const links = [...R[0].map(p => [C, p, 0]), ...R[1].map(p => [near(p, R[0]), p, 1]), ...R[2].map(p => [near(p, R[1]), p, 2])];
  return { C, R, links };
})();
export function ScaleNet() {
  const v = useLang().t.viz.scale;
  const { C, R, links } = NET;
  return (
    <div className="jr-today-viz">
      <svg viewBox="0 0 320 400" preserveAspectRatio="xMidYMid slice" role="img" aria-label={v.aria}>
        <g className="sn-globe"><circle cx={C[0]} cy={C[1]} r="178" /><ellipse cx={C[0]} cy={C[1]} rx="70" ry="178" /><ellipse cx={C[0]} cy={C[1]} rx="130" ry="178" /><line x1={C[0] - 178} x2={C[0] + 178} y1={C[1]} y2={C[1]} /><ellipse cx={C[0]} cy={C[1]} rx="178" ry="60" /></g>
        {[0, 1, 2].map(i => <circle key={i} className="sn-ripple" cx={C[0]} cy={C[1]} r="20" style={{ '--d': i * 1.2 + 's' }} />)}
        <g className="sn-links">{links.map(([a, b, k], i) => <line key={i} className={'l' + k} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />)}</g>
        {R.map((ring, k) => ring.map((p, i) => <circle key={k + '-' + i} className={'sn-node n' + k} cx={p[0]} cy={p[1]} r={[5, 4, 3][k]} style={{ '--d': k * .6 + (i % 3) * .2 + 's' }} />))}
        <circle className="sn-hub" cx={C[0]} cy={C[1]} r="10" /><text className="sn-label" x={C[0]} y={C[1] + 30}>{v.hub}</text>
      </svg>
    </div>
  );
}
