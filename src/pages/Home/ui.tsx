import Calculator from "@/components/Calculator/ui";
import Container from "@/components/Container/ui";
import Title from "@/components/Title/ui";
import getImageUrl from "@/utils/helpers/getImageUrl";

const Home = () => {

    return (
        <section className='px-4 flex items-center h-[calc(100vh-80px)] bg-home-pattern bg-cover bg-no-repeat'>
            <Container>
                <div className='flex items-center justify-between gap-8'>
                    <div className='flex flex-col gap-14'>
                        <img src={getImageUrl("hero_image_home.svg")} alt='главная картинка домашней страницы' />
                        <Title
                            variant='4xl'
                            title='ЦФТ доставка&nbsp;&mdash; быстро, удобно, надежно!'
                            className='font-bold text-white text-center max-w-[500px]'
                        />
                    </div>
                    <Calculator />
                </div>
            </Container>
        </section>
    );
};

export default Home;