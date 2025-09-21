import Header from "../../components/landing/Header";
import Faqs from "./Faqs";
import Features from "./Features";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

const LandingPage = () => {
  return (
    <div className="bg-[#ffffff] text-gray-600">
      <Header />
      <main className="mb-[100vh]">
        <Hero />
        <Features />
        <Testimonials />
        <Faqs />
      </main>
    </div>
  );
};

export default LandingPage;
