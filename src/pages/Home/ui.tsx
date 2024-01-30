import Calculator from "@/components/Calculator/ui";
import Title from "@/components/Title/ui";
import getImageUrl from "@/utils/helpers/getImageUrl";

const Home = () => {
    return (
        <section className='flex items-center gap-8 justify-between'>
            <div className='flex flex-col items-center gap-14'>
                <img src={getImageUrl("hero_image_home.svg")} alt='главная картинка домашней страницы' />
                <Title
                    variant='4xl'
                    title='ЦФТ доставка&nbsp;&mdash; быстро, удобно, надежно!'
                    className='font-bold text-primary-t text-center max-w-[500px]'
                />
            </div>
            <Calculator />
        </section>
    );
};

export default Home;