import Calculator from "@/components/Calculator";
import Container from "@/components/Container";
import Title from "@/components/Title";

const Home = () => {
    return (
        <section className="flex items-center h-[calc(100vh-80px)] bg-home-pattern bg-cover bg-no-repeat">
            <Container>
                <div className="flex items-center justify-between gap-8 max-lg:flex-col">
                    <div className="flex flex-col gap-14">
                        {/* <img src={getImageUrl("hero_image_home.svg")} alt='главная картинка домашней страницы' /> */}
                        <Title
                            variant="5xl"
                            title="ЦФТ доставка&nbsp;&mdash; быстро, удобно, надежно!"
                            className="font-bold text-white text-center max-w-[700px]"
                        />
                    </div>
                    <Calculator />
                </div>
            </Container>
        </section>
    );
};

export default Home;