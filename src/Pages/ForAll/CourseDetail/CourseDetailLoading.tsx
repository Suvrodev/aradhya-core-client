const CourseDetailLoading = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">
      <div className="flex flex-col-reverse md:flex-row">
        {/* Left Side (60%) - Content Skeleton */}
        <div className="w-full lg:w-[60%] p-6 lg:p-8">
          <div className="space-y-8">
            {/* Course Title & Description Skeleton */}
            <div className="hidden md:block bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <div className="h-10 w-3/4 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 w-full bg-gray-300/30 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-gray-300/30 rounded animate-pulse"></div>
                <div className="h-4 w-2/3 bg-gray-300/30 rounded animate-pulse"></div>
              </div>
            </div>

            {/* YouTube Video Skeleton */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-6 border border-white/10">
              <div className="h-8 w-48 bg-gray-300/30 rounded-lg mb-6 animate-pulse"></div>
              <div className="w-full h-[450px] bg-gray-300/30 rounded-xl animate-pulse"></div>
            </div>

            {/* Course Features Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <div className="h-8 w-64 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-2 bg-white/5 p-3 rounded-lg"
                  >
                    <div className="h-4 w-4 bg-gray-300/30 rounded-full mt-1 animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-300/30 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Stats Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <div className="h-8 w-64 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="text-center bg-white/10 p-3 rounded-lg"
                  >
                    <div className="h-8 w-12 mx-auto bg-gray-300/30 rounded-lg animate-pulse"></div>
                    <div className="h-4 w-16 mx-auto bg-gray-300/30 rounded mt-2 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Curriculum Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <div className="h-8 w-48 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-3 bg-white/5 p-4 rounded-lg"
                  >
                    <div className="h-4 w-4 bg-gray-300/30 rounded-full mt-1 animate-pulse"></div>
                    <div className="h-4 w-3/4 bg-gray-300/30 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Needed Software Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <div className="h-8 w-64 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-4 bg-white/10 rounded-lg"
                  >
                    <div className="w-16 h-16 bg-gray-300/30 rounded-full mb-2 animate-pulse"></div>
                    <div className="h-4 w-20 bg-gray-300/30 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Computer Configuration Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
              <div className="h-8 w-80 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-4 bg-gray-300/30 rounded animate-pulse"
                    style={{ width: `${80 - i * 10}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side (40%) - Fixed Sidebar Skeleton */}
        <div className="w-full lg:w-[40%] bg-gradient-to-b from-[#0a161b] to-[#162d35] p-6 lg:p-8 lg:sticky md:top-20 lg:h-screen">
          <div className="space-y-6">
            {/* Course Image Skeleton */}
            <div className="rounded-xl overflow-hidden shadow-2xl border-2 border-white/10">
              <div className="w-full h-64 bg-gray-300/30 animate-pulse"></div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Mobile Course Title & Description Skeleton */}
              <div className="md:hidden bg-white/5 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/10">
                <div className="h-10 w-3/4 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-gray-300/30 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-300/30 rounded animate-pulse"></div>
                  <div className="h-4 w-2/3 bg-gray-300/30 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Action Button Skeleton */}
              <div className="h-14 w-full bg-teal-600/30 rounded-lg animate-pulse"></div>

              {/* Enrollment Deadline Skeleton */}
              <div className="bg-red-900/20 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-red-500/30">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="h-4 w-32 bg-red-300/30 rounded mb-2 animate-pulse"></div>
                    <div className="h-5 w-40 bg-white/30 rounded animate-pulse"></div>
                  </div>
                  <div className="h-8 w-20 bg-red-500/30 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* Pricing Section Skeleton */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <div className="h-6 w-24 bg-gray-300/30 rounded-lg animate-pulse"></div>
                <div className="h-6 w-16 bg-teal-600/30 rounded-full animate-pulse"></div>
              </div>
              <div className="h-8 w-32 bg-gray-300/30 rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailLoading;
