import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'white': '#ffffff',
        'gray': '#f5f5f5',
        'dark-gray': '#333333',
      },
    },
  },
  plugins: [],
}
export default config
