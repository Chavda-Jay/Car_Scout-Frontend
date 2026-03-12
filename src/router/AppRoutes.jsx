import { createBrowserRouter,Outlet,RouterProvider } from "react-router-dom"
import Login from "../components/Login"
import Signup from "../components/Signup"
import { UserNavbar } from "../components/user/UserNavbar"
import { Children } from "react"
import { CarList } from "../components/user/CarList"
import { CarDetail } from "../components/user/CarDetail"
import { AdminSidebar } from "../components/admin/AdminSidebar"
import { AllUserList } from "../components/admin/AllUserList"

const router = createBrowserRouter([
    {path:"/",element:<Login/>},
    {path:"/signup",element:<Signup/>},

    {path:"/user",element:<UserNavbar/>,
        children:[
            {path:"carlist",element:<CarList/>},
            {path:"cardetail",element:<CarDetail/>}
        ]
    },
        
    {path:"/admin",element:<AdminSidebar/>,
        children:[
            {path:"allusers",element:<AllUserList/>}
        ]
    },

])

const AppRouter =()=>{
    return <RouterProvider router={router}></RouterProvider>
}

export default AppRouter