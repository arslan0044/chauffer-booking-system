"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-white to-primary-dark flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full text-center">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <h1 
            className={`text-8xl sm:text-9xl font-extrabold text-primary-main transition-all duration-1000 transform ${
              mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            4
            <span className="inline-block animate-bounce text-primary-golden mx-2">
              0
            </span>
            4
          </h1>
          
          {/* Floating elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary-golden rounded-full animate-ping opacity-75"></div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6 bg-primary-main rounded-full animate-pulse"></div>
        </div>

        {/* Error Message */}
        <div 
          className={`mb-8 transition-all duration-1000 delay-300 transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-primary-lite mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            The page you're looking for seems to have taken a detour. 
            <br className="hidden sm:block" />
            Don't worry, even our luxury chauffeurs sometimes take scenic routes!
          </p>
        </div>

        {/* Animated Car Icon */}
        <div 
          className={`mb-8 transition-all duration-1000 delay-500 transform ${
            mounted ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
          }`}
        >
          <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-main rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
            <svg 
              className="w-12 h-12 text-white animate-pulse" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11C5.84 5 5.28 5.42 5.08 6.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-1.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div 
          className={`space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center transition-all duration-1000 delay-700 transform ${
            mounted ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-base font-medium text-white bg-primary-main border border-transparent rounded-lg shadow-md hover:bg-primary-lite hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Go Home
          </Link>
          
          <Link
            href="/fleets"
            className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 text-base font-medium text-primary-main bg-white border-2 border-primary-main rounded-lg shadow-md hover:bg-primary-dark hover:shadow-lg transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-main"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            View Fleet
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-golden rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary-main rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary-golden rounded-full animate-bounce opacity-80"></div>
      </div>
    </div>
  );
}