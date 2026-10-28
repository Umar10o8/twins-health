import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang, Html } from '../i18n.jsx';
import { Icon, Arr } from '../icons.jsx';
import { Banner, Ticks, usePageMeta } from '../components/common.jsx';
import { MapCard } from '../components/graphics.jsx';

const EMAIL = 'sales@sanedhealth.com';
/* Google Apps Script web app (Deploy > Web app URL, ending in /exec). It adds each request as a row in the
   contact Google Sheet and emails a notification. */
const SHEET_URL = 'https://script.google.com/macros/s/AKfycbwp4kBtjpNTe9El7qOw-OxObj0mh-BcUYLFwxUW2rdH6uojY9PpMs1NdRyv-VAIZgGHdQ/exec';

/* Demo request form. On submit it posts the request to SHEET_URL. */
function DemoForm({ product }) {
  const { t, D, lang } = useLang();
  const F = t.form;
  const formRef = useRef(), sentRef = useRef();
  const [invalid, setInvalid] = useState({});
  const [msg, setMsg] = useState({ cls: '', text: t.formNote });
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const preset = D.SOL.find(s => s.id === product);

  const clear = k => () => setInvalid(v => ({ ...v, [k]: false }));
  const onSubmit = async e => {
    e.preventDefault();
    if (busy) return;
    const form = formRef.current, f = Object.fromEntries(new FormData(form));
    const ok = { name: !!(f.name || '').trim(), email: /^\S+@\S+\.\S+$/.test(f.email || ''), phone: /[0-9]{6,}/.test((f.phone || '').replace(/\D/g, '')), consent: !!f.consent };
    const bad = Object.keys(ok).filter(k => !ok[k]);
    setInvalid(Object.fromEntries(bad.map(k => [k, true])));
    setSent(false);
    if (bad.length) { setMsg({ cls: ' err', text: F.please + F.join(bad.map(k => F[k])) + '.' }); form.elements[bad[0]].focus(); return; }
    /* No solution field: a product passed from a solution page (?product=) still goes into the email */
    setBusy(true); setMsg({ cls: '', text: F.sending });
    try {
      /* text/plain keeps this a simple request, which Apps Script accepts without a CORS preflight */
      const r = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          name: f.name, org: f.org || '', email: f.email, phone: f.phone,
          solution: preset ? preset.name : '', message: f.message || '', lang, page: location.href,
        }),
      });
      const res = await r.json().catch(() => ({}));
      if (!r.ok || res.result !== 'success') throw new Error(res.error || r.status);
      form.reset(); setMsg({ cls: ' ok', text: F.ok }); setSent(true);
      setTimeout(() => sentRef.current?.focus());
    } catch {
      setMsg({ cls: ' err', text: F.fail });
    } finally { setBusy(false); }
  };
  const inv = k => (invalid[k] ? { 'aria-invalid': 'true' } : {});
  const Req = () => <span className="req" aria-hidden="true">*</span>;

  return (
    <form className="demo" id="demoForm" noValidate aria-labelledby="formH" ref={formRef} onSubmit={onSubmit}>
      <h2 id="formH">{t.formT}</h2><p className="reqnote"><Req /> {t.required}</p>
      <div><label htmlFor="fName">{t.fName}<Req /></label><input id="fName" name="name" autoComplete="name" required {...inv('name')} onInput={clear('name')} /></div>
      <div><label htmlFor="fOrg">{t.fOrg}</label><input id="fOrg" name="org" autoComplete="organization" /></div>
      <div><label htmlFor="fEmail">{t.fEmail}<Req /></label><input id="fEmail" name="email" type="email" autoComplete="email" dir="ltr" required {...inv('email')} onInput={clear('email')} /></div>
      <div><label htmlFor="fPhone">{t.fPhone}<Req /></label><input id="fPhone" name="phone" type="tel" autoComplete="tel" dir="ltr" required {...inv('phone')} onInput={clear('phone')} /></div>
      <div className="full"><label htmlFor="fMsg">{t.fMsg}</label><textarea id="fMsg" name="message" placeholder={t.fMsgPh} /></div>
      <div className="full"><label className="consent"><input type="checkbox" id="fConsent" name="consent" required {...inv('consent')} onChange={clear('consent')} /><span><Html html={t.consentHTML} /><Req /></span></label></div>
      <div className="full" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}><button className="btn btn-primary" type="submit" disabled={busy}>{t.submit} <Arr /></button><p className={'form-msg' + msg.cls} id="formMsg" role="status" aria-live="polite">{msg.text}</p></div>
      <div className={'sent' + (sent ? ' on' : '')} id="formSent" tabIndex={-1} ref={sentRef}><b>{t.sentB}</b><Html html={t.sentP} /></div>
    </form>
  );
}

export default function Contact() {
  const { t, lang } = useLang();
  const [params] = useSearchParams();
  usePageMeta(t.TITLES.contact, t.META.contact);
  return <>
    <Banner crumbs={[[t.contact]]} h1={t.contactH1} lede={t.contactLede} />
    <section className="sec"><div className="wrap contact">
      <div className="cinfo"><h2 className="h2" style={{ fontSize: '1.35rem', marginBottom: '.25rem' }}>{t.reachT}</h2>
        <div className="card"><span className="ic"><Icon name="map-pin" /></span><div><small>{t.hq}</small><span>{t.address}</span></div></div>
        <div className="card"><span className="ic"><Icon name="phone" /></span><div><small>{t.phone}</small><a href="tel:+966115001950" dir="ltr">+966 11 500 1950</a></div></div>
        <div className="card"><span className="ic"><Icon name="mail" /></span><div><small>{t.email}</small><a href={'mailto:' + EMAIL}>{EMAIL}</a></div></div>
        <MapCard />
        <div className="card" style={{ display: 'block' }}><h3>{t.expectT}</h3><Ticks items={t.expect} style={{ marginTop: '.75rem' }} /></div>
      </div>
      <div className="card" style={{ padding: '1.75rem' }}><DemoForm key={lang + params.get('product')} product={params.get('product')} /></div>
    </div></section>
  </>;
}
