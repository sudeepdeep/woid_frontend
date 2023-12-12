import { Store } from "pullstate";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import "./App.css";
import Feed from "./pages/Feed/Feed";
import UploadPost from "./pages/Feed/UploadPost";
import axios from "./services/axios";
import Cookies from "js-cookie";

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

const images = [
  "https://i.pinimg.com/originals/23/93/1c/23931cec40eee9526c3d89206070e7af.jpg",
  "https://wallpapers.com/images/featured/hd-a5u9zq0a0ymy2dug.jpg",
  "https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D",
  "https://www.hdimages.pics/images/quotes/english/general/beautiful-white-flower-wallpaper-hd-52650-312751-mobile.jpg",
  "https://wallpapers.com/images/hd/bubbles-background-cxu66nt9guprib70.jpg",
];

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const [feedData, setFeedData] = useState<any[]>([]);

  const { data, isLoading } = useQuery("feed-posts", () =>
    axios.get(`post/${Cookies.get("userId")}`).then((res) => res.data)
  );

  const fetchData = (page: number) => {
    const newFeedData = images[page];
    if (newFeedData) {
      setFeedData((prevData) => [...prevData, ...Array.from(newFeedData)]);
    }
  };

  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setPageNumber((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    fetchData(pageNumber);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pageNumber]);

  return (
    <div className="mainBody w-full">
      <div className="mainContent w-[100%] ">
        <div className="logo w-full h-[40px]">
          <img
            src="https://www.freepnglogos.com/uploads/shopee-logo-png/shopee-logo-products-kjm-11.png"
            alt="logo"
            className="h-10 w-[100px] mx-auto object-cover sm:w-32 sm:h-full"
          />
        </div>
        <UploadPost />
        <Feed data={data} loading={isLoading} />
      </div>
    </div>
  );
}

export default App;
