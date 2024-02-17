import React from "react";

export const useOutsideClick = <T extends HTMLElement>(
    ref: React.RefObject<T>,
    handler: (event?: Event) => void,
    flag?: boolean,
) => {
    React.useEffect(() => {
        if (typeof flag !== "undefined" && !flag) return;

        const handleClick = (event: Event) => {
            if (!(event.target instanceof Node) || !ref.current || ref.current.contains(event.target)) return;

            handler(event);
        };

        const handleKeydown = (event: KeyboardEvent) => {
            event.key === "Escape" && handler(event);
        };

        document.addEventListener("keydown", handleKeydown);
        document.addEventListener("mousedown", handleClick);
        document.addEventListener("touchstart", handleClick);

        return () => {
            document.removeEventListener("keydown", handleKeydown);
            document.removeEventListener("mousedown", handleClick);
            document.removeEventListener("touchstart", handleClick);
        };
    }, [ref, handler, flag]);
};