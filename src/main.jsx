import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
);