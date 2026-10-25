/* Icons: lucide-react, keyed by the same kebab-case names used in the data files */
import {
  Activity, ArrowRight, Award, Baby, BadgeCheck, BarChart3, Bot, BrainCircuit, Briefcase, Building2, Calendar, Check,
  CheckCircle2, ChevronDown, CircleCheck, ClipboardList, Cloud, Contrast, DoorOpen, Eye, FileSignature, Flag, Gauge,
  Handshake, HeartHandshake, HeartPulse, Home, Hospital, Instagram, Landmark, Languages, Layers, LayoutDashboard,
  Lightbulb, LineChart, Linkedin, Lock, Mail, MapPin, Menu, Network, Phone, PhoneCall, Pill, Radar, Receipt, Rocket,
  Route, ScanSearch, Settings, ShieldCheck, ShieldPlus, Smartphone, Sparkles, Stethoscope, Target, TrendingUp, Truck,
  Twitter, UserRound, Users, Video, Waypoints, Workflow, Youtube,
} from 'lucide-react';

const ICONS = {
  'activity': Activity, 'arrow-right': ArrowRight, 'award': Award, 'baby': Baby, 'badge-check': BadgeCheck,
  'bar-chart-3': BarChart3, 'bot': Bot, 'brain-circuit': BrainCircuit, 'briefcase': Briefcase, 'building-2': Building2,
  'calendar': Calendar, 'check': Check, 'check-circle-2': CheckCircle2, 'chevron-down': ChevronDown,
  'circle-check': CircleCheck, 'clipboard-list': ClipboardList, 'cloud': Cloud, 'contrast': Contrast,
  'door-open': DoorOpen, 'eye': Eye, 'file-signature': FileSignature, 'flag': Flag, 'gauge': Gauge,
  'handshake': Handshake, 'heart-handshake': HeartHandshake, 'heart-pulse': HeartPulse, 'home': Home,
  'hospital': Hospital, 'instagram': Instagram, 'landmark': Landmark, 'languages': Languages, 'layers': Layers,
  'layout-dashboard': LayoutDashboard, 'lightbulb': Lightbulb, 'line-chart': LineChart, 'linkedin': Linkedin,
  'lock': Lock, 'mail': Mail, 'map-pin': MapPin, 'menu': Menu, 'network': Network, 'phone': Phone,
  'phone-call': PhoneCall, 'pill': Pill, 'radar': Radar, 'receipt': Receipt, 'rocket': Rocket, 'route': Route,
  'scan-search': ScanSearch, 'settings': Settings, 'shield-check': ShieldCheck, 'shield-plus': ShieldPlus,
  'smartphone': Smartphone, 'sparkles': Sparkles, 'stethoscope': Stethoscope, 'target': Target,
  'trending-up': TrendingUp, 'truck': Truck, 'twitter': Twitter, 'user-round': UserRound, 'users': Users,
  'video': Video, 'waypoints': Waypoints, 'workflow': Workflow, 'youtube': Youtube,
};

/* Solution id -> icon name */
export const SOL_ICON = {"integrated-care":"users","beneficiary-app":"smartphone","care-navigation":"phone-call","screening":"scan-search","chronic-disease":"heart-pulse","maternal-child":"baby","home-health":"home","fleet-management":"truck","virtual-health":"video","his":"hospital","patient-flow":"layout-dashboard","contract-performance":"file-signature","rcm":"receipt","order-management":"clipboard-list","aggregator":"network","medication-tracking":"pill","health-intelligence":"brain-circuit"};

export function Icon({ name }) {
  const C = ICONS[name];
  if (!C) { if (import.meta.env.DEV) console.warn('Missing icon:', name); return null; }
  return <C strokeWidth={1.8} aria-hidden="true" />;
}

/* Direction-aware arrow used inside buttons (flipped in RTL by CSS) */
export const Arr = () => <span className="dir"><Icon name="arrow-right" /></span>;
