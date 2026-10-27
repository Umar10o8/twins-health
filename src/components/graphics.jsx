/* Decorative illustrations: digital twin, map */
import { useLang } from '../i18n.jsx';
import { Icon } from '../icons.jsx';

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
