import "./App.css";
import aradhyaImage from "./assets/FontPage/aradhya.jpeg";
function App() {
  return (
    <div>
      <img
        src={aradhyaImage}
        alt=""
        className="w-full md:w-1/2 lg-1/3 mx-auto rounded-md"
      />
    </div>
  );
}

export default App;
