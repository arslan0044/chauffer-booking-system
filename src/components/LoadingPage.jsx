import React from "react";
import { Car } from "lucide-react";

// Logo Loader Component
const LogoLoader = () => {
  return (
    <div className="relative">
      {/* Outer rotating ring */}
      <div className="w-24 h-24 border-4 border-primary-main/20 border-t-primary-main rounded-full animate-spin"></div>

      {/* Inner pulsing logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 bg-primary-main rounded-full flex items-center justify-center animate-pulse">
          <Car className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Golden accent ring */}
      <div className="absolute inset-2 w-20 h-20 border-2 border-primary-golden/30 rounded-full animate-ping"></div>
    </div>
  );
};

// Text Loader Component
const TextLoader = ({ text = "Loading..." }) => {
  return (
    <div className="relative">
      <h2 className="text-2xl md:text-3xl font-Saira font-bold text-primary-main mb-2">
        {text}
      </h2>
      <div className="flex space-x-1 justify-center">
        <div className="w-2 h-2 bg-primary-golden rounded-full animate-bounce"></div>
        <div
          className="w-2 h-2 bg-primary-golden rounded-full animate-bounce"
          style={{ animationDelay: "0.1s" }}
        ></div>
        <div
          className="w-2 h-2 bg-primary-golden rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ progress = 0 }) => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-main to-primary-golden transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        >
          <div className="h-full bg-white/20 animate-pulse"></div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-2 text-center font-Saira">
        {progress}% Complete
      </p>
    </div>
  );
};

// Shimmer Effect Component
const ShimmerText = ({ children }) => {
  return (
    <div className="relative overflow-hidden">
      <div className="font-Saira text-lg text-gray-600">{children}</div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
    </div>
  );
};

// Main Loading Page Component
const LoadingPage = ({
  variant = "default",
  message = "Loading your luxury experience...",
  progress = 0,
  showProgress = false,
}) => {
  const renderLoader = () => {
    switch (variant) {
      case "minimal":
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-primary-main/20 border-t-primary-main rounded-full animate-spin"></div>
            <p className="text-primary-main font-Saira font-medium">
              {message}
            </p>
          </div>
        );

      case "progress":
        return (
          <div className="flex flex-col items-center space-y-8">
            <LogoLoader />
            <TextLoader text="Preparing Your Journey" />
            <ProgressBar progress={progress || 75} />
          </div>
        );

      case "shimmer":
        return (
          <div className="flex flex-col items-center space-y-6">
            <LogoLoader />
            <ShimmerText>Luxury Chauffeur Service</ShimmerText>
            <div className="flex space-x-4">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center space-y-8">
            <LogoLoader />
            <TextLoader text={message} />
            {showProgress && <ProgressBar progress={progress || 0} />}
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex items-center justify-center z-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-main/10 to-primary-golden/10"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary-main/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-primary-golden/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4">
        {renderLoader()}

        {/* Company Branding */}
        <div className="mt-12">
          <p className="text-sm text-gray-500 font-Saira">
            Powered by{" "}
            <span className="text-primary-main font-semibold">
              Luxury Chauffeur
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
export { LogoLoader, TextLoader, ProgressBar, ShimmerText };
