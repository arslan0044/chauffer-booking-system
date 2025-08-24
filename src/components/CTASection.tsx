import Link from "next/link";
import React from "react";

function CTASection({
  title,
  description,
  button1,
  button2,
}: {
  title: string;
  description: string;
  button1: {
    text: string;
    link: string;
    type: "primary" | "secondary";
  };
  button2: {
    text: string;
    link: string;
    type: "primary" | "secondary";
  };
}) {
  /* Call to Action Section */

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-main to-primary-lite">
      <div className="max-w-screen-xl mx-auto px-4 text-center">
        <div className="text-white animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-Saira font-bold mb-6">
            {title}

          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            {description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={button1.link}

              className="bg-white text-primary-main px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-golden hover:text-primary-lite transition-colors duration-200 flex items-center justify-center gap-2 hover:shadow-xl"
            >
              {button1.text}

            </Link>
            <Link
              href={button2.link}

              className="border-2 border-primary-golden hover:border-white text-primary-golden px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-main transition-colors duration-200"

            >
              {button2.text}

            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
