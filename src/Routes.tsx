import App from "./App";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./Layout/Layout";
import CommentsView from "./Components/CommentsView";
import ProfileView from "./Components/ProfileView";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import PublicFeed from "./pages/PublicFeed/PublicFeed";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import About from "./pages/About";
import Message from "./pages/messages/Message";
import Success from "./pages/Success";

export const MainRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<App />} />
          <Route path="comments" element={<CommentsView />} />
          <Route path="profile" element={<ProfileView />} />
          <Route path="full-profile" element={<Profile />} />
          <Route path=":userId/profile" element={<Profile />} />
          <Route path="public-feed" element={<PublicFeed />} />
          <Route path=":userId/edit-profile" element={<EditProfile />} />
          <Route path="about" element={<About />} />
          <Route path="inbox" element={<Message />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/success" element={<Success />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default MainRoutes;
