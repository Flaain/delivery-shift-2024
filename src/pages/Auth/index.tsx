import { authForm } from "./authForm";
import { useForm } from "react-hook-form";

import { getImageUrl } from "@/utils/helpers/getImageUrl";
import { getRetryOTPTime } from "@/utils/helpers/getRetryOTPTime";
import { useAuth } from "@/utils/hooks/useAuth";

import Button from "@/components/Button";
import Container from "@/components/Container";
import Input from "@/components/Input";
import Title from "@/components/Title";

const Auth = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
    } = useForm({ mode: "all" });
    const { loading, onOTPSend, onOTPSubmit, phone, retryDelay, step, setStep } = useAuth();

    return (
        <Container>
            <div className="flex flex-col gap-8 max-w-[450px] mt-10">
                <div className="flex flex-col gap-3">
                    {!!step && (
                        <Button
                            className="self-start"
                            title="назад"
                            leftIconSlot={<img src={getImageUrl("chevron.svg")} className="rotate-90" alt="" />}
                            isText
                            isTransparent
                            size="none"
                            onClick={() => setStep(0)}
                        />
                    )}
                    <Title className="text-primary-t font-bold" title="Вход" />
                    <p>Введите {!!step ? "проверочный код" : "номер телефона"} для входа в личный кабинет</p>
                </div>
                <form className="flex flex-col gap-2" onSubmit={handleSubmit(!step ? onOTPSend : onOTPSubmit)}>
                    {!step && (
                        <Input
                            placeholder="телефон"
                            type="tel"
                            error={errors?.phone?.message?.toString()}
                            inputMode="tel"
                            className="appearance-none border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                            {...register("phone", {
                                ...authForm.phone,
                                onChange: ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
                                    setValue("phone", value.replace(/[^+\d]|(?<!^)\+/g, ""));
                                },
                            })}
                        />
                    )}
                    {!!step && (
                        <Input
                            type="number"
                            placeholder="проверочный код"
                            error={errors?.pin?.message?.toString()}
                            className="appearance-none border border-solid border-gray-200 px-3 py-2 rounded-lg w-full"
                            {...register("pin", authForm.pin)}
                        />
                    )}
                    <Button
                        className="mt-6"
                        title={!step ? "Продолжить" : "Войти"}
                        isFilled
                        isRoundedFull
                        size="md"
                        isDisabled={loading || !isValid}
                        onClick={handleSubmit(!step ? onOTPSend : onOTPSubmit)}
                    />
                </form>
                {step === 1 &&
                    (!retryDelay ? (
                        <Button
                            className="self-start"
                            isTransparent
                            isText
                            size="none"
                            title="Запросить код повторно"
                            onClick={() => onOTPSend({ phone } as { phone: string })}
                        />
                    ) : (
                        <p className="text-tertiary text-sm">
                            Запросить код повторно можно через {getRetryOTPTime(retryDelay)}
                        </p>
                    ))}
            </div>
        </Container>
    );
};

export default Auth;