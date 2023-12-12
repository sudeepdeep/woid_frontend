import React from "react";

const commentData = [
  {
    user: "Deep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test",
  },
  {
    user: "sudeep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },
  {
    user: "sudeep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },
  {
    user: "sudeep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },
  {
    user: "sudeep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },
  {
    user: "sudeep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },
  {
    user: "sudeep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },
  {
    user: "sudeesp",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },

  {
    user: "sudeesp",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },

  {
    user: "sudeep",
    url: "https://w0.peakpx.com/wallpaper/349/652/HD-wallpaper-allu-arjun-ala-vaikunthapurramuloo.jpg",
    comment: "Hai test123 ",
  },
];

function CommentsView() {
  return (
    <>
      <div className="text-white w-full h-auto overflow-auto md:mb-0 mb-20">
        <div className="uppercase font-extrabold text-white tracking-widest">
          comments
        </div>
        <div className="border-b-2 border-white mb-3"></div>
        {commentData?.map((comment) => (
          <>
            <div className="profile flex gap-2 p-2 items-center md:mb-2 mb-2">
              <img
                src={comment.url}
                alt="profile"
                className="h-[50px] w-[50px] rounded-full"
              />
              <div className="h-auto w-full p-3 m-3 rounded-md bg-[#303030] ">
                <div className="name font-semibold">{comment.user}</div>
                <div className="comment">{comment.comment}</div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default CommentsView;
