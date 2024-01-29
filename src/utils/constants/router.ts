const routes = { // Изначально я хотел затипизировать так - ROUTES: <Record<string, string>>, но из-за этого терялся автокомплит
    HOME: "/",
};

export const ROUTES = routes as { [key in keyof typeof routes]: string }