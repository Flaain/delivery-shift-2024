import { useForm } from "react-hook-form";
import Button from "../Button";

interface ExactPackageSizeProps {
    onSubmit: (packageProp: Record<string, number>) => void;
}

const ExactPackageSize = ({ onSubmit }: ExactPackageSizeProps) => {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ mode: "all" });

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white p-5 rounded-lg flex flex-col gap-6 shadow-md border border-solid border-gray-100'
        >
            <label className='flex flex-col gap-2 relative'>
                <span>Введите длину</span>
                <input
                    {...register("length", {
                        required: "Обязательное поле",
                        pattern: { value: /^[0-9]+$/, message: "Только цифры" },
                        min: { value: 1, message: "Минимальное значение 1" },
                    })}
                    className='border border-solid border-gray-200 px-3 py-2 rounded-lg w-full'
                    type='number'
                    placeholder='см'
                />
                {errors?.length && (
                    <span className='text-red-500 absolute -bottom-5 text-sm'>
                        {errors.length?.message?.toString() || "Некорректное значение"}
                    </span>
                )}
            </label>
            <label className='flex flex-col gap-2 relative'>
                <span>Введите ширину</span>
                <input
                    {...register("width", {
                        required: "Обязательное поле",
                        pattern: { value: /^[0-9]+$/, message: "Только цифры" },
                    })}
                    className='border border-solid border-gray-200 px-3 py-2 rounded-lg w-full'
                    type='number'
                    placeholder='см'
                />
                {errors?.width && (
                    <span className='text-red-500 absolute -bottom-5 text-sm'>
                        {errors.width?.message?.toString() || "Некорректное значение"}
                    </span>
                )}
            </label>
            <label className='flex flex-col gap-2 relative'>
                <span>Выберите высоту</span>
                <input
                    {...register("height", {
                        required: "Обязательное поле",
                        pattern: { value: /^[0-9]+$/, message: "Только цифры" },
                    })}
                    className='border border-solid border-gray-200 px-3 py-2 rounded-lg w-full'
                    type='number'
                    placeholder='см'
                />
                {errors?.height && (
                    <span className='text-red-500 absolute -bottom-5 text-sm'>
                        {errors.height?.message?.toString() || "Некорректное значение"}
                    </span>
                )}
            </label>
            <label className='flex flex-col gap-2 relative'>
                <span>Выберите вес</span>
                <input
                    {...register("weight", {
                        required: "Обязательное поле",
                        max: { value: 20, message: "Максимальный вес 20кг" },
                        pattern: { value: /^[0-9]+$/, message: "Только цифры" },
                    })}
                    className='border border-solid border-gray-200 px-3 py-2 rounded-lg w-full'
                    type='number'
                    placeholder='кг'
                />
                {errors?.weight && (
                    <span className='text-red-500 absolute -bottom-5 text-sm'>
                        {errors.weight?.message?.toString() || "Некорректное значение"}
                    </span>
                )}
            </label>
            <Button className="font-bold" title='сохранить' isFilled isRoundedFull />
        </form>
    );
};

export default ExactPackageSize;