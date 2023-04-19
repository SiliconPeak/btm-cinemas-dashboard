import {createRoutesFromElements,createBrowserRouter,Route,RouterProvider,Link} from "react-router-dom";
import Layout from "./components/Layout";
import Movies from "./pages/Movies";
import User from "./pages/User";
import './App.css';
import { useEffect, useState } from "react";
import UserForm from "./components/Form/UserForm";
import UserEditForm from "./components/UserForm/UserEditForm";
import LoginSignup from "./components/Container/LoginSignup";
import authService from "./services/auth.services";
import Genres from "./pages/Genres";
import {
  ExpandAltOutlined, 
  UserOutlined,
  BorderlessTableOutlined,
  StrikethroughOutlined,
  FrownOutlined,
  VideoCameraOutlined
} from "@ant-design/icons";
import GenreForm from "./components/Form/GenreForm";
import GenreEditForm from "./components/Form/GenreEditForm";
import MovieRoles from "./pages/MovieRoles";
import MovieRoleForm from "./components/Form/MovieRoleForm";
import MovieRoleEditForm from "./components/Form/MovieRoleEditForm";
import DepartmentForm from "./components/Form/DepartmentForm";
import Department from "./pages/Department";
import DepartmentEditForm from "./components/Form/DepartmentEditForm";
import PersonForm from "./components/Form/PersonForm";
import Person from "./pages/Person";
import PersonEditForm from "./components/Form/PersonEditForm";
import MovieForm from "./components/Form/MovieForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
      <Route index element={<User title="Users List" icon={<UserOutlined/>} iconText="Add User" iconUrl="/users/create"/>}/>
      <Route path="/users/create" element={
        <UserForm
            title="Create User"
            items={[
              {
                title:<Link to="/">Users</Link>
              },
              {
                title:'Create'
              }
            ]}
            successMessage="User created successfully!!"
            errorMessage="Failed to create user!!"
            navigateAfterSubmission="/"
        />
      }/>
      <Route path="/user/edit/:id" element={<UserEditForm/>}/>
      <Route path="/movies" element={
          <Movies title="Movies List" icon={<VideoCameraOutlined/>} iconText="Add Movie" iconUrl="/movie/create"/>
      }/>
      <Route path="/movie/create" element={
        <MovieForm
           title="Create Movie"
           items={[
            {
              title:<Link to="/movies">Movie</Link>
            },
            {
              title:"Create"
            }
           ]}
           successMessage="Movie created successfully!!"
           errorMessage="Failed to create movie!!"
           navigateAfterSubmission="/movies"
        />
      }/>
      <Route path="/genres" element={
          <Genres title="Genres List" icon={<ExpandAltOutlined/>} iconText="Add Genre" iconUrl="/genres/create"/>}
      />
      <Route path="/genres/create" element={
          <GenreForm 
            title="Create Genre" 
            items={[
              {
                  title:<Link to="/genres">Genre</Link>
              },
              {
                  title:"Create"
              }
            ]}
            successMessage="Genre created successfully!!"
            errorMessage="Failed to create genre!!"
            navigateAfterSubmission="/genres"
          />}
      />
      <Route path="/genres/edit/:id" element={<GenreEditForm/>}/>
      <Route path="/movie-roles" element={
        <MovieRoles title="Movie Roles List" icon={<BorderlessTableOutlined />} iconText="Add Movie Role" iconUrl="/movie-roles/create"/>
      }/>
      <Route
         path="/movie-roles/create"
         element={
          <MovieRoleForm
             title="Create Movie Role"
             items={[
              {
                title:<Link to="/movie-roles">Movie Role</Link>
              },
              {
                title:'Create'
              }
             ]}
             successMessage="Movie role created successfully!!"
             errorMessage="Failed to create movie role"
             navigateAfterSubmission="/movie-roles"
          />
         }
      />
      <Route
         path="/movie-roles/edit/:id" element={<MovieRoleEditForm/>}
      />
      <Route
        path="/department"
        element={
          <Department
             title="Department List"
             icon={<StrikethroughOutlined />}
             iconUrl="/department/create"
             iconText="Add department"
          />
        }
      />
      <Route
        path="/department/create"
        element={
          <DepartmentForm
             title="Create Department"
             items={[
              {
                title:<Link to="/department">Department</Link>
              },
              {
                title:'Create'
              }
             ]}
             navigateAfterSubmission="/department"
             errorMessage="Failed to create department"
             successMessage="Department created successfully!!"
          />
        }
      />
      <Route
        path="/department/edit/:id"
        element={<DepartmentEditForm/>}
      />
      <Route
        path="/person/create"
        element={
          <PersonForm
            title="Create Person"
            items={[
            {
              title:<Link to="/person">Department</Link>
            },
            {
              title:'Create'
            }
            ]}
            navigateAfterSubmission="/person"
            errorMessage="Failed to create person"
            successMessage="Person created successfully!!"
          />
        }
      />
      <Route
        path="/person"
        element={
          <Person
             title="Persons List"
             icon={<FrownOutlined />}
             iconUrl="/person/create"
             iconText="Add person"
          />
        }
      />
      <Route
         path="/person/edit/:id"
         element={<PersonEditForm/>}
      />
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
