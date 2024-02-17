import React from "react";

import { getImageUrl } from "@/utils/helpers/getImageUrl";
import { cn } from "@/utils/helpers/classnames";
import { IPoint } from "@/utils/redux/calculator/types";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";

interface SelectProps {
    items: Array<IPoint>;
    activeItem?: IPoint | null;
    error?: string | null;
    placeholder: string;
    hasSuggestions?: boolean;
    role: "from" | "to";
    onClick: (item: IPoint, role: "from" | "to") => void;
    iconSlot?: React.ReactNode;
    label?: string;
}

const PointSelect = ({
    items,
    activeItem,
    onClick,
    iconSlot,
    label,
    placeholder,
    hasSuggestions,
    error,
    role,
}: SelectProps) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const rootRef = React.useRef<HTMLDivElement>(null);

    const handleOptionClick = (item: IPoint, currentRole: typeof role) => {
        onClick(item, currentRole);
        setIsOpen(false);
    }

    useOutsideClick(rootRef, () => setIsOpen(false), isOpen);

    return (
        <div className='flex flex-col'>
            {label && <span className='font-medium text-sm text-secondary-t mb-1'>{label}</span>}
            <div className='flex flex-col gap-2 items-center'>
                <div
                    ref={rootRef}
                    className={cn(
                        "flex items-center gap-2 w-full relative px-3 py-2 rounded-lg border border-solid cursor-pointer",
                        error ? "border-red-500" : "border-gray-200"
                    )}
                    onClick={() => setIsOpen((prevState) => !prevState)}
                >
                    {iconSlot}
                    <span className="max-sm:text-sm text-base font-normal text-primary-t">{activeItem?.name ?? placeholder}</span>
                    {isOpen && (
                        <ul
                            onClick={(e) => e.stopPropagation()}
                            className='absolute z-10 top-12 left-0 right-0 bg-white rounded-lg shadow-md flex flex-col gap-2 py-3 px-2 box-border overflow-auto max-h-[350px]'
                        >
                            {items
                                .filter((item) => item.name !== activeItem?.name)
                                .map((item) => (
                                    <li
                                        key={item.id}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOptionClick(item, role)
                                        }}
                                        className='cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100'
                                    >
                                        <span className='text-base font-normal text-primary-t'>{item.name}</span>
                                    </li>
                                ))}
                        </ul>
                    )}
                    <img
                        className={cn(isOpen && "rotate-180", "ml-auto transition-all duration-200")}
                        src={getImageUrl("chevron.svg")}
                        alt='иконка стрелки'
                    />
                </div>
                {hasSuggestions && (
                    <div className='flex items-start w-full gap-2'>
                        {items
                            .filter((item) => item.name !== activeItem?.name)
                            .slice(0, 3)
                            .map((item) => (
                                <span
                                    onClick={() => handleOptionClick(item, role)}
                                    key={item.id}
                                    className='text-tertiary text-sm cursor-pointer border-b-2 border-solid border-tertiary-t hover:text-primary-blue hover:border-primary-blue transition-all  ease-in-out duration-200'
                                >
                                    {item.name}
                                </span>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PointSelect;