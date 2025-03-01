const AboutUs = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-4 items-center justify-center">
      <h1 className="font-bold text-4xl">About Us Page</h1>
      <span className=" bg-green-500 py-4 px-6 rounded-md font-bold flex gap-4 items-center">
        <span className="loading loading-spinner text-neutral"></span>
        Loading
      </span>
    </div>
  );
};

export default AboutUs;
