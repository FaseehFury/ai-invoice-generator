import Header from "../../components/landing/Header";
import Features from "./Features";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <div className="bg-[#ffffff] text-gray-600">
      <Header />
      <main className="mb-[100vh]">
        <Hero />
        <Features />
        <Testimonials />
      </main>
    </div>
  );
};

export default LandingPage;
