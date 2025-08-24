import React from "react";

function HeroSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    // <div>HeroSection</div>
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-main via-primary-lite to-primary-main">
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="relative max-w-screen-xl mx-auto px-4 py-24 lg:py-32">
        <div className="text-center text-white animate-fade-in">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-Saira font-extrabold mb-6 underline underline-offset-[1.5rem] decoration-primary-golden">
            {title}
          </h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
