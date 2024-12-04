import React from 'react';
import ReactDOM from 'react-dom/client';
import Routering from "./routes/routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastContainer />
    <Routering />
  </React.StrictMode>
);
