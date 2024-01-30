const Container = ({ children }: { children: React.ReactNode }) => {
    return <div className='max-w-[1200px] w-full box-border px-4 mx-auto'>{children}</div>;
};

export default Container;