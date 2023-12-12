import App from "./App";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import CommentsView from "./Components/CommentsView";
import ProfileView from "./Components/ProfileView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="comments" element={<CommentsView />} />
          <Route path="profile" element={<ProfileView />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
