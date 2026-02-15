import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                violet: {
                    950: '#0b0315',
                    900: '#1a0b2e',
                    800: '#2d1b4e',
                    700: '#3b1d5f',
                    600: '#5b2d91',
                    500: '#7c3aed',
                    400: '#8b5cf6',
                    300: '#a78bfa',
                    200: '#c4b5fd',
                    100: '#ddd6fe',
                    50: '#f5f3ff',
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            fontFamily: {
                sans: ["var(--font-outfit)"],
            },
        },
    },
    plugins: [],
};
export default config;
