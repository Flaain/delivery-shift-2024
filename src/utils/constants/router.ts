const routes = {
    HOME: "/",
    AUTH: "/auth",
    PROFILE: "/profile",
    DELIVERY: "/delivery",
    HISTORY: "/history",
    DETAILED_HISTORY: "/history/:id",
};

export const ROUTES = routes as { [key in keyof typeof routes]: string };