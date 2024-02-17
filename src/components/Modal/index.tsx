import React from "react";

import { cn } from "@/utils/helpers/classnames";
import { getImageUrl } from "@/utils/helpers/getImageUrl";

import Button from "../Button";
import Title from "../Title";

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    children: React.ReactNode;
    hasCloseButton?: boolean;
    title?: string;
}

const Modal = ({ children, onClose, hasCloseButton = true, title, className, ...rest }: ModalProps) => {
    React.useEffect(() => {
        const handleKeyup = ({ key }: KeyboardEvent) => {
            key === "Escape" && onClose();
        };

        document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
        document.body.classList.add("overflow-hidden");
        document.addEventListener("keyup", handleKeyup);

        return () => {
            document.body.style.removeProperty("padding-right");
            document.body.classList.remove("overflow-hidden");
            document.removeEventListener("keyup", handleKeyup);
        };
    }, []);

    const handleClick = ({ currentTarget, target }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        currentTarget === target && onClose();
    };

    return (
        <div className="fixed inset-0 z-50 w-full h-screen">
            <div
                className="relative w-full h-full p-4 bg-black/10 flex items-center justify-center overflow-auto"
                onClick={handleClick}
            >
                <div
                    className={cn(
                        "bg-white p-6 box-border rounded-3xl flex flex-col gap-5 border border-solid border-gray-200",
                        !!className && className,
                    )}
                    {...rest}
                >
                    <div className="flex items-center justify-between gap-5">
                        {title && <Title title={title} className="font-bold" />}
                        {hasCloseButton && (
                            <Button
                                className="self-end"
                                leftIconSlot={<img src={getImageUrl("line.svg")} alt="закрыть окно" />}
                                isTransparent
                                isText
                                size="icon"
                                onClick={onClose}
                            />
                        )}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;