import Button from "../Button";

export interface CheckoutBlockProps extends React.ComponentPropsWithoutRef<"div"> {
    title: string;
    description?: Array<{ name: string; value: string }>;
    rightIconSlot?: React.ReactNode;
}

const CheckoutBlock = ({ rightIconSlot, title, description, onClick, ...rest }: CheckoutBlockProps) => (
    <div {...rest} className="bg-secondary-bg rounded-3xl w-full px-8 py-6 box-border">
        <div className="flex flex-col gap-4">
            {onClick ? (
                <Button
                    isText
                    isTransparent
                    size="none"
                    title={title}
                    rightIconSlot={rightIconSlot}
                    className="text-primary-t self-start"
                    onClick={onClick}
                />
            ) : (
                <h2 className="font-semibold">{title}</h2> // TODO: improve <Title /> component so u can use h1,h2,h3 just in one component
            )}
            {description && (
                <ul className="flex items-center gap-4">
                    {description.map(({ name, value }) => (
                        <li key={name} className="flex flex-col gap-2">
                            <span className="text-sm text-tertiary">{name}</span>
                            <p className="text-base text-primary-t">{value}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    </div>
);

export default CheckoutBlock;