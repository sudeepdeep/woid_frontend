import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userStore } from "../Layout/Layout";
import profile from "../assets/images/default-profile.jpg";
import { FacebookIcon, InstaIcon, TwitterIcon } from "../Icons";

function ProfileCard({ data }: any) {
  const { user, postsCount } = data;
  const navigate = useNavigate();

  const socialMediaIcons = [
    {
      media: "instagram",
      component: <InstaIcon />,
    },

    {
      media: "twitter",
      component: <TwitterIcon />,
    },
    {
      media: "facebook",
      component: <FacebookIcon />,
    },
  ];

  function handleFollow() {}
  return (
    <div className="profile-card w-[300px] min-h-[50vh] pb-3 h-auto relative flex-col justify-center rounded-md bg-[#303030] text-white">
      <img
        src={user?.profileUrl ?? profile}
        alt="logo"
        className="rounded-md w-[200px] h-[200px] absolute -top-4 left-[50%] object-cover shadow-2xl translate-x-[-50%]"
      />
      <div className="pt-[190px] text-center">
        <div className="username font-bold">{user?.username ?? ""}</div>
        <div className="desc">{user?.bio ?? "--"}</div>
        <div className="flex justify-around items-center gap-4">
          <div>
            <div className="desc font-extrabold">
              {user?.followers.length ?? 0}
            </div>
            <div className="followers text-slate-400 font-semibold text-sm">
              Followers
            </div>
          </div>

          <div>
            <div className="desc font-extrabold">
              {user?.following.length ?? 0}
            </div>
            <div className="followers text-slate-400 font-semibold text-sm">
              Following
            </div>
          </div>

          <div>
            <div className="desc font-extrabold">{postsCount ?? 0}</div>
            <div className="followers text-slate-400 font-semibold text-sm">
              Posts
            </div>
          </div>
        </div>

        {/* <div className="social-media flex gap-1 justify-around my-[10px]">
          {socialMediaIcons.map((icon) => (
            <>{icon.component}</>
          ))}
        </div> */}
        <div
          className="w-[200px] h-[50px] bg-[#fe8040] mx-auto mb-3 mt-3 flex items-center justify-center rounded-md font-semibold cursor-pointer"
          onClick={() =>
            user._id !== Cookies.get("userId")
              ? handleFollow
              : navigate(`/${user._id}/edit-profile`)
          }
        >
          {user._id !== Cookies.get("userId") ? "Follow" : "Edit Profile"}
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;