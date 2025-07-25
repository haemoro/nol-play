import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import App from "@/App";
ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(React.StrictMode, null,
    React.createElement(Provider, null,
        React.createElement(App, null))));
