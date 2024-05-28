import React from "react";
import Navbar from "./components/Navbar";
import HomePosts from "./components/HomePosts";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Post from "./components/Post";
import Register from "./components/Register";
import Login from "./components/Login";
import NewPost from "./components/NewPost";
import EditPost from "./components/EditPost";
import MainPost from "./components/MainPost";
import { UserContextProvider } from "./components/UserContext";
import Layout from "./components/Layout";
import MainPage from "./components/MainPage";
import "./index.css";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <UserContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/newpost" element={<NewPost />} />
              <Route path="mainpost/:id" element={<MainPost />} />
              <Route path="/editpost/:id" element={<EditPost />} />
            </Route>
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
