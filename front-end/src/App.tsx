import {createRoutesFromElements,createBrowserRouter,Route,RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./pages/Movies";
import User from "./pages/User";
import './App.css';
import { useEffect, useState } from "react";
import UserForm from "./components/UserForm";
import UserEditForm from "./components/UserForm/UserEditForm";
import LoginSignup from "./components/Container/LoginSignup";
import authService from "./services/auth.services";
import Genres from "./pages/Genres";
import {ExpandAltOutlined, UserOutlined} from "@ant-design/icons";
import GenreForm from "./components/Form/GenreForm";
import GenreEditForm from "./components/Form/GenreEditForm";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<User title="Users List" icon={<UserOutlined/>} iconText="Add User" iconUrl="/users/create"/>}/>
      <Route path="/users/create" element={<UserForm/>}/>
      <Route path="/user/edit/:id" element={<UserEditForm/>}/>
      <Route path="/movies" element={<Movies/>}/>
      <Route path="/genres" element={
          <Genres title="Genres List" icon={<ExpandAltOutlined/>} iconText="Add Genre" iconUrl="/genres/create"/>}
      />
      <Route path="/genres/create" element={<GenreForm/>}/>
      <Route path="/genres/edit/:id" element={<GenreEditForm/>}/>
    </Route>
  )
);

function App() {
  const [currentUser,setCurrentUser] = useState(null);
  useEffect(() => {
    const user = authService.getCurrentUser();
    if(user) {
      setCurrentUser(user);
    }
  },[]);
  return (
  <>
     {
      !currentUser && <LoginSignup/>
     }
     {
      currentUser && <RouterProvider router={router}/>
     }
  </>)
}

export default App
