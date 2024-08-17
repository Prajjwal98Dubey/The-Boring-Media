import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import MyProfile from "./pages/MyProfile";
import Store from "./pages/Store";
import BookMark from "./pages/BookMark";
import Download from "./pages/Download";
import SinglePostPage from "./pages/SinglePostPage";
function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
}

export default App;

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/auth/register",
    element: <Register />,
  },
  {
    path: "/auth/login",
    element: <Login />,
  },
  {
    path: "/u/:id",
    element: <MyProfile />,
  },
  {
    path: "/store",
    element: <Store />,
  },
  {
    path: "/bookmark",
    element: <BookMark />,
  },
  {
    path: "/download",
    element: <Download />,
  },
  {
    path: "/post/:id",
    element: <SinglePostPage />,
  },
]);
