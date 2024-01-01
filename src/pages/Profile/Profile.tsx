import React from "react";
import { useQuery } from "react-query";
import axios from "../../services/axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { ProfileLoading } from "../../Components/Loading";
import Feed from "../Feed/Feed";
import ProfileCard from "../../Components/ProfileCard";
import { useParams } from "react-router-dom";

function Profile() {
  const { userId } = useParams();
  const { data, isLoading } = useQuery("user-data", () =>
    axios
      .get(`/user/${userId ?? Cookies.get("userId")}/my-profile`)
      .then((res) => res.data)
      .catch((err) => toast.error(err))
  );

  if (isLoading) return <ProfileLoading />;
  return (
    <div className="h-auto min-h-[100vh]">
      <div className="profile w-full mt-[70px] md:mt-0 h-auto text-center flex justify-center">
        <ProfileCard data={data} />
      </div>
      <div className="text-white text-center font-bold tracking-widest my-4">
        Feed
      </div>
      <Feed myPosts={true} />
    </div>
  );
}

export default Profile;
