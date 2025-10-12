/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif']
            },
            colors: {
                brand: {
                    50: '#eff6ff',
                    200: '#bfdbfe',
                    500: '#2563eb',
                    600: '#1d4ed8',
                    700: '#1e40af'
                }
            }
        }
    },
    plugins: []
};
