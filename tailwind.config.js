export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                "primary-blue": "#1975FF",
                "primary-t": "#141C24",
                "secondary-t": "#344051",
            },
            keyframes: {
                spinner: {
                    "0%": { transform: "translate(-50%, -50%) rotate(0)" },
                    "100%": { transform: "translate(-50%, -50%) rotate(360deg)" },
                },
            },
            animation: {
                spin: "spinner .5s linear infinite",
            },
        },
    },
    plugins: [],
};