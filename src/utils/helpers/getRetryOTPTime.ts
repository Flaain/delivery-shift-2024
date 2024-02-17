import { declOfNum } from "./declOfNum";

export const getRetryOTPTime = (ms: number) => {
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    // const timer = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return `${
        minutes ? `${minutes} ${declOfNum(minutes, ["минуту", "минуты", "минут"])} и` : ""
    } ${seconds} ${declOfNum(seconds, ["секунду", "секунды", "секунд"])}`;
};