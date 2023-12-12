import Cookies from "js-cookie";
import { ChangeEvent, useState } from "react";
import { ImagesIcon } from "../../Icons";
import axios from "../../services/axios";
import { useQueryClient } from "react-query";

function UploadPost() {
  const [enterField, setEnterField] = useState(false);
  const [postData, setPostData] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const queryClient = useQueryClient();
  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = e.target.files;
    if (selectedFiles) {
      setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
    }
  }

  function handleDelete(fileData: File) {
    setFiles((prevFiles) => prevFiles.filter((file) => file !== fileData));
  }

  function handleUploadPost() {
    // const formData = new FormData();
    // formData.append("file", files[0]);
    axios
      .post("post/upload-post", {
        id: Cookies.get("userId"),
        postDescription: postData,
      })
      .then((res) => {
        setPostData("");
        setEnterField(false);
        queryClient.invalidateQueries("feed-posts");
      })
      .catch((err) => {
        console.log(err);
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
      <div className="upload-image h-auto flex justify-center relative mt-9">
        <div>
          <div className="h-[30px] hover:cursor-pointer absolute">
            {<ImagesIcon />}
          </div>
          <h5 className="ml-10 text-white">Upload Photos</h5>
        </div>
        {files.length <= 6 && (
          <input
            type="file"
            className="absolute opacity-0 hover:cursor-pointer w-[120px]"
            onChange={handleFileChange}
            multiple
          />
        )}
      </div>

      {files.length > 0 && (
        <>
          <div
            className={`imgGrid mt-[50px] mx-auto max-w-sm  grid gap-[1px] grid-cols-2 grid-rows-${
              files.length % 3
            }`}
          >
            {files.map((file) => (
              <>
                <div className="imageParent">
                  <div className="file relative m-1">
                    <img
                      src="https://i.pinimg.com/236x/16/94/de/1694de327224fb21c0dfc7f2c892d711.jpg"
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
      {(files.length > 0 || postData.length > 0) && (
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
  );
}

export default UploadPost;