import { IPoint } from "@/utils/redux/calculator/types";
import { SelectProps } from "./types";
import { useSelect } from "@/utils/hooks/useSelect";

// размер посылки будет как отдельный компонент, у него там своя какая-то более сложная логика

const SelectPoint = ({ items, activeItem, onClick, iconSlot, label, withSuggestions, role }: SelectProps) => {
    const { listRef, choosedItemRef, isOpen, setIsOpen } = useSelect();

    const placeholder = {
        from: "Выберите город отправки",
        to: "Выберите город назначения"
    }

    const handleClick = (item: IPoint) => {
        onClick(item);
        setIsOpen(false);
    }

    return (
        <div className='flex flex-col'>
            {label && <span className='font-medium text-sm text-secondary-t mb-1'>{label}</span>}
            <div className='flex flex-col gap-2 items-center'>
                <div
                    ref={choosedItemRef}
                    className='w-full relative px-3 py-2 rounded-lg border border-solid border-gray-200 cursor-pointer'
                    onClick={() => setIsOpen((prevState) => !prevState)}
                >
                    {iconSlot}
                    <span className="pointer-events-none">
                        {activeItem ? activeItem.name : placeholder[role as keyof typeof placeholder]}
                    </span>
                    {isOpen && (
                        <ul
                            onClick={(e) => e.stopPropagation()}
                            ref={listRef}
                            className='absolute z-10 top-12 left-0 right-0 bg-white rounded-lg shadow-md flex flex-col gap-2 py-3 px-2 box-border overflow-auto max-h-[350px]'
                        >
                            {items
                                .filter((item) => item.name !== activeItem?.name)
                                .map((item) => (
                                    <li key={item.id} onClick={() => handleClick(item)} className='cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100'>
                                        <span className="text-base font-normal text-primary-t">{item.name}</span>
                                    </li>
                                ))}
                        </ul>
                    )}
                </div>
                {withSuggestions && (
                    <div className='flex items-start w-full gap-2'>
                        {items
                            .filter((item) => item.name !== activeItem?.name)
                            .slice(0, 3) /* <-- возможно, можно как-то более правильно сделать, чтобы одинаковые предложения не показывались */
                            .map((item) => (
                                <span
                                    onClick={() => onClick(item)}
                                    key={item.id}
                                    className='text-secondary-t text-sm cursor-pointer border-b-2 border-solid border-secondary-t hover:text-primary-blue hover:border-primary-blue transition-all  ease-in-out duration-200'
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

export default SelectPoint;