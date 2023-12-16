import React from "react";
import { useQuery } from "react-query";
import axios from "../../services/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import Feed from "../Feed/Feed";
import ProfileCard from "../../Components/ProfileCard";

function Profile() {
  const { data, isLoading } = useQuery("user-data", () =>
    axios
      .get(`/user/${Cookies.get("userId")}`)
      .then((res) => res.data)
      .catch((err) => toast.error(err))
  );

  if (isLoading) return <Loading />;
  return (
    <>
      <div className="profile w-full min-h-[50vh] mt-[70px] md:mt-0 h-auto text-center flex justify-center">
        <ProfileCard data={data} />
      </div>
      <div className="text-white text-center font-bold tracking-widest">
        MY POSTS
      </div>
      <Feed myPosts={true} />
    </>
  );
}

export default Profile;
