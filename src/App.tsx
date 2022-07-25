import { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { WeatherContext } from "./context/weatherContext";
import Router from "./router/Router";

function App() {
  const locationContext = useContext(WeatherContext);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }, []);

  return (
    <Layout>
      <Router />
    </Layout>
  );
}

export default App;
