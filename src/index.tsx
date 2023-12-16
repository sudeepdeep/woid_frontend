import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainRoutes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <MainRoutes />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
