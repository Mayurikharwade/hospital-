"use client";

import { useState, useEffect } from "react";
import { Calendar, Shield, Phone, ChevronLeft, ChevronRight, Star } from "lucide-react";

// Reliable and professional hospital image links
const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?q=80&w=1600&auto=format&fit=crop",
    title: "Modern Hospital",
    subtitle: "World-Class Facilities",
    description: "Experience healthcare in a comfortable and technologically advanced environment, designed for optimal patient well-being.",
    tag: "State-of-the-Art Clinical Center",
    stats: { doctors: "120+", emergency: "24/7", experience: "18+" },
    rating: "4.8",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1600&auto=format&fit=crop",
    title: "Compassionate Care",
    subtitle: "Patient First",
    description: "Our dedicated medical team provides personalized attention and emotional support at every step of your health journey.",
    tag: "Patient-Centered Clinical Care",
    stats: { doctors: "100+", emergency: "24/7", experience: "15+" },
    rating: "4.9",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop",
    title: "Expert Specialists",
    subtitle: "Certified Medical Team",
    description: "Access a wide network of highly qualified doctors and specialists collaborating to deliver comprehensive medical solutions.",
    tag: "Team of Renowned Specialists",
    stats: { doctors: "200+", emergency: "24/7", experience: "25+" },
    rating: "4.8",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1600&auto=format&fit=crop",
    title: "Advanced Diagnosis",
    subtitle: "Modern Technology",
    description: "Equipped with cutting-edge diagnostic tools and medical equipment for accurate results and precise treatment planning.",
    tag: "Cutting-Edge Medical Technology",
    stats: { doctors: "150+", emergency: "24/7", experience: "20+" },
    rating: "4.9",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1600&auto=format&fit=crop",
    title: "24/7 Emergency",
    subtitle: "Rapid Response Team",
    description: "Round-the-clock emergency medical services with expert trauma teams and advanced life support capabilities.",
    tag: "Always Available - 24/7",
    stats: { doctors: "180+", emergency: "24/7", experience: "22+" },
    rating: "4.8",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Set up automatic slide changes
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, []);

  // Ensure currentSlide is defined even before state update
  const currentSlide = slides[currentIndex] || slides[0];

  return (
    // Height maintained at 480px for perfect balance
    <div 
      className="relative w-full overflow-hidden bg-slate-900 shadow-xl" 
      style={{ height: "480px" }}
    >
      
      {/* Background Image Slider with Fade Transition */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            ></div>
          </div>
        ))}
        
        {/* LIGHT OVERLAY: Blue gradient hata kar sirf left side pe halka black shadow rakha hai taaki text dikhe, baaki image clear rahegi */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent z-10"></div>
      </div>

      {/* Slider Directional Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all flex items-center justify-center text-white active:scale-95 group"
      >
        <ChevronLeft className="w-7 h-7 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/30 transition-all flex items-center justify-center text-white active:scale-95 group"
      >
        <ChevronRight className="w-7 h-7 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Pagination Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentIndex
                ? "w-10 h-2 bg-[#00A99D] rounded-full"
                : "w-2.5 h-2.5 bg-white/40 rounded-full hover:bg-white/70"
            }`}
          />
        ))}
      </div>

      {/* Hero Interactive Content Section */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-center lg:justify-start">
        <div className="text-center lg:text-left max-w-xl">
          
          {/* Top trust validation tag */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-1.5 rounded-full text-xs font-medium mb-5">
            <Shield className="w-3.5 h-3.5 text-[#00A99D]" />
            {currentSlide.tag}
          </div>
          
          {/* High visibility typographic titles */}
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 tracking-tight leading-tight drop-shadow-md">
            {currentSlide.title},
            <br />
            <span className="text-[#00A99D]">{currentSlide.subtitle}</span>
          </h1>
          
          {/* Balanced paragraph descriptor */}
          <p className="text-slate-100 text-sm lg:text-base mb-6 leading-relaxed drop-shadow-md">
            {currentSlide.description}
          </p>
          
          {/* Call to Action elements */}
          <div className="flex flex-wrap gap-3 mb-6 justify-center lg:justify-start">
            <button className="h-11 px-6 rounded-lg bg-[#00A99D] text-white text-sm font-semibold hover:bg-[#009488] active:scale-95 transition-all flex items-center gap-2 shadow-lg shadow-[#00A99D]/30">
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
            <button className="h-11 px-6 rounded-lg bg-white/10 backdrop-blur border border-white/20 text-white text-sm font-semibold hover:bg-white/20 active:scale-95 transition-all flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Call Specialist
            </button>
          </div>

          {/* Operational metrics data grid */}
          <div className="flex flex-wrap gap-6 justify-center lg:justify-start pt-3 border-t border-white/20">
            <div>
              <p className="text-2xl font-bold text-white drop-shadow-md">{currentSlide.stats.doctors}</p>
              <p className="text-slate-200 text-[10px] font-semibold uppercase tracking-wider mt-0.5 drop-shadow-md">Expert Doctors</p>
            </div>
            <div className="w-px h-8 bg-white/30 self-center"></div>
            <div>
              <p className="text-2xl font-bold text-white drop-shadow-md">{currentSlide.stats.emergency}</p>
              <p className="text-slate-200 text-[10px] font-semibold uppercase tracking-wider mt-0.5 drop-shadow-md">Emergency Care</p>
            </div>
            <div className="w-px h-8 bg-white/30 self-center"></div>
            <div>
              <p className="text-2xl font-bold text-white drop-shadow-md">{currentSlide.stats.experience}+</p>
              <p className="text-slate-200 text-[10px] font-semibold uppercase tracking-wider mt-0.5 drop-shadow-md">Years Exp.</p>
            </div>
          </div>

          {/* Patient review score integration */}
          <div className="flex items-center gap-2.5 mt-5 justify-center lg:justify-start">
            <div className="flex text-amber-400 gap-1 drop-shadow-md">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-white text-xs font-medium drop-shadow-md">
              {currentSlide.rating} Verified Rating (1,400+ patient reviews)
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}