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
    		keyframes: {
    			shake: {
    				'0%, 100%': {
    					transform: 'rotate(0)'
    				},
    				'25%': {
    					transform: 'rotate(-10deg)'
    				},
    				'50%': {
    					transform: 'rotate(10deg)'
    				},
    				'75%': {
    					transform: 'rotate(-10deg)'
    				}
    			}
    		},
    		animation: {
    			shake: 'shake 1s ease-in-out infinite'
    		},
    		colors: {
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				'50': '#E7F0FA',
    				'100': '#CEE0F5',
    				'200': '#9DC1EB',
    				'300': '#6CA3E0',
    				'400': '#3B84D6',
    				'500': '#0A65CC',
    				'600': '#0851A3',
    				'700': '#063D7A',
    				'800': '#042852',
    				'900': '#021429',
    				DEFAULT: '#0A65CC',
    				foreground: '#FFFFFF'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			green: {
    				'50': '#E7F6EA',
    				'100': '#CEECD5',
    				'200': '#9DD9AB',
    				'300': '#6DC680',
    				'400': '#3CB356',
    				'500': '#0BA02C',
    				'600': '#098023',
    				'700': '#07601A',
    				'800': '#044012',
    				'900': '#022009',
    				DEFAULT: '#0BA02C',
    				foreground: '#FFFFFF'
    			},
    			warning: {
    				'50': '#FFF6E6',
    				'100': '#FFEDCC',
    				'200': '#FFDB99',
    				'300': '#FFC966',
    				'400': '#FFB733',
    				'500': '#FFA500',
    				'600': '#CC8400',
    				'700': '#996300',
    				'800': '#664200',
    				'900': '#332100',
    				DEFAULT: '#FFA500',
    				foreground: '#FFFFFF'
    			},
    			danger: {
    				'50': '#FCEEEE',
    				'100': '#F9DCDC',
    				'200': '#F3B9B9',
    				'300': '#EC9797',
    				'400': '#E67474',
    				'500': '#E05151',
    				'600': '#B34141',
    				'700': '#863131',
    				'800': '#5A2020',
    				'900': '#2D1010',
    				DEFAULT: '#E05151',
    				foreground: '#FFFFFF'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			gray: {
    				'50': '#F1F2F4',
    				'100': '#E4E5E8',
    				'200': '#C8CCD1',
    				'300': '#ADB2BA',
    				'400': '#9199A3',
    				'500': '#767F8C',
    				'600': '#5E6670',
    				'700': '#474C54',
    				'800': '#2F3338',
    				'900': '#18191C',
    				DEFAULT: '#767F8C',
    				foreground: '#5E6670'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			},
    			sidebar: {
    				DEFAULT: 'hsl(var(--sidebar-background))',
    				foreground: 'hsl(var(--sidebar-foreground))',
    				primary: 'hsl(var(--sidebar-primary))',
    				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
    				accent: 'hsl(var(--sidebar-accent))',
    				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
    				border: 'hsl(var(--sidebar-border))',
    				ring: 'hsl(var(--sidebar-ring))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		}
    	}
    },
    plugins: [require('tailwindcss-animate'), require('tailwind-scrollbar'), require('tailwind-scrollbar-hide')],
} satisfies Config;
