/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#F5F5F7',
        muted: '#9A9AB0',
        void: '#05050A',
        card: 'rgba(255,255,255,0.03)',
        line: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        display: ['"Unbounded"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: { content: '72rem' },
    },
  },
  plugins: [],
}