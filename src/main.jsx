import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import 'leaflet/dist/leaflet.css';
// import { ActiveTabProvider } from "./components/ActiveTabContext.jsx";
import GlobalContextProvider from "./components/GlobalContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </StrictMode>
);
