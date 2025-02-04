import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Carousel = ({handleClick}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      url: "https://th.bing.com/th/id/R.81c33c71b1ddcebe11ffa2f3c90106f4?rik=iPk5aLe3VdsGDw&pid=ImgRaw&r=0",
      title: "Premium Tea Collection"
    },
    {
      url: "https://th.bing.com/th/id/OIP.dYLg6NMPGzrWCKpsZo9WegHaE9?rs=1&pid=ImgDetMain",
      title: "Artisanal Blends"
    },
    {
      url: "https://www.maxipos.com/wp-content/uploads/2023/07/luxury-tea-packaging-design-squre-box.jpg",
      title: "Luxury Packaging"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[400px] w-full overflow-hidden">
      {/* Slides */}
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out
              ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={slide.url}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay and Text */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center pt-16">
          <div className="container mx-auto px-4">
            <div className="max-w-xl text-white">
              <h2 className="text-5xl font-bold mb-4">Discover the Art of Fine Tea</h2>
              <p className="text-xl mb-8">Curated collection of premium teas from around the world</p>
              <button onClick={() => handleClick()} className="bg-emerald-600 text-white px-8 py-3 rounded-lg hover:bg-emerald-700 transition duration-300">
                Shop Now
              </button>
            </div>
          </div>
        </div>
            </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-200"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200
              ${index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white/50 hover:bg-white/75'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;