import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";

createRoot(document.getElementById("mapsnap-test")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
