export default {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                "primary-blue": "#1975FF",
                "primary-t": "#141C24",
                "secondary-t": "#344051",
            },
            invert: {
                50: ".5",
                30: ".3",
                25: ".25",
            },
            sepia: {
                85: ".85"
            },
            saturate: {
                20: ".2"
            }
        },
    },
    plugins: [],
};