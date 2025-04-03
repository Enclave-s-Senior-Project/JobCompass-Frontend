import type { Config } from 'tailwindcss';

export default {
    darkMode: ['class'],
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))',
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))',
                },
                primary: {
                    DEFAULT: '#0A65CC',
                    foreground: '#FFFFFF',
                    50: '#E7F0FA', // Lightest shade
                    100: '#CEE0F5', // Very light
                    200: '#9DC1EB', // Light
                    300: '#6CA3E0', // Lighter
                    400: '#3B84D6', // Slightly lighter than default
                    500: '#0A65CC',
                    600: '#0851A3', // Slightly darker than default
                    700: '#063D7A', // Darker
                    800: '#042852', // Very dark
                    900: '#021429', // Darkest shade
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))',
                },
                green: {
                    DEFAULT: '#0BA02C',
                    foreground: '#FFFFFF',
                    50: '#E7F6EA',
                    100: '#CEECD5',
                    200: '#9DD9AB',
                    300: '#6DC680',
                    400: '#3CB356',
                    500: '#0BA02C',
                    600: '#098023',
                    700: '#07601A',
                    800: '#044012',
                    900: '#022009',
                },
                warning: {
                    DEFAULT: '#FFA500',
                    foreground: '#FFFFFF',
                    50: '#FFF6E6',
                    100: '#FFEDCC',
                    200: '#FFDB99',
                    300: '#FFC966',
                    400: '#FFB733',
                    500: '#FFA500',
                    600: '#CC8400',
                    700: '#996300',
                    800: '#664200',
                    900: '#332100',
                },
                danger: {
                    DEFAULT: '#E05151',
                    foreground: '#FFFFFF',
                    50: '#FCEEEE',
                    100: '#F9DCDC',
                    200: '#F3B9B9',
                    300: '#EC9797',
                    400: '#E67474',
                    500: '#E05151',
                    600: '#B34141',
                    700: '#863131',
                    800: '#5A2020',
                    900: '#2D1010',
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))',
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))',
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))',
                },
                gray: {
                    DEFAULT: '#767F8C',
                    foreground: '#5E6670',
                    50: '#F1F2F4', // Lightest shade
                    100: '#E4E5E8', // Very light
                    200: '#C8CCD1', // Light
                    300: '#ADB2BA', // Lighter
                    400: '#9199A3', // Slightly lighter than default
                    500: '#767F8C',
                    600: '#5E6670', // Slightly darker than default
                    700: '#474C54', // Darker
                    800: '#2F3338', // Very dark
                    900: '#18191C', // Darkest shade
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))',
                },
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
            },
        },
    },
    plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
} satisfies Config;
