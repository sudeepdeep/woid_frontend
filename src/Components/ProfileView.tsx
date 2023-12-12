import React from "react";

function ProfileView() {
  return (
    <div className="profile w-full mx-auto text-white text-center min-h-[90vh] h-auto bg-[#0F0F0F]">
      <div className="profileDetails">
        <img
          src="https://play-lh.googleusercontent.com/GD78NlC-yoQXcLsvTc3JLr_VVR5YKQp43FOfWLB7e5lwU_La_hy4olpMaj0_yY7ScgQ"
          alt="profileImage"
          className="rounded-full w-[80%] mx-auto my-6"
        />
        <div className="username uppercase font-bold tracking-widest">
          username
        </div>
        <div className="bio">welcome to my world!</div>
      </div>
      <div className="followersCount max-w-md mx-auto my-3">
        <span>Followers</span>
        <span className="border-r-2 border-white mx-2" />
        <span>Following</span>
        <div className="flex justify-center gap-10">
          <span className="font-bold">23</span>
          <span className="font-bold">69</span>
        </div>
      </div>
      <div className="viewProfile cursor-pointer mt-3 border-2 w-44 p-3 rounded-md mx-auto border-[#fe8040] text-[#fe8040]">
        View Full Profile
      </div>
    </div>
  );
}

export default ProfileView;
