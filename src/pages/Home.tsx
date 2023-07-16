import HeroSection from "@/components/home/HeroSection";
import LatestBooks from "@/components/home/LatestBooks";
import Footer from "@/layouts/Footer";

const Home = () => {
  return (
    <>
      <section>
        <HeroSection />
      </section>
      <section>
        <LatestBooks />
      </section>
      <Footer />
    </>
  );
};

export default Home;
