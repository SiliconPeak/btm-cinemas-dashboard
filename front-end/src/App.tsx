import {createRoutesFromElements,createBrowserRouter,Route,RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./pages/Movies";
import User from "./pages/User";
import './App.css';
import { NavigateFunction } from "./lib/types";
import { useEffect } from "react";
import UserForm from "./components/UserForm";
import UserEditForm from "./components/UserForm/UserEditForm";
import LoginSignup from "./components/Container/LoginSignup";
const isLoggedIn = true;
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={ isLoggedIn ? <Layout/> : <LoginSignup/>}>
      <Route index element={<User/>}/>
      <Route path="/users/create" element={<UserForm/>}/>
      <Route path="/user/edit/:id" element={<UserEditForm/>}/>
      <Route path="/movies" element={<Movies/>}/>
    </Route>
  )
);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
