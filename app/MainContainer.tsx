import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from "expo-constants";

type WeatherData = {
  main: {
    temp: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  name: string;
  // Add other properties as needed
};

const MainContainer = () => {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [weatherImgs, setWeatherImgs] = useState<any>(null);

  const apiKey = Constants.expoConfig?.extra?.API_KEY;
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";

  const searchWeather = async () => {
    try {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

      if (response.status === 404) {
        setError("City Not Found");
        setWeatherData(null);
        setWeatherImgs(null);
      } else {
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
        setError(null);

        setWeatherImgs(() => {
          // data.weather?.length>0 is equal to data.weather && data.weather.length > 0
          if (data.weather?.length > 0) {
            const weatherMain = data.weather[0].main;
            switch (weatherMain) {
              case "Clouds":
                return "/assets/images/clouds.png";
              case "Clear":
                return "/assets/images/clear.png";
              case "Rain":
                return "/assets/images/rain.png";
              case "Drizzle":
                return "/assets/images/drizzle.png";
              case "Mist":
                return "/assets/images/mist.png";
            }
          } else {
            return "/assets/images/weathericon.png";
          }
        });
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setError("Error fetching weather data");
      setWeatherData(null);
      setWeatherImgs(null);
    }
  };
  const handleEnterKey = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchWeather();
    }
  };

  return (
    <View className="w-[90%] max-w-[470px] text-white mt-20 mx-auto rounded-3xl py-10 px-7 text-center bg-gradient-to-br from-teal-400 via-teal-500 to-purple-800">
      <View className="w-full flex flex-col space-y-5 sm:space-y-0 sm:flex-row items-center text-center sm:justify-center">
        <TextInput
          placeholder="enter city name"
          spellCheck={false}
          className="border-none outline-none text-[#555] px-6 h-[60px] rounded-full w-full sm:flex-1 sm:mr-4 text-lg"
          value={city}
          onChangeText={(text) => setCity(text)}
          onSubmitEditing={handleEnterKey}
        />
        <TouchableOpacity
          onPress={searchWeather}
          className="border-none outline-none bg-white rounded-full w-[40px] h-[40px] sm:w-[60px] sm:h-[60px] cursor-pointer flex justify-center items-center hover:opacity-95 hover:scale-95 border border-gray-500 transition duration-300"
        >
          <Text>Button</Text>
        </TouchableOpacity>
      </View>
      {weatherData ? (
        // Display weather data
        <View className="space-y-8">
          <View>
            <View className="flex justify-center">
              <Image
                source={weatherImgs}
                alt="weather icons"
                className="w-[160px] mt-4 rounded-full"
              />
            </View>

            <Text className="text-7xl font-medium">
              {weatherData && weatherData.main && weatherData.main.temp
                ? Math.round(weatherData.main.temp)
                : ""}
            </Text>

            <Text className="text-4xl font-normal">
              {weatherData.name || ""}
            </Text>
          </View>
          <View className="flex items-center justify-between px-5">
            <View className="flex items-center text-left space-x-2">
              <Image
                src="/images/humidity.png"
                alt="humidity icon"
                className="w-10"
              />
              <View>
                <Text className="text-xl">
                  {weatherData.main && weatherData.main.humidity
                    ? `${weatherData.main.humidity}%`
                    : ""}
                </Text>
                <Text>Humidity</Text>
              </View>
            </View>
            <View className="flex items-center text-left space-x-2">
              <Image
                src="/images/wind.png"
                alt="humidity icon"
                className="w-10"
              />
              <View>
                <Text className="text-xl">
                  {weatherData.wind && weatherData.wind.speed
                    ? `${weatherData.wind.speed} Km/h`
                    : ""}
                </Text>
                <Text>Wind Speed</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View
          className={
            error
              ? `h-[300px] flex justify-center items-center text-4xl`
              : "h-0"
          }
        >
          <Text>{error}</Text>
        </View>
      )}
    </View>
  );
};

export default MainContainer;
