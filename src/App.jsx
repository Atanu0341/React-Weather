import { useEffect, useState } from "react";
import Highlights from "./components/Highlights";
import Temperature from "./components/Temperature";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const apiURL = `https://api.weatherapi.com/v1/current.json?key=c73ce4ec89334dc4be875751240302&q=${city}&aqi=no`;

  useEffect(() => {
    fetch(apiURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [city]);

  return (
    <>
      <div className={darkTheme ? "dark" : ""}>
        <div className="bg-red-300 dark:bg-slate-800 pt-8 flex justify-center flex-col gap-4 w-screen  md:flex-row md:h-screen">
          <div className="relative">
            <button
              type="button"
              onClick={() => setDarkTheme(!darkTheme)}
              className="absolute  text-xl dark:bg-gray-50 dark:text-gray-900 bg-white border rounded-full px-2 py-1 hover:shadow-lg"
            >
              {darkTheme ? "💡" : "🌙"}
            </button>
            </div>
          <div className=" mt-8 flex flex-col items-center justify-center gap-4">
            {weatherData && (
              <Temperature
                setDarkTheme={setDarkTheme}
                darkTheme={darkTheme}
                setCity={setCity}
                stats={{
                  temp: weatherData.current.temp_c,
                  condition: weatherData.current.condition.text,
                  isDay: weatherData.current.is_day,
                  location: weatherData.location.name,
                  time: weatherData.location.localtime,
                }}
              />
            )}
          </div>

          <div className=" flex flex-col justify-center gap-4 p-4">
            <h1 className="text-black dark:text-slate-200 text-2xl col-span-2 text-center">
              Today's Highlights
            </h1>
            <div className="flex flex-col justify-center items-center w-full gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 w-full gap-5">
                {weatherData && (
                  <>
                    <Highlights
                      stats={{
                        title: "Wind Status",
                        value: weatherData.current.wind_mph,
                        unit: "mph",
                        direction: weatherData.current.wind_dir,
                      }}
                    />
                    <Highlights
                      stats={{
                        title: "Humidity",
                        value: weatherData.current.humidity,
                        unit: "%",
                      }}
                    />
                    <Highlights
                      stats={{
                        title: "Visibility",
                        value: weatherData.current.vis_miles,
                        unit: "mph",
                      }}
                    />
                    <Highlights
                      stats={{
                        title: "Air Pressure",
                        value: weatherData.current.pressure_mb,
                        unit: "mb",
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
