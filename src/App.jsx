import React, {  } from 'react';
import Tests from './Pages/Tests';
import TestMainPage from './Pages/TestMainPage';
import RecordPage from './Pages/Record';
import Dashboard from './Pages/Dashboard';
import MainPage from './Pages/Main';
import NavBar from './Components/NavBar';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TestContentPage from './Pages/TestContentPage';
import TestCompletePage from './Pages/TestCompletePage';


function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
    },
    {
      path: "/testold",
      element: <Tests />,
    },
    {
      path: "/tests",
      element: <TestMainPage />,
    },

    {
      path: "/tests/:id",
      element: <TestContentPage />,
    },
    {
      path: "/test/completed/:id",
      element: <TestCompletePage />,
    },
    {
      path: "/record",
      element: <RecordPage />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <>
      <NavBar></NavBar>
      <RouterProvider router={router} />
    </>
  );
}
export default App;

