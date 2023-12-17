import React, { ChangeEvent, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";
import profile from "../../assets/images/default-profile.jpg";

function EditProfile() {
  const { userId } = useParams();
  const [state, setState] = useState({
    username: "",
    email: "",
    bio: "",
    profileUrl: "",
  });

  const queryClient = useQueryClient();

  const [loading, setLoading] = useState(false);
  const [dpUpdate, setDpUpdate] = useState(false);

  const { data, isLoading } = useQuery(
    ["user-data", userId],
    () =>
      axios
        .get(`/user/${userId}`)
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
    {
      onSuccess(data) {
        setState({
          ...state,
          username: data?.user?.username,
          email: data?.user?.email,
          bio: data?.user?.bio,
          profileUrl: data?.user?.profileUrl ?? profile,
        });
      },
    }
  );

  if (isLoading) return <Loading />;

  function handleProfileUpload(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);

      axios
        .post(`/user/${userId}/upload-profile`, formData)
        .then((res) => {
          setDpUpdate(true);
          toast.success("uploaded successfully");
          setLoading(false);
          setState({
            ...state,
            profileUrl: res.data.fileUrl,
          });
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  }

  function handleProfileUpdate() {
    axios
      .put(`user/${userId}`, { profileUrl: state.profileUrl })
      .then((res) => {
        setDpUpdate(false);
        toast.success("profile updated successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  function handleSubmit() {
    axios
      .put(`user/${userId}`, state)
      .then((res) => {
        queryClient.invalidateQueries("user-data");
        toast.success("details updated successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }

  return (
    <>
      <div className="md:w-[500px] w-md md:min-h-[70vh] h-[100vh] md:h-auto bg-[#303030] p-[10px] text-white">
        <div className="text-slate-200 opacity-70 font-semibold italic">
          username
        </div>
        <input
          type="text"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-black"
          placeholder="Enter Username"
          value={state?.username}
          onChange={(e) => {
            setState({
              ...state,
              username: e.target.value,
            });
          }}
        />

        <div className="text-slate-200 opacity-70 font-semibold italic">
          bio
        </div>
        <input
          type="text"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-black"
          placeholder="Enter Bio"
          value={state?.bio ?? ""}
          onChange={(e) => {
            setState({
              ...state,
              bio: e.target.value,
            });
          }}
        />

        <div className="text-slate-200 opacity-70 font-semibold italic">
          email
        </div>
        <input
          type="text"
          className="w-full resize-none rounded-sm bg-[#b4c2ed] p-3 mb-2 text-black"
          placeholder="Enter Email"
          value={state?.email}
          onChange={(e) => {
            setState({
              ...state,
              email: e.target.value,
            });
          }}
        />

        <div
          onClick={handleSubmit}
          className="submit w-full h-[50px] flex items-center justify-center font-semibold rounded-md bg-[#fe8040]"
        >
          Update Details
        </div>
        <div className="w-[100px] h-[100px] my-3 bg-red-400">
          <img
            src={state.profileUrl}
            alt="profile"
            className="w-[100px] h-[100px] object-cover"
          />
        </div>
        {state?.profileUrl && (
          <>
            {dpUpdate ? (
              <>
                <div
                  className="w-[100px] h-[30px] flex justify-center items-center bg-[#fe8040] rounded-md cursor-pointer"
                  onClick={handleProfileUpdate}
                >
                  Update
                </div>
              </>
            ) : (
              <div className="relative w-[100px] h-[30px] ">
                <input
                  type="file"
                  className=" w-full h-full absolute z-30 opacity-0"
                  onChange={handleProfileUpload}
                />
                <div className=" absolute w-full h-full flex justify-center items-center bg-[#fe8040] rounded-md cursor-pointer">
                  Edit
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

export default EditProfile;
