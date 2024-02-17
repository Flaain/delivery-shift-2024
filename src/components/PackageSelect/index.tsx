import React from "react";

import ExactPackageSize from "../ExactPackageSize";
import AboutPackageSize from "../AboutPackageSize";

import { getImageUrl } from "@/utils/helpers/getImageUrl";
import { IPackage } from "@/utils/redux/calculator/types";
import { useOutsideClick } from "@/utils/hooks/useOutsideClick";
import { cn } from "@/utils/helpers/classnames";
import { useAppDispatch } from "@/utils/hooks";
import { setPackage } from "@/utils/redux/calculator/slice";

interface PackageSelectProps {
    items: Array<IPackage>;
    error?: string | null;
    placeholder: string;
    activeItem?: Partial<IPackage> | null;
    onClick: (item: IPackage) => void;
    onSubmit?: () => void;
    iconSlot?: React.ReactNode;
    label?: string;
}

const initialMenus = [
    { name: "Примерные", key: "about" },
    { name: "Точные", key: "exact" },
];

const PackageSelect = ({
    items,
    onClick,
    onSubmit,
    placeholder,
    error,
    iconSlot,
    label,
    activeItem,
}: PackageSelectProps) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [menu, setMenu] = React.useState<"exact" | "about">("about");

    const rootRef = React.useRef<HTMLDivElement>(null);

    useOutsideClick(rootRef, () => setIsOpen(false), isOpen);

    const dispatch = useAppDispatch();

    const handleSubmit = (packageProp: Record<string, number>) => {
        dispatch(setPackage(packageProp));
        setIsOpen(false);
    };

    const handleOptionClick = (item: IPackage) => {
        setIsOpen(false);
        onClick(item);
    };

    const menus: Record<"exact" | "about", React.ReactNode> = {
        about: <AboutPackageSize items={items} onClick={handleOptionClick} />,
        exact: <ExactPackageSize onSubmit={handleSubmit} />,
    };

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
                    <span className='max-sm:text-sm'>
                        {activeItem
                            ? `${activeItem.name ? `${activeItem.name}, ` : ""}${activeItem.length}x${
                                  activeItem.width
                              }x${activeItem.height} см`
                            : placeholder}
                    </span>
                    {isOpen && (
                        <div
                            className='absolute -top-[350px] left-0 right-0 z-10 flex flex-col gap-3'
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className='grid grid-cols-2 gap-2 bg-gray-200 p-1 rounded-full'>
                                {initialMenus.map(({ key, name }) => (
                                    <span
                                        className={cn(
                                            key === menu && "bg-white",
                                            key !== menu &&
                                                "hover:bg-gray-300 transition-colors duration-200 ease-in-out",
                                            "flex justify-center items-center py-2 px-3 rounded-full cursor-pointer"
                                        )}
                                        onClick={() => setMenu(key as "exact" | "about")}
                                        key={key}
                                    >
                                        {name}
                                    </span>
                                ))}
                            </div>
                            {menus[menu]}
                        </div>
                    )}
                    <img
                        className={cn(isOpen && "rotate-180", "ml-auto transition-all duration-200")}
                        src={getImageUrl("chevron.svg")}
                        alt='иконка стрелки'
                    />
                </div>
            </div>
        </div>
    );
};

export default PackageSelect;