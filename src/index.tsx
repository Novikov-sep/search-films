import "./App.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/Home/HomePage";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import FilmItem from "./pages/FilmItem/FilmItem";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ErrorPage from "./pages/Errorpage/ErrorPage";
import Favorites from "./pages/Favorites/Favorites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "/:id",
        element: <FilmItem />,
      },
      {
        path: "/favorites",
        element: <Favorites />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SkeletonTheme baseColor="#e1dada" highlightColor="#525252">
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </SkeletonTheme>
);
