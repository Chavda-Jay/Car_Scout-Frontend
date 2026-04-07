import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "../components/Login";
import Signup from "../components/Signup";

import { UserNavbar } from "../components/user/UserNavbar";
import { AdminSidebar } from "../components/admin/AdminSidebar";

import Home from "../pages/user/Home";
import CarList from "../pages/user/CarList";
import MyOffers from "../pages/user/Myoffers";
import CarDetail from "../pages/user/CarDetail";
import Notifications from "../pages/user/Notifications";
import MyTestDrives from "../pages/user/MyTestDrives";

import Dashboard from "../pages/admin/Dashboard";
import AddCar from "../pages/admin/AddCar";
import ManageCars from "../pages/admin/ManageCars";
import Offers from "../pages/admin/Offers";
import Inspection from "../pages/admin/Inspection";
import ManageUsers from "../pages/admin/ManageUsers";
import AddUser from "../pages/admin/AddUser";
import TestDrives from "../pages/admin/TestDrives";

import { Forgotpassword } from "../components/ForgotPassword";
import { ResetPassword } from "../components/ResetPassword";

import SellerHome from "../pages/seller/SellerHome";
import MyListings from "../pages/seller/MyListings";
import SellerOffers from "../pages/seller/SellerOffers";
import SellerTestDrives from "../pages/seller/SellerTestDrives";
import AddCarWizard from "../pages/seller/AddCarWizard";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/forgotpassword", element: <Forgotpassword /> },
  { path: "/resetpassword/:token", element: <ResetPassword /> },

  {
    path: "/user",
    element: <UserNavbar />,
    children: [
      { index: true, element: <Home /> },
      { path: "cars", element: <CarList /> },
      { path: "offers", element: <MyOffers /> },
      { path: "car/:id", element: <CarDetail /> },
      { path: "notifications", element: <Notifications /> },
      { path: "testdrives", element: <MyTestDrives /> }
    ]
  },

  {
    path: "/admin",
    element: <AdminSidebar />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "addcar", element: <AddCar /> },
      { path: "managecars", element: <ManageCars /> },
      { path: "offers", element: <Offers /> },
      { path: "testdrives", element: <TestDrives /> },
      { path: "inspection", element: <Inspection /> },
      { path: "users", element: <ManageUsers /> },
      { path: "adduser", element: <AddUser /> }
    ]
  },

  {
    path: "/seller",
    element: <UserNavbar />,
    children: [
      { index: true, element: <SellerHome /> },
      { path: "addcar", element: <AddCarWizard /> },
      { path: "offers", element: <SellerOffers /> },
      { path: "my-listings", element: <MyListings /> },
      { path: "notifications", element: <Notifications /> },
      { path: "testdrives", element: <SellerTestDrives /> }
    ]
  }
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
