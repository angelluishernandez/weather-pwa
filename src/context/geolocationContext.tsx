import React, { useState } from "react";

type GeolocationProviderProps = { children: React.ReactNode };

export const GeolocationContext = React.createContext<
  | {
      location: string;
      setLocation: (location: string) => void;
    }
  | undefined
>(undefined);

const GeolocationProvider = ({ children }: GeolocationProviderProps) => {
  const [location, setLocation] = useState<string>("");

  const value = { location, setLocation };

  return (
    <GeolocationContext.Provider value={value}>
      {children}
    </GeolocationContext.Provider>
  );
};

export default GeolocationProvider;
