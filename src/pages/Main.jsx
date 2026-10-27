import { Navigate, useParams } from 'react-router-dom';
import { L, useLang, Html, DATA } from '../i18n.jsx';
import { Icon, Arr } from '../icons.jsx';
import { IMG, BADGE_LOGOS } from '../config.js';
import { Pattern, BrandSymbol, Banner, SHead, Cta, IconCard, BadgeCard, VisionMission, Ticks, SolCard, ProductVideo, usePageMeta } from '../components/common.jsx';
import { Mockup, Twin } from '../components/graphics.jsx';

const useMeta = key => { const { t } = useLang(); usePageMeta(t.TITLES[key], t.META[key]); };

export function Home() {
  const { t, D, q, lang } = useLang();
  useMeta('home');
  return <>
    <section className="hero"><Pattern /><div className="wrap"><div>
      <p className="eyebrow hero-eyebrow">{t.heroKicker}</p>
      <Html as="h1" id="pageTitle" tabIndex={-1} html={t.heroH1} />
      <p className="lede">{t.heroLede}</p>
      <div className="ctas"><L className="btn btn-teal" to="/contact">{t.demo} <Arr /></L><L className="btn btn-ghost-light" to="/solutions">{t.explore}</L></div></div>
      <div className="hero-visual">
        <img src={IMG.hero} alt={lang === 'ar' ? 'رجل يستخدم جهازًا لوحيًا في الرياض' : 'A man using a tablet in Riyadh'} width="1448" height="1000" />
        <BrandSymbol />
      </div></div>
    </section>
    <div className="stats"><div className="wrap"><div className="grid">{t.stats.map((s, i) => <div className="stat" key={i}><b>{s[0]}</b><span>{s[1]}</span></div>)}</div></div></div>
    <section className="sec alt home-overview"><div className="wrap"><div className="grid g4 home-links">
      {[
        [t.about, '/about', 'building-2', t.aboutP1],
        [t.solutions, '/solutions', 'layers', t.solLede],
        [t.innovation, '/innovation', 'sparkles', t.innLede],
        [t.leadership, '/leadership', 'users', t.leadLede],
      ].map(([title, to, icon, description]) => <L className="card rv home-link" to={to} key={to}>
        <span className="ic"><Icon name={icon} /></span><h2>{title}</h2><p>{description}</p><span className="more">{t.learn} <Icon name="arrow-right" /></span>
      </L>)}
    </div></div></section>
    <section className="sec home-sec home-about"><div className="wrap home-about-grid">
      <div className="home-about-photo rv"><img src={IMG.family} alt={lang === 'ar' ? 'عائلة تستخدم جهازًا لوحيًا معًا' : 'A family using a tablet together'} width="1673" height="1000" loading="lazy" /></div>
      <div className="prose rv home-about-copy"><p className="eyebrow">{t.aboutEyebrow}</p><h2 className="h2">{t.aboutTitle}</h2><p className="lead" style={{ marginTop: '1rem' }}>{t.aboutP1}</p><p>{t.aboutP2}</p>
        <p style={{ marginTop: '1.5rem' }}><L className="link" to="/about">{t.aboutLink} <Icon name="arrow-right" /></L></p></div>
    </div></section>
    <section className="sec tint home-sec home-vm"><div className="wrap"><VisionMission className="home-vm-grid" vT={t.visionT} v={t.visionP} mT={t.missionT} m={t.missionP} /></div></section>
    <section className="sec alt home-sec platform"><div className="wrap split home-platform-grid">
      <div className="rv"><img className="saned saned-logo" src={IMG.saned} alt="Saned Health" width="300" height="88" /><p className="eyebrow">{t.platEyebrow}</p><h2 className="h2">{t.platTitle}</h2>
        <p className="section-lede">{t.platLede}</p><Ticks items={t.platTicks} />
        <p className="actions"><L className="btn btn-outline" to="/solutions">{t.learn} <Arr /></L></p></div>
      <div className="rv platform-visual"><img className="platform-photo" src={IMG.elder} alt="" width="1673" height="1000" loading="lazy" /></div>
    </div></section>
    <section className="sec home-sec home-sol"><div className="wrap"><SHead eyebrow={t.solEyebrow} h2={t.solTitle} p={t.solLede} />
      <div className="grid g3 solutions-grid">{D.SOL.slice(0, 3).map((s, i) => <SolCard key={s.id} s={s} image={[IMG.phone, IMG.watch, IMG.scrubs][i]} />)}</div>
      <p className="actions"><L className="btn btn-outline" to="/solutions">{t.viewAll} <Arr /></L></p>
    </div></section>
    <section className="sec home-sec v2030"><Pattern /><div className="wrap" style={{ position: 'relative' }}><SHead eyebrow={t.vEyebrow} h2={t.vTitle} p={t.vLede} />
      <div className="grid g3">{t.pillars.map((p, i) => <div className="pillar rv" key={i}><span className="ic"><Icon name={p[0]} /></span><h3>{p[1]}</h3><p>{p[3]}</p></div>)}</div>
      <p className="actions"><L className="btn btn-ghost-light" to="/about">{t.vLink} <Arr /></L></p></div></section>
    <section className="sec tint home-sec home-quote"><div className="wrap"><figure className="quote rv">
      <div className="ph"><img src={IMG.ao} alt={t.quoteBy} width="480" height="480" loading="lazy" /></div>
      <div><blockquote>{q(D.QUOTE)}</blockquote><cite><b>{t.quoteBy}</b>, {t.quoteRole}</cite></div>
    </figure></div></section>
    <section className="sec alt home-sec"><div className="wrap"><SHead eyebrow={t.compEyebrow} h2={t.compTitle} /><div className="grid g4 badges">{t.badges.map((b, i) => <BadgeCard key={i} item={b} logo={BADGE_LOGOS[i]} />)}</div></div></section>
    <Cta />
  </>;
}

