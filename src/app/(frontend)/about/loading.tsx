export default function AboutLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <div className="relative h-[70vh] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-96 h-16 bg-white/20 rounded mx-auto animate-pulse"></div>
            <div className="w-64 h-6 bg-white/20 rounded mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto px-4 py-16">
        {/* Content Sections Skeleton */}
        {[...Array(4)].map((_, sectionIndex) => (
          <div key={sectionIndex} className="mb-20 animate-fade-in-up" style={{animationDelay: `${sectionIndex * 0.2}s`}}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Text Content */}
              <div className={sectionIndex % 2 === 0 ? 'order-1' : 'order-2'}>
                <div className="w-32 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="w-48 h-12 bg-gray-200 rounded animate-pulse mb-6"></div>
                <div className="space-y-3 mb-6">
                  <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="w-4/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
                
                {/* Features list skeleton */}
                <div className="space-y-3">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="flex items-center space-x-3">
                      <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Image */}
              <div className={sectionIndex % 2 === 0 ? 'order-2' : 'order-1'}>
                <div className="aspect-[4/3] bg-gray-200 rounded-2xl animate-pulse relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Gallery Section Skeleton */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="w-48 h-12 bg-gray-200 rounded mx-auto animate-pulse mb-4"></div>
            <div className="w-64 h-6 bg-gray-200 rounded mx-auto animate-pulse"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse relative overflow-hidden" style={{animationDelay: `${i * 0.1}s`}}>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer"></div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section Skeleton */}
        <div className="text-center bg-gradient-to-r from-primary-main to-primary-lite rounded-2xl p-12">
          <div className="w-64 h-12 bg-white/20 rounded mx-auto animate-pulse mb-4"></div>
          <div className="w-96 h-6 bg-white/20 rounded mx-auto animate-pulse mb-8"></div>
          <div className="w-40 h-12 bg-white/20 rounded-lg mx-auto animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}