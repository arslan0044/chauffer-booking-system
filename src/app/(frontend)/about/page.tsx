import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// export const metadata: Metadata = {
//   title: 'About Us - Luxury Chauffeur Service | Premium Transportation',
//   description: 'Learn about our luxury chauffeur service, our mission to provide exceptional transportation experiences, and our commitment to reliability, quality, and innovation.',
//   openGraph: {
//     title: 'About Us - Luxury Chauffeur Service',
//     description: 'Discover our story, mission, and values in providing premium chauffeur services.',
//     type: 'website',
//     url: '/about',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'About Us - Luxury Chauffeur Service',
//     description: 'Learn about our commitment to exceptional luxury transportation.',
//   },
// };

export default function AboutPage() {
  const data = { Name: "luxury chauffeur", Email: "info@citisolution.com" };

  return (
    <>
      {/* <Navbar Name={data.Name} /> */}
      <main className="mt-[40px] bg-white dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-main via-primary-lite to-primary-main">
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative max-w-screen-xl mx-auto px-4 py-24 lg:py-32">
            <div className="text-center text-white animate-fade-in">
              <h1 className="text-4xl md:text-6xl xl:text-7xl font-Saira font-extrabold mb-6 underline underline-offset-[1.5rem] decoration-primary-golden">
                About Our Story
              </h1>
              <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed opacity-90">
                Delivering exceptional luxury transportation experiences with unmatched professionalism and elegance
              </p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 lg:py-24 bg-primary-dark">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-slide-in-left">
                <h2 className="text-3xl md:text-5xl font-Saira font-bold text-primary-main">
                  Our Vision
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To be the world's most trusted luxury chauffeur service, setting the standard for excellence in premium transportation. We envision a future where every journey becomes an extraordinary experience, combining cutting-edge technology with timeless elegance.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Our commitment extends beyond transportation – we create moments of luxury, comfort, and peace of mind for discerning clients who value quality and sophistication.
                </p>
              </div>
              <div className="relative animate-slide-in-right">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Luxury chauffeur service vision"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative order-2 lg:order-1 animate-slide-in-left">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-500">
                  <Image
                    src="/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                    alt="Professional chauffeur service mission"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
              <div className="space-y-6 order-1 lg:order-2 animate-slide-in-right">
                <h2 className="text-3xl md:text-5xl font-Saira font-bold text-primary-main">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  To provide unparalleled luxury transportation services that exceed expectations through meticulous attention to detail, professional excellence, and unwavering commitment to client satisfaction.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We strive to make every journey seamless, comfortable, and memorable, whether it's for business, special occasions, or leisure travel. Our mission is to be your trusted partner in luxury transportation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values Section */}
        <section className="py-16 lg:py-24 bg-primary-dark">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-Saira font-bold text-primary-main mb-6">
                Our Core Values
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                The principles that guide everything we do and define our commitment to excellence
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Reliability",
                  description: "Punctual, dependable service you can count on, every time.",
                  icon: "🕐"
                },
                {
                  title: "Quality",
                  description: "Premium vehicles and exceptional service standards without compromise.",
                  icon: "⭐"
                },
                {
                  title: "Innovation",
                  description: "Embracing technology and modern solutions for enhanced experiences.",
                  icon: "🚀"
                },
                {
                  title: "Professionalism",
                  description: "Highly trained chauffeurs delivering courteous and discreet service.",
                  icon: "👔"
                },
                {
                  title: "Safety",
                  description: "Your security and well-being are our highest priorities.",
                  icon: "🛡️"
                },
                {
                  title: "Luxury",
                  description: "Sophisticated comfort and elegance in every detail.",
                  icon: "💎"
                }
              ].map((value, index) => (
                <div 
                  key={value.title}
                  className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl mb-4 text-center">{value.icon}</div>
                  <h3 className="text-xl font-Saira font-bold text-primary-main mb-4 text-center">
                    {value.title}
                  </h3>
                  <p className="text-gray-700 text-center leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-screen-xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-Saira font-bold text-primary-main mb-6">
                Our Professional Team
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Experienced professionals dedicated to providing exceptional service
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional chauffeur team"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
                <Image
                  src="/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Luxury vehicle fleet"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>
          </div>
        </section>

        
      </main>
      {/* <Footer Name={data.Name} email={data.Email} /> */}
      
      {/* <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style> */}
    </>
  );
}
