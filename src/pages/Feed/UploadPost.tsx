import Cookies from "js-cookie";
import { ChangeEvent, useState } from "react";
import { ImagesIcon } from "../../Icons";
import axios from "../../services/axios";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../Components/Loading";

function UploadPost() {
  const [enterField, setEnterField] = useState(false);
  const [postData, setPostData] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const queryClient = useQueryClient();
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setLoading(true);
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      const formData = new FormData();
      formData.append("file", selectedFiles[0]);

      axios
        .post(`/post/${Cookies.get("userId")}/upload`, formData)
        .then((res) => {
          toast.success("uploaded successfully");
          setLoading(false);
          setUploadedUrls((prevArray) => [...prevArray, res.data.fileUrl]);
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.message);
        });
    }
  }

  function handleDelete(fileData: string) {
    setUploadedUrls((prevFiles) =>
      prevFiles.filter((file) => file !== fileData)
    );
  }

  function handleUploadPost() {
    setLoading(true);
    axios
      .post("post/upload-post", {
        id: Cookies.get("userId"),
        postDescription: postData,
        images: uploadedUrls,
      })
      .then((res) => {
        setLoading(false);
        toast.success("posted successfully");
        setPostData("");
        setUploadedUrls([]);
        setEnterField(false);
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.message);
      });
  }

  return (
    <>
      <div className="upload max-w-xl mx-auto shadow-md rounded-sm md:flex  md:items-center md:justify-start p-1">
        <img
          src="https://cdn-icons-png.flaticon.com/128/236/236831.png"
          alt="profile"
          className="rounded-full h-[50px] w-[50px] m-5"
        />
        <div className="w-full">
          <textarea
            className={`${
              enterField && postData.length > 70 ? "h-[200px]" : "h-auto"
            } w-full resize-none rounded-sm bg-[#303030] p-3 text-white`}
            placeholder="What's on your mind?"
            onClick={() => setEnterField(true)}
            value={postData}
            onChange={(e) => setPostData(e.target.value)}
          />
        </div>
      </div>
      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="upload-image h-auto flex justify-center relative mt-9">
            <div>
              <div className="h-[30px] hover:cursor-pointer absolute">
                {<ImagesIcon />}
              </div>
              <h5 className="ml-10 text-white">Upload Photos</h5>
            </div>
            {UploadPost.length <= 6 && (
              <input
                type="file"
                className="absolute opacity-0 hover:cursor-pointer w-[120px]"
                onChange={handleFileChange}
                multiple
              />
            )}
          </div>

          {uploadedUrls.length > 0 && (
            <>
              <div
                className={`imgGrid mt-[50px] mx-auto max-w-sm  grid gap-[1px] grid-cols-2 grid-rows-${
                  uploadedUrls.length % 3
                }`}
              >
                {uploadedUrls.map((file) => (
                  <>
                    <div className="imageParent">
                      <div className="file relative m-1">
                        <img
                          src={file}
                          alt="uploadedImage"
                          className="h-28 w-full object-cover"
                        />
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png"
                          className="absolute h-[20px] top-1 right-1 hover:cursor-pointer"
                          alt="delete"
                          onClick={() => handleDelete(file)}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </>
          )}
          {(uploadedUrls.length > 0 || postData.length > 0) && (
            <>
              <div className="postButton relative max-w-xl my-10 flex items-center justify-center mx-auto">
                <button
                  onClick={handleUploadPost}
                  className="w-[200px] h-[40px] rounded-sm shadow-md overflow-hidden bg-[#fe8040] uppercase font-semibold tracking-widest text-md"
                >
                  post
                </button>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

export default UploadPost;
