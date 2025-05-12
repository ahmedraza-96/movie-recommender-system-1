/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1E40AF', // deep blue
          light: '#3B82F6',
          dark: '#1E3A8A',
        },
        secondary: {
          DEFAULT: '#EC4899', // pink
          light: '#F472B6',
          dark: '#BE185D',
        },
        dark: {
          DEFAULT: '#111827', // dark slate
          light: '#1F2937',
          lighter: '#374151',
        },
        light: {
          DEFAULT: '#F9FAFB', // off white
          dark: '#F3F4F6',
          darker: '#E5E7EB',
        },
        accent: {
          DEFAULT: '#10B981', // emerald
          light: '#34D399',
          dark: '#059669',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'hover': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
