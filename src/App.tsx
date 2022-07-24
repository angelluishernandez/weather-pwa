import { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { GeolocationContext } from "./context/geolocationContext";
import Router from "./router/Router";

function App() {
  const locationContext = useContext(GeolocationContext);

  console.log(locationContext);
  useEffect(() => {
    console.log("Pasa");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log("pASA 2");
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
