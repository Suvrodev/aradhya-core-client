import "./App.css";
import aradhyaImage from "./assets/FontPage/aradhya.jpeg";
function App() {
  return (
    <div>
      <img
        src={aradhyaImage}
        alt=""
        className="w-full md:w-8/12 mx-auto rounded-md shadow-lg"
      />
    </div>
  );
}

export default App;
