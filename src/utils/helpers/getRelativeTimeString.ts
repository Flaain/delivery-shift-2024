export const getRelativeTimeString = (date: Date | number, lang: string = navigator.language) => {
    const timeMS = typeof date === "number" ? date : date.getTime();
    
    const deltaSeconds = Math.round((timeMS - Date.now()) / 1000);
    
    const cutoffs = [60, 3600, 86400, 86400 * 7, 86400 * 30, 86400 * 365, Infinity];
    const units: Array<Intl.RelativeTimeFormatUnit> = ["second", "minute", "hour", "day", "week", "month", "year"];
    
    const unitIndex = cutoffs.findIndex(cutoff => cutoff > Math.abs(deltaSeconds));
    
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;

    const rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
    
    return rtf.format(Math.floor(deltaSeconds / divisor), units[unitIndex]);
}