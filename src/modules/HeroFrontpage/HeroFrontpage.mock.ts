import { HeroFrontpageViewModel } from './HeroFrontpageViewModel'; // Import the necessary module
import heroFrontPageMobile from '@/public/mock/herofrontpage-mobile.png';
import heroFrontPageDesktop from '@/public/mock/herofrontpage-desktop.jpg';
export const HeroFrontpageMock = {
  headline: "Velkommen til Gritt's Gourmet",
  specialWord: "Gritt's Gourmet",
  description:
    'Velkommen til Gritt’s madglade univers, hvor kun fantasien sætter grænser for de kulinariske eventyr, vi skal begive os ud på. I dette hjørne af internettet vil du finde opskrifter spækket med kærlighed, traditioner og en knivspids nysgerrighed.',
  button: { text: 'Se opskrifter', href: '/opskrifter' },
  image: {
    //@ts-ignore
    srcMobile: '//via.placeholder.com/760x800',
    //@ts-ignore
    srcDesktop: '//via.placeholder.com/800x800',

    alt: 'Hero Frontpage Image Alt',
  },
} satisfies HeroFrontpageViewModel;
