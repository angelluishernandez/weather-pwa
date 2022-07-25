import { formattedCurrentWeather } from "../../types/formattedCurrentWeather";
import styled from "styled-components";

type Props = {
  pastWeatherItem: formattedCurrentWeather;
  handleWeatherItemSelect: (index: number) => void;
  handleWeatherItemDelete: (index: number) => void;
  index: number;
  isActive: boolean;
  formatDate: (date: number) => string;
  isCelsius: boolean;
};

const PastWeatherItem = ({
  pastWeatherItem,
  handleWeatherItemDelete,
  handleWeatherItemSelect,
  index,
  isActive,
  formatDate,
  isCelsius,
}: Props) => {
  const { locationName, resultsDate, temperature, conditionText } = pastWeatherItem;
  return (
    <li
      key={index}
      onClick={() => handleWeatherItemSelect(index)}
      className={`list-group-item ${isActive && "active"} row gx-3 `}
    >
      <span className="col-md-3">{locationName}</span>
      <span className="col-md-3">
        {temperature}
        {isCelsius ? "º" : "F"}
      </span>
      <span className="col-md-3">{formatDate(resultsDate)}</span>
      <span className="col-md-3">{conditionText}</span>
      <span>
        <button className="btn btn-danger" onClick={() => handleWeatherItemDelete(index)}>
          X
        </button>
      </span>
    </li>
  );
};

const DeleteButton = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background-color: red;
  color: white;
  border-radius: 50%;
`;

export default PastWeatherItem;
