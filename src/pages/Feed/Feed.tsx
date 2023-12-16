import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ActivateLikeIcon,
  CommentIcon,
  LikeIcon,
  ShareIcon,
} from "../../Icons";
import axios from "../../services/axios";
import Cookies from "js-cookie";
import { useQuery, useQueryClient } from "react-query";
import { Store } from "pullstate";
import { toast } from "react-toastify";
import loading from "../../assets/images/loading.gif";
import Loading from "../../Components/Loading";

interface FeedInteraction {
  profileClick: boolean;
  profileData: any;
  commentsClick: boolean;
  commentsData: any;
  imagesClick: boolean;
}

export const FeedStore = new Store<FeedInteraction>({
  commentsClick: false,
  profileClick: false,
  profileData: null,
  commentsData: null,
  imagesClick: false,
});

function Feed({ isPublic = false, myPosts = false }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any[]>([]);

  const { data, isLoading, refetch } = useQuery(
    ["feed-posts"],
    () =>
      axios
        .get(`post/${Cookies.get("userId")}`, {
          params: {
            page: page,
            type: isPublic ? undefined : myPosts ? "my-posts" : "following",
          },
        })
        .then((res) => res.data)
        .catch((err) => toast.error(err)),
    {
      onSuccess(data) {
        if (data.length > 0) {
          setItems(data);
          setPage((prevPage) => prevPage + 1);
        }
      },
      onError(err) {
        toast.error("some thing went wrong");
      },
    }
  );

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isLoading
    ) {
      return;
    }
    refetch();
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

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
      .catch((err) => toast.error(err));
  }

  async function handleDisLike(postId: any) {
    await axios
      .post(`post/${postId}/delete-like`, { id: Cookies.get("userId") })
      .then((res) => {
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => toast.error(err));
  }

  function handlePostDelete(postId: string) {
    axios
      .post(`post/${postId}/delete-post`)
      .then((res) => {
        toast.success("post deleted successfully");
        window.location.reload();
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  if (isLoading) return <Loading />;

  function HandleParsedText({ text }: any) {
    const splitText = text.split(" ");
    return (
      <>
        {splitText.map((text: string) => (
          <>
            {text[0] === "#" ? (
              <span className="font-semibold text-[#fe8040] cursor-pointer mx-1">
                {text}
              </span>
            ) : (
              <span className="mx-[2px]">{text}</span>
            )}
          </>
        ))}
      </>
    );
  }

  function handleFollow(userId: any, friendId: string) {
    axios
      .put(`user/${userId}`, { following: [friendId] })
      .then((res) => {
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  function handleUnfollow(userId: any, friendId: string) {
    axios
      .put(`user/${userId}/${friendId}/un-follow`)
      .then((res) => {
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => {
        toast.error(err);
      });
  }

  return (
    <>
      <div className="timeline  max-h-[100vh] overflow-auto max-w-xl mx-auto my-10">
        {items?.map((post: any, feedIndex: any) => (
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
                  <div
                    onClick={() =>
                      post?.user?.followers.includes(Cookies.get("userId"))
                        ? handleUnfollow(Cookies.get("userId"), post.user._id)
                        : handleFollow(Cookies.get("userId"), post.user._id)
                    }
                    className="followButton text-[#fe8040] border-2 text-sm w-[70px] h-[25px] flex items-center justify-center ml-1 rounded-md border-[#fe8040] cursor-pointer"
                  >
                    {post?.user?.followers.includes(Cookies.get("userId"))
                      ? "Following"
                      : "Follow"}
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
                  <HandleParsedText text={post?.post?.postDescription ?? ""} />
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