export function About() {
  const { t, D, co } = useLang();
  useMeta('about');
  return <>
    <Banner crumbs={[[t.about]]} h1={t.aboutH1} sub={t.aboutSub} lede={t.aboutLede} />
    <section className="sec"><div className="wrap">
      <div className="split story-grid">
        <div className="prose rv"><p className="eyebrow">{t.storyEyebrow}</p><h2 className="h2">{t.storyT}</h2><p className="lead" style={{ marginTop: '1rem' }}>{t.storyP1}</p><p>{t.storyP2}</p></div>
        <div className="rv story-photo"><img src={IMG.brandCard} alt="" width="1000" height="1801" loading="lazy" /></div>
      </div>
      <VisionMission className="co-vm story-vm" vT={t.visionT} v={t.visionP} mT={t.missionT} m={t.missionP} />
    </div></section>
    <section className="sec alt"><div className="wrap"><SHead eyebrow={t.valuesEyebrow} h2={t.valuesT} /><div className="grid g5">{D.VALUES.map((v, i) => <IconCard key={i} item={[t.valueIcons[i], v[0], v[1]]} />)}</div></div></section>
    <section className="sec"><div className="wrap"><SHead eyebrow={t.journeyEyebrow} h2={t.journeyT} />
      <ol className="timeline">{t.journey.map((j, i) => <li className="rv" key={i}><span className="dot" aria-hidden="true">{i + 1}</span><h3>{j[0]}</h3><p>{j[1]}</p></li>)}</ol>
      <p className="actions"><L className="btn btn-outline" to="/history">{co.journeyL} <Arr /></L></p></div></section>
    <section className="sec tint"><div className="wrap"><SHead eyebrow={t.vEyebrow} h2={t.hstpT} p={t.hstpP} /><div className="grid g3">{t.hstp.map((h, i) => <IconCard key={i} item={h} />)}</div></div></section>
    <section className="sec"><div className="wrap"><SHead eyebrow={t.mocEyebrow} h2={t.mocT} p={t.mocP} /><div className="moc"><div className="big rv"><b>42</b><span>{t.mocBig}</span></div><div className="card rv">{D.MOC.map((m, i) => <div className={'mbar' + (m[2] ? ' cc' : '')} key={i}><span>{m[0]}</span><span className="mt"><i style={{ '--w': (m[1] / 15 * 100).toFixed(0) + '%' }} /></span><b>{m[1]}</b></div>)}</div></div></div></section>
    <section className="sec alt"><div className="wrap split" style={{ alignItems: 'center' }}><div className="rv"><SHead eyebrow={t.groupEyebrow} h2={t.groupT} p={t.groupP} /></div><div className="stack rv" aria-label={t.groupT}>{t.stack.map((s, i) => <div key={i}><small>{s[0]}</small><b>{s[1]}</b></div>)}</div></div></section>
    <Cta />
  </>;
}

