import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import i18next from "i18next";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "./styles/index.css";
import common_de from "./translations/de/common.json";
import common_en from "./translations/en/common.json";
import common_es from "./translations/es/common.json";
import common_id from "./translations/id/common.json";
import common_vi from "./translations/vi/common.json";

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

i18next.init({
  interpolation: { escapeValue: false },
  lng: "fr",
  resources: {
    en: {
      common: common_en
    },
    de: {
      common: common_de
    },
    es: {
      common: common_es
    },
    id: {
      common: common_id
    },
    vi: {
      common: common_vi
    }
  }
});

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Router>
    <Analytics />
    <SpeedInsights />
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
  </Router>
);
