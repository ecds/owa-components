import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

createRoot(document.getElementById("neighborhood-map")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
