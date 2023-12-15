import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ExploreIcon,
  MessageIcon,
  AboutIcon,
  ProfileIcon,
  ActivateHomeIcon,
  ActivateMessageIcon,
  ActivateExploreIcon,
  ActivateAboutIcon,
  ActivateProfileIcon,
} from "../Icons";
import ProfileView from "../Components/ProfileView";
import { FeedStore } from "../App";
import CommentsView from "../Components/CommentsView";
import { Store } from "pullstate";
import axios from "../services/axios";
import { useQuery } from "react-query";
import Cookies from "js-cookie";

export const userStore = new Store({
  userData: null,
  logout: false,
});

const menuLists = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
    activeIcon: <ActivateHomeIcon />,
  },
  {
    title: "Inbox",
    path: "/inbox",
    icon: <MessageIcon />,
    activeIcon: <ActivateMessageIcon />,
  },
  {
    title: "Public",
    path: "/public",
    icon: <ExploreIcon />,
    activeIcon: <ActivateExploreIcon />,
  },
  {
    title: "About",
    path: "/about",
    icon: <AboutIcon />,
    activeIcon: <ActivateAboutIcon />,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: <ProfileIcon />,
    activeIcon: <ActivateProfileIcon />,
  },
];

function Layout() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(1);
  const state = FeedStore.useState((s) => s);
  const userState = userStore.useState((s) => s);
  const existingUser = Cookies.get("token");
  const existingUserId = Cookies.get("userId");
  const { data, isLoading } = useQuery(
    ["userData", existingUserId],
    () =>
      axios
        .get(`user/${existingUserId}`)
        .then((res) => res.data)
        .catch((err) => {
          // Cookies.remove("token");
          // Cookies.remove("userId");
          // navigate("/login");
        }),
    {
      enabled: existingUserId ? true : false,
      onSuccess(data) {
        userStore.update((s) => {
          s.userData = data;
        });
      },
    }
  );

  useEffect(() => {
    if (!existingUser) navigate("/login");
  }, []);

  function handleLogout() {
    const checkToken = Cookies.get("token");
    if (checkToken) {
      Cookies.remove("token");
      Cookies.remove("userId");
    }
    navigate("/login");
  }

  return (
    <>
      <div className="w-full flex bg-[#0F0F0F] relative">
        {userState.logout && (
          <>
            <div className="logout absolute h-full z-40 backdrop-blur-sm  w-full flex items-center pt-[200px] flex-col">
              <div className="p-4">
                <div className="text-white">
                  Are you sure you want to log out?
                </div>
                <div className="text-white mt-[30px]">
                  <span
                    onClick={() => {
                      userStore.update((s) => {
                        s.logout = false;
                      });
                    }}
                    className="w-[100px] border-2 border-[#fe8040] cursor-pointer rounded-md p-2 mr-[10px]"
                  >
                    Cancel
                  </span>
                  <span
                    onClick={handleLogout}
                    className="w-[100px] bg-[#fe8040] cursor-pointer p-2 rounded-md"
                  >
                    Logout
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        <>
          <div className="sideBar hidden h-[100vh]  w-[20%] md:flex items-center ">
            <div className="w-full text-center">
              {menuLists.map((item, index) => (
                <>
                  <div
                    onClick={() => setActiveIndex(index + 1)}
                    className={`itemMenu flex items-center ${
                      activeIndex - 1 !== index
                        ? "text-white"
                        : "text-[#fe8040]"
                    } justify-center gap-[30px] font-semibold uppercase tracking-widest w-[100%] my-5 p-5 cursor-pointer hover:text-[#fe8040]`}
                  >
                    <div className="h-[30px] w-[30px]">
                      {activeIndex - 1 === index ? item.activeIcon : item.icon}
                    </div>
                    {item.title}
                  </div>
                </>
              ))}
            </div>
          </div>
          <div className="bottomBar h-[60px] block md:hidden w-full bg-[#0F0F0F] shadow-lg fixed top-[93vh] z-30">
            <div className="h-[40px] flex items-center justify-around">
              {menuLists.map((list, index) => (
                <div
                  className="h-[10px] w-[20px]"
                  onClick={() => setActiveIndex(index + 1)}
                >
                  <div className="h-[30px] w-[30px]">
                    {activeIndex - 1 === index ? list.activeIcon : list.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
        <div className="md:w-[50%] w-full  md:ml-[10px] md:mt-10">
          <Outlet />
        </div>

        <div className="rightBar rounded-lg hidden min-h-[100vh] h-[auto] w-[40%] md:flex items-center pt-[150px]">
          {state.profileClick && <ProfileView />}
          {state.commentsClick && <CommentsView />}
        </div>
      </div>
    </>
  );
}

export default Layout;
