/* Site-wide settings. SITE_URL is used for canonical and hreflang links: set it to the production domain. */
export const SITE_URL = 'https://www.example.com';
export const DEFAULT_LANG = 'en';
export const asset = f => import.meta.env.BASE_URL + 'assets/' + f;
export const IMG = { ao: asset('abdallah-obeikan.jpg'), p1: asset('rizwan-haq.jpg'), p2: asset('patrick-zola.jpg'), p3: asset('shakeeb-ahmed.jpg'), p4: asset('mohamed-elmokadm.jpg'), p5: asset('abdulmohsen-albrag.jpg'), saned: asset('saned-health.webp'), logo: asset('logo.webp'), logoWhite: asset('logo-white.webp'), logoWhiteHiRes: asset('logo-white.png') };
