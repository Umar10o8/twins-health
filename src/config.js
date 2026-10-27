/* Site-wide settings. SITE_URL is used for canonical and hreflang links: set it to the production domain. */
import logoNavy from '../assets/logos/logo-navy.png';
import logoInverse from '../assets/logos/logo-inverse.png';
import logoMark from '../assets/logo-mark.svg';
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

export const SITE_URL = 'https://www.example.com';
export const DEFAULT_LANG = 'en';
export const asset = f => import.meta.env.BASE_URL + 'assets/' + f;
export const IMG = {
  ao: asset('abdallah-obeikan.jpg'),
  p1: asset('rizwan-haq.jpg'),
  p2: asset('patrick-zola.jpg'),
  p3: asset('shakeeb-ahmed.jpg'),
  p4: asset('mohamed-elmokadm.jpg'),
  p5: asset('abdulmohsen-albrag.jpg'),
  saned: asset('saned-health.webp'),
  logo: logoNavy,
  logoWhite: logoInverse,
  logoMark,
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
