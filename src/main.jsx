import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Theme } from "@radix-ui/themes";
import App from "./App.jsx";
import "@radix-ui/themes/styles.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Theme>
  </StrictMode>,
);
