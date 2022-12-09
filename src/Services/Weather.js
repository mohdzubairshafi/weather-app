import { DateTime } from "luxon";
const WEATHER_URL = process.env.REACT_APP_WEATHER_URL;
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
function GetWeatherData(infotype, SearchParams) {
  const url = new URL(WEATHER_URL + infotype);
  url.search = new URLSearchParams({
    ...SearchParams,
    appid: API_KEY,
  });

  return fetch(url)
    .then((res) => res.json())
    .then((data) => data);
}

const formatCurrentWeather = (data) => {
  const {
    coord: { lon, lat },
    weather: [{ main: details, description, icon }],
    base: stations,
    main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
    visibility,
    wind: { speed },
    clouds: { all },
    dt,
    sys: { country, sunrise, sunset },
    name,
  } = data;

  return {
    name,
    lon,
    lat,
    details,
    description,
    icon,
    stations,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    visibility,
    speed,
    all,
    dt,
    country,
    sunrise,
    sunset,
  };
};

function formatForecastWeather(data) {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return { title: formatToLocalTime(d.dt, timezone, "ccc"), temp: d.temp.day, icon: d.weather[0].icon };
  });
  hourly = hourly.slice(1, 6).map((d) => {
    return { title: formatToLocalTime(d.dt, timezone, "hh:mm a"), temp: d.temp, icon: d.weather[0].icon };
  });
  return { timezone, daily, hourly };
}
async function getFormattedWeatherData(SearchParams) {
  const formattedCurrentWeather = await GetWeatherData("weather", SearchParams).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;
  const formattedForecastWeather = await GetWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: SearchParams.units,
  }).then(formatForecastWeather);
  return { ...formattedCurrentWeather, ...formattedForecastWeather };
}

const formatToLocalTime = (
  secs,
  zone,

  format = "cccc, dd LLL yyyy ' | Local time: 'hh:mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
};

const iconeUrlFromCode = (icon) => {
  return `http://openweathermap.org/img/wn/${icon}@2x.png`;
};
export default getFormattedWeatherData;

export { formatToLocalTime, iconeUrlFromCode };
