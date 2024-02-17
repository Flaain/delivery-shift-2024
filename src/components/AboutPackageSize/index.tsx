import { IPackage } from "@/utils/redux/calculator/types";

interface AboutPackageSizeProps {
    items: Array<IPackage>;
    onClick: (item: IPackage) => void;
}

const AboutPackageSize = ({ items, onClick }: AboutPackageSizeProps) => {
    return (
        <ul
            onClick={(e) => e.stopPropagation()}
            className='bg-white rounded-lg shadow-md flex flex-col gap-2 py-3 px-2 box-border overflow-auto max-h-[350px]'
        >
            {items.map((item) => (
                <li
                    key={item.id}
                    onClick={() => onClick(item)}
                    className='cursor-pointer px-3 py-2 rounded-lg hover:bg-gray-100'
                >
                    <span className='text-base font-normal text-primary-t'>
                        {item.name}, {item.length}x{item.width}x{item.height} см
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default AboutPackageSize;