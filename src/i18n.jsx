import { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import S from './data/strings.js';
import CO from './data/company.js';
import { dataEN, dataAR } from './data/data.js';
import { DEFAULT_LANG } from './config.js';

export const DATA = { en: dataEN(), ar: dataAR() };
export const prefixFor = l => (l === DEFAULT_LANG ? '' : '/' + l);

export function makeLang(lang) {
  const prefix = prefixFor(lang);
  return {
    lang, t: S[lang], D: DATA[lang], co: CO[lang], other: DATA[lang === 'ar' ? 'en' : 'ar'], prefix,
    href: p => (prefix + p).replace(/\/$/, '') || '/',
    q: s => (lang === 'ar' ? '«' + s + '»' : '“' + s + '”'),
  };
}

export const LangContext = createContext(makeLang(DEFAULT_LANG));
export const useLang = () => useContext(LangContext);

/* Router link that keeps the current language prefix: <L to="/solutions"> */
export function L({ to, ...rest }) {
  const { href } = useLang();
  return <Link to={href(to)} {...rest} />;
}

/* Trusted copy that contains inline markup (e.g. links in the consent text) */
export const Html = ({ as: Tag = 'span', html, ...rest }) => <Tag {...rest} dangerouslySetInnerHTML={{ __html: html }} />;

/* Company page routes */
export const CO_ROUTES = { about: 'about', team: 'team', leadership: 'leadership', history: 'history' };
export const CO_KEYS = {
  about: 'about', 'about-us': 'about',
  team: 'team',
  leadership: 'leadership', management: 'leadership',
  history: 'history', journey: 'history',
};
export const coLink = k => `/${CO_ROUTES[k]}`;
export const coLinks = c => [['aboutUs', 'about'], ['teamL', 'team'], ['mgmtL', 'leadership'], ['journeyL', 'history']].map(([lbl, k]) => ({ label: c[lbl], to: `/${CO_ROUTES[k]}`, key: k }));
