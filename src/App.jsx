import { useState } from "react";
import Forecast from "./component/Forecast";
import Input from "./component/Input";
import TempDetails from "./component/TempDetails";
import TimeAndLocation from "./component/TimeAndLocation";
import TopButton from "./component/TopButton";
import getFormattedWeatherData from "./Services/Weather";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [query, setQuery] = useState({ q: "delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const data = await getFormattedWeatherData({ ...query, units });
    if (data) toast.success(`Successfully fetched weather for ${data.name} , ${data.country}`);
    setWeather(data);
  };
  useEffect(() => {
    const message = query.q ? query.q : "current location.";
    toast.info("fetching weather for " + message);
    fetchWeather();
  }, [query, units]);
  const formatBackground = () => {
    if (!weather) return "bg-transparent";
    const threshold = units === "metric" ? 20 : 60;

    if (weather.temp <= threshold) return " backdrop-blur-md   bg-gray-500 ";
    return " bg-orange-400";
  };

  const contextClass = {
    success: "bg-green-600",
    info: "bg-blue-700",
    warning: "bg-orange-400",
    default: "bg-indigo-600",
    dark: "bg-white-600 font-gray-300",
  };

  return (
    <div className=' px-4'>
      <video
        className='h-[100%] w-[100%] object-cover absolute top-0 left-0 z-0'
        src='./assets/videobg.mp4'
        autoPlay
        loop
        muted
      />
      <div
        className={`  mx-auto max-w-screen-md   mt-4 py-5 px-32 bg-gradient-to-br h-[95vh] rounded-3xl  z-10   shadow-xl  bg-clip-padding backdrop-filter backdrop-blur-sm 
        bg-opacity-40 border border-black      ${formatBackground()}   

        flex
        flex-col
        justify-center
        items-center
    px-3
        `}
      >
        {weather && (
          <>
            <TopButton setQuery={setQuery} />
            <Input setQuery={setQuery} setUnits={setUnits} fetchWeather={fetchWeather} />
            <TimeAndLocation weather={weather} />
            <TempDetails weather={weather} />
            <Forecast title={"hourly forecast"} data={weather.hourly} />
            <Forecast title={"Daily forecast"} data={weather.daily} />
          </>
        )}
      </div>
      <ToastContainer
        toastClassName={({ type }) =>
          contextClass[type || "default"] +
          " m-3 w-[70%] sm:w-full relative  p-1 min-h-10 rounded-md flex justify-center items-center overflow-hidden cursor-pointer shadow-md   bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70   "
        }
        bodyClassName={() => "text-sm font-white font-med block p-3 flex justify-start "}
        autoClose={3000}
        theme='colored'
        newestOnTop={true}
      />
    </div>
  );
}

export default App;

