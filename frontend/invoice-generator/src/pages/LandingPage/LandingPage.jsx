import Header from "../../components/landing/Header";
import Hero from "./Hero";

const LandingPage = () => {
  return (
    <div className="bg-[#ffffff] text-gray-600">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  );
};

export default LandingPage;
