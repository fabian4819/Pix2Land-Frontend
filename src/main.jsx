import React from "react";
import ReactDOM from "react-dom/client";
// UBAH BARIS INI:
// import App from './Admin/App.jsx' // <-- INI JALUR LAMA
import App from "./App.jsx"; // <-- INI JALUR BARU (menunjuk ke src/App.jsx)
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
