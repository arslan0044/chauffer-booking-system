"use client";

import { useState, useEffect } from "react";
import LoadingPage from "@/components/LoadingPage";
export default function Loading() {
//   const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
        //   setIsLoading(false);
          clearInterval(timer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => clearInterval(timer);
  }, []);
  return (
    <LoadingPage
      variant="progress"
      message="Loading your experience..."
      progress={progress}
    />
  );
}
// <div className="min-h-screen bg-white flex items-center justify-center p-4">
//   <div className="max-w-md w-full space-y-8">
//     {/* Logo/Brand Skeleton */}
//     <div className="text-center">
//       <div className="inline-block">
//         <div className="h-12 w-48 bg-primary-main/10 rounded-lg animate-pulse mb-2"></div>
//         <div className="h-3 w-32 bg-gray-200 rounded mx-auto animate-pulse"></div>
//       </div>
//     </div>

//     {/* Main Loading Spinner */}
//     <div className="flex justify-center">
//       <div className="relative">
//         {/* Outer ring */}
//         <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-primary-main"></div>
//         {/* Inner dot */}
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary-golden rounded-full animate-pulse"></div>
//       </div>
//     </div>

//     {/* Loading Text */}
//     <div className="text-center">
//       <p className="text-primary-main font-Saira font-medium text-lg animate-pulse">
//         Loading...
//       </p>
//       <p className="text-gray-500 text-sm mt-1 animate-pulse">
//         Please wait while we prepare your experience
//       </p>
//     </div>

//     {/* Content Skeleton */}
//     <div className="space-y-4">
//       {/* Navigation skeleton */}
//       <div className="flex justify-center space-x-6">
//         {[...Array(4)].map((_, i) => (
//           <div
//             key={i}
//             className="h-4 w-16 bg-gray-200 rounded animate-pulse"
//             style={{ animationDelay: `${i * 0.1}s` }}
//           ></div>
//         ))}
//       </div>

//       {/* Content blocks skeleton */}
//       <div className="space-y-3">
//         <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
//         <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
//       </div>

//       {/* Card skeletons */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//         {[...Array(2)].map((_, i) => (
//           <div
//             key={i}
//             className="border border-gray-200 rounded-lg p-4 space-y-3 animate-pulse"
//             style={{ animationDelay: `${i * 0.2}s` }}
//           >
//             <div className="h-32 bg-gray-200 rounded"></div>
//             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//             <div className="h-3 bg-gray-200 rounded w-1/2"></div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Progress indicator */}
//     <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
//       <div className="h-full bg-gradient-to-r from-primary-main to-primary-golden animate-pulse"></div>
//     </div>
//   </div>
// </div>
