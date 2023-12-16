import { Store } from "pullstate";
import "./App.css";
import { ExitIcon } from "./Icons";
import { userStore } from "./Layout/Layout";
import logo from "./assets/images/WOIDLOGO.png";
import Feed from "./pages/Feed/Feed";
import UploadPost from "./pages/Feed/UploadPost";

function App() {
  function handleLogout() {
    userStore.update((s) => {
      s.logout = true;
    });
  }

  return (
    <div className="mainBody w-full">
      <div className="mainContent w-[100%]">
        <div className="logo w-full relative flex items-center h-[50px] pt-[20px] sm:h-auto">
          <img
            src={logo}
            alt="logo"
            className="h-10 w-[100px] mx-auto object-cover sm:w-32 sm:h-full"
          />
          <div
            className="logout absolute right-5 cursor-pointer text-white"
            onClick={handleLogout}
          >
            <ExitIcon />
          </div>
        </div>
        <UploadPost />
        <Feed />
      </div>
    </div>
  );
}

export default App;
