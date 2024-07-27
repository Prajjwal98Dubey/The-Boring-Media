import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import Home from "./pages/Home"
import Register from './components/Register'
import Login from './components/Login'
import MyProfile from './pages/MyProfile'
function App() {
 
  return (
    <>
      <RouterProvider router={appRouter}/>
    </>
  )
}

export default App


const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/auth/register',
    element:<Register/>
  },
  {
    path:'/auth/login',
    element:<Login/>
  },
  {
    path:'/u/:id',
    element:<MyProfile/>
  }
])
