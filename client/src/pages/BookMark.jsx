import { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { NavBarContext } from "../contexts/NavBarContext";
import axios from "axios";
import { ALL_BOOKMARKS } from "../apis/backendapi";
import SingleBookMark from "../components/SingleBookMark";

const BookMark = () => {
  const { selectedPath, setSelectedPath } = useContext(NavBarContext);
  const [currPath] = useState(document.URL.split("/"));
  const [bookmarks, setBookMarks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const updateContext = () => {
      let updatedSelectedPath = {};
      for (let key in selectedPath) {
        updatedSelectedPath[key] = false;
      }
      updatedSelectedPath["/" + currPath[currPath.length - 1]] = true;
      setSelectedPath(updatedSelectedPath);
    };

    updateContext();
  }, []);
  useEffect(() => {
    const allBookMarks = async () => {
      const { data } = await axios.get(ALL_BOOKMARKS, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("devil-auth")).refreshToken
          }`,
        },
      });
      setBookMarks(data);
      setIsLoading(false);
    };
    allBookMarks();
  }, []);
  return (
    <>
      <Navbar />
      <div className="font-rubik flex justify-center">
        {/* <div>asdas</div> */}
        {isLoading ? (
          <div className="text-white font-bold">Loading...</div>
        ) : (
          <div>
            {bookmarks.length===0 ? <div className="text-white">no bookmarks..</div> : bookmarks.map((bookmark) => (
              <SingleBookMark
                key={bookmark.postId}
                postContent={bookmark.postContent}
                username={bookmark.username}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default BookMark;
