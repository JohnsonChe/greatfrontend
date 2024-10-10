import type { Config } from "tailwindcss";
const percentageWidth = require('tailwindcss-percentage-width')
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*"
  ],
  theme: {
    extend: {
      padding: {
        '4.5': '1.125rem'
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
        menuBar: 'menuBar 0.4s ease-out',
        accordian: 'accordian 1s ease-in-out forwards'
      },
      keyframes: {
        marquee: {
          '0%' : { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        menuBar: {
          '0%' : { transform: 'translateX(-100%)'},
          '100%' : { transform: 'translateX(0%)'}
        },
        accordian: {
          '0%' : {maxHeight:'0', opacity: '0', transform:'translateY(100)'},
          '100%': {maxHeight:'100%', opacity: '1', transform:'translateY(0%)'}
        }
      },
      colors: {
        'grey': '#525252',
        'purple': '#4338CA',
        'gray': '#e1e5e8',
        'success-text': '#15803D',
        'success-badge-background': '#F0FDF4',
        'success-badge-border': '#BBF7D0',
        'focus': '#E9EAFC',
        'black': '#000000',
        'orange': '#EA580C',
        'beige': '#D2B08A',
        'yellow': '#EAB308',
        'blue': '#2563EB',
        'green': '#65A30D',
        'white': '#FFFFFF',
        'brown': '#CA8A04'
      }
    },
    container: {
      center: true
    },
    screens: {
      'xs': '320px',
      'sm': '340px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1440px'
    }
  },
  plugins: [
    percentageWidth
  ],
};
export default config;
