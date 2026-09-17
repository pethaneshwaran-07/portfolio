import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import SapExpertise from "@/components/sections/SapExpertise";
import FeaturedProject from "@/components/sections/FeaturedProject";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full pt-20 bg-surface min-h-screen">
        <div className="flex flex-col w-full">
          <Hero />
          <About />
          <SapExpertise />
          <FeaturedProject />
          <Experience />
          <Education />
          <Skills />
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
}
