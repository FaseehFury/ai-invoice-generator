import Header from "../../components/landing/Header";
import Faqs from "./Faqs";
import Features from "./Features";
import Footer from "./Footer";
import Hero from "./Hero";
import Testimonials from "./Testimonials";

const LandingPage = () => {
  return (
    <div className="bg-[#ffffff] text-gray-600">
      <Header />
      {/* when we was adding components to main we added mb-[100vh] to main to avoid footer overlapping with last component */}
      {/* <main className="mb-[100vh]"> */}
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <Faqs />
        <Footer />
      </main>
    </div>
  );
};

export default LandingPage;
