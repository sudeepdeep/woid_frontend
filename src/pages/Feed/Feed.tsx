import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FeedStore } from "../../App";
import {
  ActivateLikeIcon,
  CommentIcon,
  LikeIcon,
  ShareIcon,
} from "../../Icons";
import axios from "../../services/axios";
import Cookies from "js-cookie";
import { useQueryClient } from "react-query";

const images = [
  "https://i.pinimg.com/originals/23/93/1c/23931cec40eee9526c3d89206070e7af.jpg",
  "https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg",
  "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  "https://www.hdimages.pics/images/quotes/english/general/beautiful-white-flower-wallpaper-hd-52650-312751-mobile.jpg",
  "https://wallpapers.com/images/hd/bubbles-background-cxu66nt9guprib70.jpg",
];

function Feed({ data, loading }: any) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [like, setLike] = useState(false);

  function handleProfileClick(id: number) {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      navigate("profile");
    } else {
      FeedStore.update((s) => {
        s.profileClick = true;
        s.commentsClick = false;
        s.imagesClick = false;
      });
    }
  }

  function handleCommentClick(id: number) {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600) {
      navigate("comments");
    } else {
      FeedStore.update((s) => {
        s.commentsClick = true;
        s.imagesClick = false;
        s.profileClick = false;
      });
    }
  }

  async function handleLike(postId: any) {
    await axios
      .post(`post/${postId}/like-post`, { id: Cookies.get("userId") })
      .then((res) => {
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => console.log(err));
    setLike(!like);
  }

  async function handleDisLike(postId: any) {
    await axios
      .post(`post/${postId}/delete-like`, { id: Cookies.get("userId") })
      .then((res) => {
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => console.log(err));
    setLike(!like);
  }

  function parsedData(text: string) {
    const hashIndex = text.indexOf("#") + 1;
    return hashIndex;
  }

  if (loading) return <div>Spinner....!</div>;

  return (
    <>
      <div className="timeline  max-h-[100vh] overflow-auto max-w-xl mx-auto my-10">
        {data?.map((post: any, feedIndex: any) => (
          <>
            <div className="postCard bg-[#303030] w-full min-h-[470px] h-auto  p-6 mb-2  rounded-md">
              <div className="postTitle flex gap-1 items-center">
                <div className="displayPic w-[35px] h-[35px] rounded-full cursor-pointer">
                  <img
                    src="https://play-lh.googleusercontent.com/GD78NlC-yoQXcLsvTc3JLr_VVR5YKQp43FOfWLB7e5lwU_La_hy4olpMaj0_yY7ScgQ"
                    alt="profilePic"
                    className="rounded-full"
                    onClick={() => handleProfileClick(feedIndex)}
                  />
                </div>
                <div
                  className="userName font-semibold ml-2 text-white cursor-pointer"
                  onClick={() => handleProfileClick(feedIndex)}
                >
                  {post?.user?.username}
                </div>
                {post.user._id !== Cookies.get("userId") && (
                  <div className="followButton text-[#fe8040] border-2 text-sm w-[70px] h-[25px] flex items-center justify-center ml-1 rounded-md border-[#fe8040] cursor-pointer">
                    {"Follow"}
                  </div>
                )}
              </div>
              <div className="postImages grid gap-4">
                <div className="postText mt-2 text-white">
                  {post?.post?.postDescription}
                </div>

                <div className="coverImage my-2 h-[200px] overflow-hidden max-w-full rounded-lg">
                  <img src={images[0]} alt="coverImage" />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2 h-[100px] overflow-hidden">
                    {images.map(
                      (image, index) =>
                        index !== 0 && (
                          <>
                            <div className="images rounded-md">
                              <img src={images[index]} alt="images" />
                            </div>
                          </>
                        )
                    )}
                  </div>
                )}
              </div>
              <div className="postFooter flex gap-2 mt-7 items-center justify-between">
                <div className="likeButton cursor-pointer flex gap-2 w-[100%] justify-center items-center">
                  {post?.liked ? (
                    <div
                      className="flex items-center gap-2"
                      onClick={() => handleDisLike(post?.post?._id)}
                    >
                      <div className="h-[20px] my-4">
                        {<ActivateLikeIcon />}
                      </div>
                      <div className="text-white">liked</div>
                    </div>
                  ) : (
                    <div
                      className="flex items-center gap-2"
                      onClick={() => handleLike(post?.post?._id)}
                    >
                      <div className="h-[20px] my-4">{<LikeIcon />}</div>
                      <div className="text-white">like</div>
                    </div>
                  )}
                </div>
                <div
                  className="commentButton flex gap-2 w-[100%] justify-center items-center cursor-pointer"
                  onClick={() => handleCommentClick(feedIndex)}
                >
                  <div className="h-[20px] my-4">{<CommentIcon />}</div>
                  <div className="text-white">comment</div>
                </div>
                <div className="shareButton flex gap-2 w-[100%] justify-center items-center cursor-pointer">
                  <div className="h-[20px] my-4">{<ShareIcon />}</div>
                  <div className="text-white">share</div>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Feed;
