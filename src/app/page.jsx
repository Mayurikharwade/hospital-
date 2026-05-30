import Navbar from "@/components/home/Navbar";
import Hero from "@/components/home/Hero";
//import Services from "@/components/home/Services";
import Doctors from "@/components/home/Doctors";
import FeaturedServices from "@/components/home/FeaturedServices";
import Footer from "@/components/home/Footer";
import ChatBot from "@/components/home/ChatBot"; 

export default function HomePage() {

  return (
    <>
      <Navbar />
      <Hero />
      {/* <Services /> */}
      <Doctors />
       <FeaturedServices />
      <Footer />
      <ChatBot /> 
    </>
  );

}