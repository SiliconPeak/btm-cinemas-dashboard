import {createRoutesFromElements,createBrowserRouter,Route,RouterProvider} from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./pages/Movies";
import User from "./pages/User";
import './App.css';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<User/>}/>
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
