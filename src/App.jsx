import { Link } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Gigs from "./pages/gigs/Gigs";
import Gig from "./pages/gig/Gig";
import Orders from "./pages/orders/Orders";
import MyGigs from "./pages/myGigs/MyGigs";
import Add from "./pages/add/Add";
import Messages from "./pages/messages/Messages";
import Message from "./pages/message/Message";
import Login from "./pages/login/Login";

function App() {
  const Layout = () => {
    return (
      <>
        <div className="app">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
        <div className="warn-container">
          <div className="warning">
            <h1>
              <span>warn:</span> This project is not optimized for smaller
              screens
            </h1>
            <p>
              Visit this on bigger screen or visit my other projects to check
              responsive designs
            </p>
            <Link to="/sahils.in">
              <button>Go to Portfolio &rarr;</button>
            </Link>
          </div>
        </div>
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/gigs",
          element: <Gigs />,
        },
        {
          path: "/gig/:id",
          element: <Gig />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/mygigs",
          element: <MyGigs />,
        },
        {
          path: "/add",
          element: <Add />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/message/:id",
          element: <Message />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
