import { formattedCurrentWeather } from "../../types/formattedCurrentWeather";
import styled from "styled-components";

type Props = {
  pastWeatherItem: formattedCurrentWeather;
  handleWeatherItemDelete: () => void;
};

const PastWeatherItem = ({ pastWeatherItem, handleWeatherItemDelete }: Props) => {
  return <div>PastWeatherItem</div>;
};

export default PastWeatherItem;
