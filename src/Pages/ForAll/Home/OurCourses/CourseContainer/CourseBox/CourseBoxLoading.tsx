const CourseBoxLoading = () => {
  return (
    <div className="flex flex-col gap-y-4  rounded-md border-[4px] shadow-md shadow-gray-700 bg-gray-400 ">
      <div className="w-full h-[180px] rounded-md  skelitonAC"></div>
      <div className={`px-4  h-[200px] relative`}>
        <h1 className="h-[30px] rounded-sm w-full skelitonAC"></h1>
        <h1 className="h-[16px] mt-4 rounded-sm  w-full skelitonAC"></h1>
        <h1 className="h-[16px] mt-2 rounded-sm  w-full skelitonAC"></h1>
        <h1 className="h-[16px] mt-2 rounded-sm  w-full skelitonAC"></h1>
      </div>
    </div>
  );
};

export default CourseBoxLoading;
