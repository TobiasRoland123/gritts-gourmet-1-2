import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Define your color variables here
        primaryCol: 'var(--primary-color)', // Example color
        // You can also create shades
        secondaryCOl: 'var(--secondary-color)',
        accentCOl: 'var(--accent-color)',
      },
    },
  },
  plugins: [],
};
export default config;
