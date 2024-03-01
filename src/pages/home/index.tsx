import Footer from "../../components/ui/Footer";
import About from "./About";
import Accordion from "./Accordion";
import CtaSection from "./CtaSection";
import Hero from "./Hero";

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <CtaSection />
            <Accordion />
            <Footer />
        </>
    );
};

export default Home;