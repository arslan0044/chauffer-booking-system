import Link from "next/link";
import React from "react";

function CTASection() {
  /* Call to Action Section */

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-main to-primary-lite">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <div className="text-white animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-Saira font-bold mb-6">
            Ready to Experience Luxury?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover our premium fleet and book your next luxury transportation
            experience with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/fleets"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-golden text-primary-lite font-bold rounded-lg hover:bg-yellow-400 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Explore Our Fleet
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-main font-bold rounded-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
