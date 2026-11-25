
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MeetOurDoctors from "@/components/MeetOurDoctors";
import Treatments from "@/components/Treatments";
import Results from "@/components/Results";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Promos from "@/components/Promos";
import Consultation from "@/components/Consultation";
import Footer from "@/components/Footer";
import HomeScrollEffects from "@/components/HomeScrollEffects";

export default function Home() {
  return (
    <>
      <Navbar />
      <HomeScrollEffects />

      <main id="top">
        {/* 1. Hero */}
        <Hero />

        {/* 2. Meet Our Doctors */}
        <div data-scroll-reveal="up">
          <MeetOurDoctors />
        </div>

        {/* 3. Our Treatments */}
        <div data-scroll-reveal="up">
          <Treatments />
        </div>

        {/* 4. Treatment Results */}
        <div data-scroll-reveal="up">
          <Results />
        </div>

        {/* 5. Client Testimonials */}
        <div data-scroll-reveal="up">
          <Testimonials />
        </div>

        {/* 6. About Aesthera */}
        <div data-scroll-reveal="up">
          <About />
        </div>

        {/* 7. Our Promotions */}
        <div data-scroll-reveal="up">
          <Promos />
        </div>

        {/* 8. Ending Card */}
        <div data-scroll-reveal="up">
          <Consultation showClassPass />
        </div>
      </main>

      {/* 9. Footer */}
      <Footer />
    </>
  );
}
