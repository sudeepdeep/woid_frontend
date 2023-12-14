import React from "react";
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

function Feed({ data, loading }: any) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
  }

  async function handleDisLike(postId: any) {
    await axios
      .post(`post/${postId}/delete-like`, { id: Cookies.get("userId") })
      .then((res) => {
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => console.log(err));
  }

  function handlePostDelete(postId: string) {
    axios
      .post(`post/${postId}/delete-post`)
      .then((res) => {
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (loading) return <div>Spinner....!</div>;

  return (
    <>
      <div className="timeline  max-h-[100vh] overflow-auto max-w-xl mx-auto my-10">
        {data?.map((post: any, feedIndex: any) => (
          <>
            <div className="postCard bg-[#303030] w-full  h-auto  p-6 mb-2  rounded-md">
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

                {post.user._id === Cookies.get("userId") && (
                  <>
                    <div
                      className="followButton text-[#fe8040] border-2 text-sm w-[70px] h-[25px] flex items-center justify-center ml-1 rounded-md border-[#fe8040] cursor-pointer"
                      onClick={() => handlePostDelete(post.post._id)}
                    >
                      {"Delete"}
                    </div>
                  </>
                )}
              </div>
              <div className="postImages grid gap-4">
                <div className="postText mt-2 text-white">
                  {post?.post?.postDescription}
                </div>
                {post?.post?.images.length > 0 && (
                  <>
                    <div className="coverImage my-2 h-[200px] overflow-hidden max-w-full rounded-lg">
                      <img src={post?.post?.images[0]} alt="coverImage" />
                    </div>
                    {post?.post?.images.length > 1 && (
                      <div className="grid grid-cols-4 gap-2 h-[100px] overflow-hidden">
                        {post?.post?.images.map(
                          (image: any, index: number) =>
                            index !== 0 && (
                              <>
                                <div className="images rounded-md">
                                  <img src={image} alt="images" />
                                </div>
                              </>
                            )
                        )}
                      </div>
                    )}
                  </>
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
                      <span className="text-white">
                        {post?.post?.likedBy.length > 0 &&
                          post?.post?.likedBy.length}
                      </span>
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
