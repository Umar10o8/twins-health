/* Site-wide settings. SITE_URL is used for canonical and hreflang links: set it to the production domain. */
import logoNavy from '../assets/logos/logo-navy.png';
import logoInverse from '../assets/logos/logo-inverse.png';
import logoArNavy from '../assets/logos/logo-ar-navy.png';
import logoArInverse from '../assets/logos/logo-ar-inverse.png';
import tMarkWhite from '../assets/logos/t-mark-white.svg';
import skylinePhoto from '../assets/photos/skyline.jpg';
import familyPhoto from '../assets/photos/family.jpg';
import clinicianPhoto from '../assets/photos/clinician.jpg';
import virtualCarePhoto from '../assets/photos/virtual-care.jpg';
import elderPhoto from '../assets/photos/elder.jpg';
import phonePhoto from '../assets/photos/phone.jpg';
import watchPhoto from '../assets/photos/watch.jpg';
import scrubsPhoto from '../assets/photos/scrubs.jpg';
import overheadPhoto from '../assets/photos/overhead.jpg';
import brandTabletPhoto from '../assets/photos/brand-tablet.jpg';
import brandCardPhoto from '../assets/photos/brand-card.jpg';
import nphiesLogo from '../assets/badges/nphies.png';
import isoLogo from '../assets/badges/iso-13485.png';
import hipaaLogo from '../assets/badges/hipaa.png';
import zatcaLogo from '../assets/badges/zatca.png';

export const SITE_URL = 'https://www.example.com';
export const DEFAULT_LANG = 'en';
/* Wordmark per language: navy for light backgrounds, white for the footer */
export const LOGOS = {
  en: { navy: logoNavy, white: logoInverse, w: 296, h: 82 },
  ar: { navy: logoArNavy, white: logoArInverse, w: 598, h: 200 },
};
export const asset = f => import.meta.env.BASE_URL + 'assets/' + f;
export const IMG = {
  ao: asset('abdallah-obeikan.jpg'),
  p1: asset('rizwan-haq.jpg'),
  p2: asset('patrick-zola.jpg'),
  p3: asset('shakeeb-ahmed.jpg'),
  p4: asset('mohamed-elmokadm.jpg'),
  p5: asset('abdulmohsen-albrag.jpg'),
  saned: asset('saned-health.webp'),
  tMarkWhite,
  hero: skylinePhoto,
  family: familyPhoto,
  clinician: clinicianPhoto,
  virtualCare: virtualCarePhoto,
  elder: elderPhoto,
  phone: phonePhoto,
  watch: watchPhoto,
  scrubs: scrubsPhoto,
  overhead: overheadPhoto,
  brandTablet: brandTabletPhoto,
  brandCard: brandCardPhoto,
};

/* Compliance logos, in the same order as the badge lists in strings.js and company.js: NPHIES, ISO, HIPAA, ZATCA */
export const BADGE_LOGOS = [
  { src: nphiesLogo, w: 480, h: 152 },
  { src: isoLogo, w: 160, h: 160 },
  { src: hipaaLogo, w: 300, h: 160 },
  { src: zatcaLogo, w: 136, h: 160 },
];