export function Solutions() {
  const { t, D } = useLang();
  useMeta('solutions');
  return <>
    <Banner crumbs={[[t.solutions]]} h1={t.solsH1} sub={t.solsSub} lede={t.solsLede} />
    <section className="sec alt platform"><div className="wrap split" style={{ alignItems: 'center' }}>
      <div className="rv"><img className="saned saned-logo" src={IMG.saned} alt="Saned Health" width="300" height="88" /><p className="eyebrow">{t.platEyebrow}</p><h2 className="h2">{t.platTitle}</h2><p className="section-lede">{t.platLede}</p><Ticks items={t.platTicks} /></div>
      <div className="rv"><div className="stage"><Mockup /></div><p className="mock-cap">{t.mockCap}</p></div>
    </div></section>
    {D.ZONES.map((z, i) => <section className={'sec' + (i % 2 ? '' : ' alt')} id={'zone-' + z.z} key={z.z}><div className="wrap"><SHead eyebrow={t.zone(z)} h2={z.name} p={z.short} />
      <div className="grid g3 solutions-grid">{D.SOL.filter(s => s.z === z.z).map(s => <SolCard key={s.id} s={s} />)}</div>
    </div></section>)}
    <Cta />
  </>;
}

export function Solution() {
  const { id } = useParams();
  const { t, D, lang } = useLang();
  const i = D.SOL.findIndex(s => s.id === id), s = D.SOL[i];
  usePageMeta(s ? s.name + t.brandSuffix : t.TITLES.notfound, s ? s.intro : t.META.notfound);
  if (!s) return <NotFound />;
  const n = D.SOL.length, prev = D.SOL[(i + n - 1) % n], next = D.SOL[(i + 1) % n];
  const z = D.ZONES.find(x => x.z === s.z), other = DATA[lang === 'ar' ? 'en' : 'ar'].SOL[i];
  return <>
    <Banner crumbs={[[t.solutions, '/solutions'], [s.name]]} h1={'Saned ' + s.name} sub={'Saned ' + other.name} lede={s.intro}><span className="chip">{t.zone(z)}: {z.name}</span></Banner>
    <ProductVideo videos={s.videos?.[lang] || []} label={lang === 'ar' ? 'مقاطع فيديو المنتج' : 'Product videos'} />
    <section className="sec"><div className="wrap sd"><div>
      <h2 className="h2" style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>{t.capT}</h2>
      <div className="grid g3">{s.feats.map((f, k) => <IconCard key={k} item={[['check-circle-2', 'layers', 'bar-chart-3'][k] || 'check', f[0], f[1]]} />)}</div>
      <div className="card rv saned-card" style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'center' }}><img className="saned-logo" src={IMG.saned} alt="Saned Health" width="160" height="47" /><div><h3>{t.partT}</h3><p>{t.partP}</p></div></div>
      <div className="pn"><L className="card" to={'/solutions/' + prev.id}><small>{t.prev}</small><b>{prev.name}</b></L><L className="card" to={'/solutions/' + next.id}><small>{t.next}</small><b>{next.name}</b></L></div></div>
      <div className="side"><div className="card"><h2>{t.whoT}</h2><p style={{ color: 'var(--muted)' }}>{s.who}</p></div>
        <div className="card"><h2>{t.alsoT(z)}</h2><ul>{D.SOL.filter(x => x.z === s.z && x.id !== s.id).map(x => <li key={x.id}><L to={'/solutions/' + x.id}>{x.name}</L></li>)}</ul></div>
        <L className="btn btn-primary" to={'/contact?product=' + s.id}>{t.demo} <Arr /></L></div>
    </div></section>
    <Cta />
  </>;
}

