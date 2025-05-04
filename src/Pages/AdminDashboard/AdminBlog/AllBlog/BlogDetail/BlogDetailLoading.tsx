const BlogDetailLoading = () => {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-teal-500 to-[#262F51] py-12 px-4 md:px-8">
    //   <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10 animate-pulse space-y-6">
    //     {/* Image Skeleton */}
    //     <div className="w-full h-64 md:h-80 bg-gray-300/30 rounded-lg" />

    //     {/* Title Skeleton */}
    //     <div className="h-8 bg-gray-300/40 rounded w-3/4" />

    //     {/* Metadata Skeleton */}
    //     <div className="flex flex-wrap gap-4">
    //       {Array(4)
    //         .fill("")
    //         .map((_, idx) => (
    //           <div key={idx} className="h-6 w-28 bg-gray-300/40 rounded-full" />
    //         ))}
    //     </div>

    //     {/* Content Skeleton */}
    //     <div className="space-y-3 bg-white p-4 rounded-md">
    //       {Array(6)
    //         .fill("")
    //         .map((_, idx) => (
    //           <div
    //             key={idx}
    //             className={`h-4 ${
    //               idx % 3 === 0 ? "w-5/6" : "w-full"
    //             } bg-gray-300 rounded`}
    //           />
    //         ))}
    //     </div>
    //   </div>
    // </div>

    // DeepSheek
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-[#262F51] py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl shadow-2xl p-6 md:p-10">
        {/* Blog Image Skeleton */}
        <div className="w-full h-64 md:h-80 overflow-hidden rounded-lg mb-8 bg-gray-300/30 animate-pulse"></div>

        {/* Blog Title Skeleton */}
        <div className="h-10 w-3/4 bg-gray-300/30 rounded-lg mb-4 animate-pulse"></div>

        {/* Blog Metadata Skeleton */}
        <div className="flex flex-wrap gap-4 mb-8">
          <div className="h-6 w-20 bg-gray-300/30 rounded-full animate-pulse"></div>
          <div className="h-6 w-24 bg-gray-300/30 rounded-full animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-300/30 rounded-full animate-pulse"></div>
          <div className="h-6 w-32 bg-gray-300/30 rounded-full animate-pulse"></div>
        </div>

        {/* Blog Content Skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full bg-gray-300/30 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300/30 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-gray-300/30 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-300/30 rounded animate-pulse"></div>
          <div className="h-4 w-3/4 bg-gray-300/30 rounded animate-pulse"></div>
          <div className="h-4 w-full bg-gray-300/30 rounded animate-pulse"></div>
          <div className="h-4 w-5/6 bg-gray-300/30 rounded animate-pulse"></div>
          <div className="h-4 w-2/3 bg-gray-300/30 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailLoading;
