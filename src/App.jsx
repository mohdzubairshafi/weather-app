import { useState } from "react";
import Forecast from "./component/Forecast";
import Input from "./component/Input";
import TempDetails from "./component/TempDetails";
import TimeAndLocation from "./component/TimeAndLocation";
import TopButton from "./component/TopButton";
import getFormattedWeatherData from "./Services/Weather";
import { DateTime } from "luxon";
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
    if (!weather) return "from-cyan-700 to-blue-700  ";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";
    return "from-yellow-700 to-orange-700";
  };
  return (
    <>
      <div
        className={` mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
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
      <ToastContainer autoClose={3000} theme='colored' newestOnTop={true} />
    </>
  );
}

export default App;

