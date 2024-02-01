import React from "react";

export const useSelect = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const listRef = React.useRef<HTMLUListElement | null>(null);
    const choosedItemRef = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
        if (!isOpen) return; // <-- не уверен что нужно, но мне кажется лучше накидывать клик на весь документ только когда список открыт

        const handleClickOutside = ({ target }: MouseEvent) => {
            target !== listRef.current && target !== choosedItemRef.current && setIsOpen(false);
        };

        const handleKeyDown = ({ key }: KeyboardEvent) => {
            key === "Escape" && setIsOpen(false);
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeyDown);        

        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    return { isOpen, setIsOpen, listRef, choosedItemRef };
};