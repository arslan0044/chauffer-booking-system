export default function FleetDetailLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dark via-white to-primary-dark">
      {/* Navigation Skeleton */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse mr-2"></div>
            <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center items-center mb-4 space-x-3">
            <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="w-16 h-6 bg-primary-golden/20 rounded-full animate-pulse"></div>
          </div>
          <div className="w-80 h-12 bg-gray-200 rounded mx-auto animate-pulse mb-4"></div>
          <div className="w-64 h-6 bg-gray-200 rounded mx-auto animate-pulse mb-2"></div>
          <div className="flex justify-center items-center space-x-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery Skeleton */}
          <div className="animate-slide-in-left">
            {/* Main Image */}
            <div className="mb-4 rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gray-200 animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                {/* Navigation buttons skeleton */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full animate-pulse"></div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-16 h-12 bg-gray-200 rounded animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
              ))}
            </div>
          </div>

          {/* Vehicle Details Skeleton */}
          <div className="animate-slide-in-right">
            {/* Pricing */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="w-24 h-10 bg-primary-main/20 rounded animate-pulse mb-2"></div>
              <div className="w-40 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="w-full h-12 bg-primary-main/20 rounded-lg animate-pulse"></div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-2 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3" style={{animationDelay: `${i * 0.1}s`}}>
                    <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                    <div className="flex-1">
                      <div className="w-16 h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Features & Description */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Features */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-2" style={{animationDelay: `${i * 0.1}s`}}>
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                <div className="space-y-2">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}