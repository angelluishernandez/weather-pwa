import React, { useState } from "react";

type WeatherProviderProps = { children: React.ReactNode };

export const WeatherContext = React.createContext<
  | {
      location: string;
      setLocation: (location: string) => void;
      setIsCelsius: (isCelsius: boolean) => void;
      isCelsius: boolean;
    }
  | undefined
>(undefined);

const WeatherProvider = ({ children }: WeatherProviderProps) => {
  const [location, setLocation] = useState<string>("");
  const [isCelsius, setIsCelsius] = useState<boolean>(true);

  const value = { location, setLocation, isCelsius, setIsCelsius };

  return <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>;
};

export default WeatherProvider;
