export const orderStatuses: Record<number, { title: string; cn: string }> = {
    0: { title: "В обработке", cn: "before:bg-yellow-400" },
    1: { title: "Ожидаем курьера", cn: "before:bg-orange-400" },
    2: { title: "В пути", cn: "before:bg-primary-blue" },
    3: { title: "Доставлен", cn: "before:bg-green-400" },
    4: { title: "Отменен", cn: "before:bg-red-400" },
};