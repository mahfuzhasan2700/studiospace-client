import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ss: {
          bg: 'var(--ss-bg)',
          surface: 'var(--ss-surface)',
          'surface-raised': 'var(--ss-surface-raised)',
          text: 'var(--ss-text)',
          muted: 'var(--ss-muted)',
          divider: 'var(--ss-divider)',
          'control-border': 'var(--ss-control-border)',
          accent: 'var(--ss-accent)',
          'accent-hover': 'var(--ss-accent-hover)',
          'on-accent': 'var(--ss-on-accent)',
          focus: 'var(--ss-focus)',
        }
      },
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif']
      },
      borderRadius: {
        control: 'var(--ss-radius-control)',
        image: 'var(--ss-radius-image)',
        dialog: 'var(--ss-radius-dialog)',
      },
      maxWidth: {
        content: 'var(--ss-content-max)',
      }
    },
  },
  plugins: [],
};

export default config;

