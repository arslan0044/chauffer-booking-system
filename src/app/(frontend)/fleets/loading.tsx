export default function FleetsLoading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-screen-xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="w-64 h-12 bg-gray-200 rounded mx-auto animate-pulse mb-4"></div>
          <div className="w-96 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
        </div>

        {/* Search and Filters Skeleton */}
        <div className="mb-8 animate-slide-in-up">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-32 h-12 bg-primary-main/20 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Filter chips */}
          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" style={{animationDelay: `${i * 0.1}s`}}></div>
            ))}
          </div>
        </div>

        {/* Results count skeleton */}
        <div className="mb-6">
          <div className="w-48 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Fleet Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
              {/* Image skeleton */}
              <div className="aspect-[4/3] bg-gray-200 animate-pulse relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                <div className="absolute top-4 right-4 w-16 h-6 bg-white/80 rounded animate-pulse"></div>
              </div>
              
              {/* Content skeleton */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-32 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-16 h-5 bg-primary-golden/20 rounded animate-pulse"></div>
                </div>
                
                <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-4"></div>
                
                {/* Specs skeleton */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-12 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
                
                {/* Price and button skeleton */}
                <div className="flex justify-between items-center">
                  <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-24 h-8 bg-primary-main/20 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex justify-center mt-12">
          <div className="flex space-x-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-10 h-10 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}