export type formattedCurrentWeather = {
  feelsLike: number;
  humidity: number;
  isDay: boolean;
  temperature: number;
  windDirection: string;
  windSpeed: number;
  conditionText: string;
  conditionPicture: string;
  locationName: string;
  time: Date;
  resultsDate: number;
  id?: number;
};
