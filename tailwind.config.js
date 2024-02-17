export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                "primary-blue": "#1975FF",
                "primary-t": "#141C24",
                "secondary-t": "#344051",
                "tertiary": "#637083",
                "secondary-bg": "#F3F4F6"
            },
            keyframes: {
                spinner: {
                    "0%": { transform: "rotate(0)" },
                    "100%": { transform: "rotate(360deg)" },
                },
            },
            animation: {
                spin: "spinner .5s linear infinite",
            },
            backgroundImage: {
                "home-pattern": "url('@/utils/assets/home_bg_image.svg')",
            }
        },
    },
    plugins: [],
};