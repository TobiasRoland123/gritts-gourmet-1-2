import { HeroFrontpageViewModel } from './HeroFrontpageViewModel'; // Import the necessary module
import heroimageMobile from '../../../public/mock/herofrontpage-mobile.png';
import heroimageDesktop from '../../../public/mock/herofrontpage-desktop.jpg';

export const HeroFrontpageMock = {
  headline: "Velkommen til Gritt's Gourmet",
  specialWord: "Gritt's Gourmet",
  description:
    'Velkommen til Gritt’s madglade univers, hvor kun fantasien sætter grænser for de kulinariske eventyr, vi skal begive os ud på. I dette hjørne af internettet vil du finde opskrifter spækket med kærlighed, traditioner og en knivspids nysgerrighed.',
  button: { text: 'Se opskrifter', href: '/opskrifter' },
  image: {
    srcMobile: heroimageMobile,
    srcDesktop: heroimageDesktop,
    alt: 'Hero Frontpage Image Alt',
  },
} satisfies HeroFrontpageViewModel;
