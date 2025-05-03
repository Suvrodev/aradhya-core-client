const BlogBoxSkl = () => {
  return (
    <div className=" bg-white  rounded-xl shadow-lg flex flex-col h-[400px]">
      <div className="w-full h-48 overflow-hidden flex-shrink-0  rounded-tl-xl rounded-tr-xl skelitonAC"></div>

      <h1 className="h-[30px] w-11/12 mx-auto rounded-md skelitonAC mt-10"></h1>
      <h1 className="h-[20px] w-11/12 mx-auto rounded-md skelitonAC mt-4"></h1>
      <h1 className="h-[20px] w-4/12  rounded-md skelitonAC mt-4 relative left-4"></h1>
    </div>
  );
};

export default BlogBoxSkl;
