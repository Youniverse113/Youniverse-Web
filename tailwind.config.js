/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spline-900': '#121316',
        'spline-800': '#191a1d',
        'spline-800-focus': '#212225',
        'spline-700-focus': '#202124',
        'spline-button': '#2a2b2e',
        'spline-button-2': '#6f6f6f',
        'spline-button-3': '#272626',
        'spline-button-4': '#535353',
        'spline-text': '#ffffffcc',
        'spline-text2': '#ffffff99',
      },
    },
    borderWidth: {
      DEFAULT: '1px',
      '0': '0',
      '2': '2px',
      '3': '3px',
      '4': '4px',
      '6': '6px',
      '8': '8px',
    }
  },
  plugins: [],
}

