import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainContainer } from "../../components/MainContainer/MainContainer";
import { RoundedButton } from "../../components/RoundedButton/RoundedButton";
import { WeatherContext } from "../../context/weatherContext";

const Settings = () => {
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [lang, setLang] = useState<string>("en-ES");
  const weatherContext = useContext(WeatherContext);
  let navigate = useNavigate();

  const onSave = () => {
    localStorage.setItem("settings", JSON.stringify({ isCelsius, lang }));
    weatherContext?.setIsCelsius(isCelsius);
    navigate("/");
  };

  const handleTempChange = (val: string) => {
    setIsCelsius(val === "celsius");
  };

  return (
    <MainContainer>
      <div className="form-group">
        <label htmlFor="">
          <input type="radio" checked={isCelsius} onChange={(e) => handleTempChange(e.target.value)} value="celsius" />
          Use celsius
        </label>
        <label htmlFor="">
          <input
            type="radio"
            checked={!isCelsius}
            value={"farenheit"}
            onChange={(e) => handleTempChange(e.target.value)}
          />
          Use farenheit
        </label>
      </div>

      <RoundedButton bgColor="green" color="white" onClick={onSave}>
        Save
      </RoundedButton>
    </MainContainer>
  );
};

export default Settings;
