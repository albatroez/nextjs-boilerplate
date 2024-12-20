import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "droplo-purple": "#7F56D9",
            },
            gridTemplateColumns: {
                "menu-item": "1fr 40px",
            },
        },
    },
    plugins: [],
} satisfies Config;