const ListCard = ({ title, items, className }) => (
  <div className={'card list rv' + (className ? ' ' + className : '')}><h3 style={{ fontSize: '1.1rem', marginBottom: '.25rem' }}>{title}</h3>
    {items.map((a, i) => <div className="item" key={i}><span className="ic"><Icon name={a[0]} /></span><div><h4 style={{ fontSize: '1rem' }}>{a[1]}</h4><p>{a[2]}</p></div></div>)}</div>
);

export function Innovation() {
  const { t } = useLang();
  useMeta('innovation');
  return <>
    <Banner crumbs={[[t.innovation]]} h1={t.innH1} sub={t.innSub} lede={t.innLede} />
    <section className="sec"><div className="wrap"><SHead eyebrow={t.vbcEyebrow} h2={t.vbcT} />
      <div className="vv rv"><div className="card"><span className="tagline">{t.vol[0]}</span><h3>{t.vol[1]}</h3><p>{t.vol[2]}</p></div><div className="arr" aria-hidden="true"><Icon name="arrow-right" /></div><div className="card val"><span className="tagline">{t.val[0]}</span><h3>{t.val[1]}</h3><p>{t.val[2]}</p></div></div>
      <h3 style={{ fontSize: '1.25rem', margin: '3rem 0 1.25rem' }}>{t.vbcHowT}</h3>
      <div className="grid g3">{t.vbc.map((v, i) => <div className="card rv" key={i}><span className="ic"><Icon name={v[0]} /></span><h4 style={{ fontSize: '1.05rem', marginBottom: '.4rem' }}>{v[1]}</h4><p>{v[2]}</p></div>)}</div></div></section>
    <section className="sec alt"><div className="wrap"><SHead eyebrow={t.aiEyebrow} h2={t.aiT} p={t.aiLede} />
      <div className="split" style={{ alignItems: 'center' }}><div className="rv innovation-visual"><img src={IMG.virtualCare} alt="" width="843" height="562" loading="lazy" /><div className="innovation-twin"><Twin /></div></div><div className="prose rv"><p className="lead">{t.aiP1}</p><p>{t.aiP2}</p></div></div>
      <div className="grid g2" style={{ marginTop: '2.5rem' }}><ListCard title={t.todayT} items={t.today} /><ListCard title={t.nextT} items={t.nextL} className="next" /></div></div></section>
    <Cta />
  </>;
}

export function Leadership() {
  const { t, D, q, co } = useLang();
  useMeta('leadership');
  return <>
    <Banner crumbs={[[t.leadership]]} h1={t.leadH1} sub={t.leadSub} lede={t.leadLede} />
    <section className="sec"><div className="wrap"><p className="lead co-intro rv">{co.mgmt.intro}</p></div></section>
    <section className="sec"><div className="wrap"><div className="card ceo rv"><div className="ph"><img src={IMG.ao} alt={t.ceoName} width="480" height="480" /></div><div><p className="eyebrow">{t.ceoLabel}</p><h2>{t.ceoName}</h2><p className="role">{t.ceoOrg}</p><blockquote>{q(D.QUOTE)}</blockquote></div></div></div></section>
    <section className="sec alt"><div className="wrap"><SHead eyebrow={t.teamEyebrow} h2={t.teamT} /><div className="grid g5">{D.TEAM.map(m => <div className={'person card rv' + (m[3] ? ' lead' : '')} key={m[0]}><div className="ph"><img src={IMG[m[2]]} alt={m[0]} width="480" height="480" loading="lazy" /></div><h3>{m[0]}</h3><p>{m[1]}</p></div>)}</div></div></section>
    <Cta />
  </>;
}

export function NotFound() {
  const { t } = useLang();
  useMeta('notfound');
  return <Banner crumbs={[['404']]} h1={t.nfH1} sub={t.nfSub} lede={t.nfLede}>
    <p className="actions"><L className="btn btn-teal" to="/">{t.nfHome} <Arr /></L><L className="btn btn-ghost-light" to="/solutions">{t.explore}</L></p>
  </Banner>;
}

/* /en/... is the same as the unprefixed English route */
export function StripEn() {
  const rest = useParams()['*'];
  return <Navigate to={'/' + (rest || '')} replace />;
}
