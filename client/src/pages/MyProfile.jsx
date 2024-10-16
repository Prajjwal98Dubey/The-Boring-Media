import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import {
  CHECK_FOLLOWING,
  COUNT_FOLLOW_FOLLOWING,
  CREATE_FOLLOW_FOLLOWING,
  DELETE_MY_POST,
  EDIT_USER_PIC,
  MY_ALL_POSTS,
  MY_DETAILS,
  USER_DETAIL,
} from "../apis/backendapi";
import {
  ADD_POST_ICON,
  CHECK_ICON,
  COMMENT_ICON,
  DELETE_ICON,
  EDIT_PEN_ICON,
  FOLLOW_ICON,
  LIKE_ICON,
  LOGOUT_ICON,
  PLUS_ICON,
  POST_LOADER,
} from "../assets/icons";
import PostModal from "../components/PostModal";
import Brand from "../components/Brand";
import { MyPostContext } from "../contexts/MyPostContext";
import { Link } from "react-router-dom";
import RecommendPostsContext from "../contexts/RecommendPostsContext";
import EditModal from "../components/EditModal";
import ChatSm from "../components/ChatSm";
import Chat from "../components/Chat";

const MyProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [postLoader, setPostLoader] = useState(true);
  const [triggerMount, setTriggerMount] = useState(false);
  const [postModal, setPostModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [userName] = useState(document.URL.split("/").reverse()[0]);
  const [displayPost, setDisplayPost] = useState([]);
  const [follower, setFollower] = useState(0);
  const [isFollowing, setIsFollowing] = useState(false);
  const [following, setFollowing] = useState(0);
  const [fileData, setFileData] = useState({});
  const [isOpenChat, setIsOpenChat] = useState(false);
  const detailRef = useRef(true);
  const { postFromContext, setPostFromContext } = useContext(MyPostContext);
  const { setRecommendPosts } = useContext(RecommendPostsContext);
  useEffect(() => {
    const getMyDetails = async () => {
      if (
        localStorage.getItem("devil-auth") &&
        JSON.parse(localStorage.getItem("devil-auth")).name === userName
      ) {
        const { data } = await axios.get(MY_DETAILS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("devil-auth")).refreshToken
            }`,
          },
        });
        setUserData(data);
        setIsLoading(false);
      } else {
        const { data } = await axios.get(USER_DETAIL + `${userName}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserData(data.user);
        setIsLoading(false);
        setDisplayPost(data.allPosts);
        setPostLoader(false);
      }
    };
    const getAllMyPosts = async () => {
      if (
        localStorage.getItem("devil-auth") &&
        JSON.parse(localStorage.getItem("devil-auth")).name === userName
      ) {
        const { data } = await axios.get(MY_ALL_POSTS, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              JSON.parse(localStorage.getItem("devil-auth")).refreshToken
            }`,
          },
        });
        setPostFromContext(data.allPosts);
        setDisplayPost(data.allPosts);
        setPostLoader(false);
      }
    };
    const getCntFollowerFollowing = async () => {
      const { data } = await axios.get(
        COUNT_FOLLOW_FOLLOWING + `?user=${userName}`
      );
      setFollower(data.followerCnt);
      setFollowing(data.followingCnt);
    };
    const checkFollowing = async () => {
      const { data } = await axios.get(CHECK_FOLLOWING + `?user=${userName}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("devil-auth")).refreshToken
          }`,
        },
      });
      setIsFollowing(data.isFollowing);
    };
    if (detailRef.current) {
      getMyDetails();
      getAllMyPosts();
      detailRef.current = false;
    }
    getCntFollowerFollowing();
    if (localStorage.getItem("devil-auth")) {
      checkFollowing();
    }
  }, [navigate, triggerMount, setPostFromContext, userName]);
  const handleLogOut = () => {
    localStorage.removeItem("devil-auth");
    setPostFromContext([]);
    setRecommendPosts([]);
    navigate("/auth/login");
    return;
  };
  const handleDeletePost = async (id) => {
    setPostLoader(true);
    await axios.delete(DELETE_MY_POST + `${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("devil-auth")).refreshToken
        }`,
      },
    });
    const filterPostsData = postFromContext.filter((post) => post._id !== id);
    setPostFromContext(filterPostsData);
    setDisplayPost(filterPostsData);
    setPostLoader(false);
    // setTriggerMount(!triggerMount)
  };
  const handleFollow = async () => {
    const { data } = await axios.post(
      CREATE_FOLLOW_FOLLOWING,
      {
        followerName: userName,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("devil-auth")).refreshToken
          }`,
        },
      }
    );
    if (data?.isFollowing === false) {
      setIsFollowing(false);
      setTriggerMount(!triggerMount);
    } else {
      setIsFollowing(true);
      setTriggerMount(!triggerMount);
    }
  };
  const handleFile = (e) => {
    setFileData(e.target.files[0]);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(fileData).length === 0)
      return alert("upload some file to continue.");
    const data = new FormData();
    data.append("user-image", fileData);
    await fetch(EDIT_USER_PIC, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("devil-auth")).refreshToken
        }`,
      },
    });
    alert("photo edited.");
  };

  return (
    <div className="h-[100vh] w-[100vw]">
      <Brand />
      {JSON.parse(localStorage.getItem("devil-auth")).name !== userName && (
        <div
          className="fixed bottom-5 right-7"
          onClick={() => setIsOpenChat(true)}
        >
          <ChatSm />
        </div>
      )}
      {isOpenChat && (
        <div className="fixed w-[400px] h-full right-0 top-0 bg-[#3e3d3d] z-10 rounded-l-md">
          <Chat setIsOpenChat={setIsOpenChat} userName={userName} />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="w-[100%] h-[20%] bg-blue-600 flex justify-center relative">
            <img
              src={userData.photo}
              alt="loading"
              loading="lazy"
              className="w-[100px] h-[100px] rounded-full border border-blue-800 shadow-sm shadow-blue-500 hover:cursor-pointer hover:border-blue-500 absolute top-[86px]"
            />
          </div>
          <div className="h-[35%]  mt-[45px] border border-transparent border-b-gray-300">
            <div className="flex justify-center font-rubik text-2xl text-white font-extrabold m-1">
              @{userData.name}
            </div>
            {userData.bio !== "" && (
              <div className="flex justify-center font-playwright text-white m-1">
                {userData.bio}
              </div>
            )}
            {localStorage.getItem("devil-auth") &&
            JSON.parse(localStorage.getItem("devil-auth")).name === userName ? (
              <div className="flex justify-center">
                <img
                  src={EDIT_PEN_ICON}
                  alt="loading..."
                  className="w-[20px] h-[20px] cursor-pointer"
                  onClick={() => setEditModal(true)}
                />
                {editModal && (
                  <EditModal
                    setEditModal={setEditModal}
                    triggerMount={triggerMount}
                    setTriggerMount={setTriggerMount}
                  />
                )}
              </div>
            ) : null}
            <div className="flex justify-center">
              {localStorage.getItem("devil-auth") &&
              JSON.parse(localStorage.getItem("devil-auth")).name ===
                userName ? (
                <div className="">
                  <img
                    src={ADD_POST_ICON}
                    alt="loading"
                    loading="lazy"
                    className="w-[25px] h-[25px] m-2 flex justify-center cursor-pointer items-center"
                    onClick={() => setPostModal(true)}
                  />
                  {postModal && (
                    <PostModal
                      setPostModal={setPostModal}
                      setDisplayPost={setDisplayPost}
                    />
                  )}
                </div>
              ) : null}
              <div className="flex items-center m-2 pl-1 pr-1 justify-center">
                <img
                  src={FOLLOW_ICON}
                  alt="loading"
                  loading="lazy"
                  className="w-[25px] h-[25px] flex justify-center ml-1 mr-1"
                />
                <div className="text-white font-bold w-[34px] flex justify-center ">
                  {follower}
                </div>
              </div>
              <div className="m-2 flex items-center pl-1 pr-1 justify-center">
                <img
                  src={FOLLOW_ICON}
                  alt="loading"
                  loading="lazy"
                  className="w-[25px] h-[25px]  ml-1 mr-1 flex justify-center"
                />
                <div className="text-white font-bold w-[34px] flex justify-center ">
                  {following}
                </div>
              </div>

              {localStorage.getItem("devil-auth") &&
              JSON.parse(localStorage.getItem("devil-auth")).name ===
                userName ? (
                <div>
                  <img
                    src={LOGOUT_ICON}
                    alt="loading"
                    loading="lazy"
                    className="w-[25px] h-[25px] m-2 flex justify-center cursor-pointer"
                    onClick={handleLogOut}
                  />
                </div>
              ) : null}
            </div>
            {localStorage.getItem("devil-auth") &&
            JSON.parse(localStorage.getItem("devil-auth")).name === userName ? (
              <div className="m-2 flex items-center justify-center">
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <input
                    type="file"
                    name="user-image"
                    className="text-white flex justify-center"
                    onChange={(e) => handleFile(e)}
                  />
                  <button
                    type="submit"
                    className="bg-blue-500 text-white hover:bg-blue-600 rounded-md w-[100px] h-[30px]"
                  >
                    Edit
                  </button>
                </form>
              </div>
            ) : null}
            {localStorage.getItem("devil-auth") &&
              JSON.parse(localStorage.getItem("devil-auth")).name !==
                userName && (
                <div className="flex justify-center p-2 items-center m-1 font-rubik">
                  <div
                    className={`${
                      isFollowing ? "bg-green-600" : "bg-blue-600"
                    } w-fit p-2 ${
                      isFollowing ? "hover:bg-green-800" : "hover:bg-blue-800"
                    } h-[30px] rounded-md border  cursor-pointer flex justify-evenly items-center`}
                    onClick={handleFollow}
                  >
                    <img
                      src={isFollowing ? CHECK_ICON : PLUS_ICON}
                      alt="loading"
                      loading="lazy"
                      className="w-[20px] h-[20px] items-center"
                    />
                    <div className="text-white font-semibold font-rubik text-[18px]">
                      {isFollowing ? "Following" : "Follow"}
                    </div>
                  </div>
                </div>
              )}
          </div>
          <div className="h-[47%]  overflow-y-auto">
            {postLoader ? (
              <div className="flex justify-center items-cente p-2">
                <img
                  src={POST_LOADER}
                  alt="loading"
                  className="w-[35px] h-[35px]"
                />
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="">
                  {displayPost.length === 0 ? (
                    <div className="flex justify-center p-4 items-center font-bold font-playwright text-white  ">
                      Write some post...
                    </div>
                  ) : (
                    displayPost.map((post) => (
                      <Link to={`/post/${post._id}`} key={post._id}>
                        <div className="m-2 w-[650px] font-rubik border border-gray-400 rounded-md p-2 hover:cursor-pointer hover:border-gray-500">
                          <div className="text-white font-semibold text-[15px] w-full h-fit flex justify-start p-1">
                            {post.post}
                          </div>
                          {post.postPhoto !== "" && (
                            <div>
                              <img
                                src={post.postPhoto}
                                alt="loading.."
                                className="w-[250px] h-[200px] rounded-md"
                              />
                            </div>
                          )}
                          <div className="flex justify-center">
                            <img
                              src={LIKE_ICON}
                              alt="loading"
                              loading="lazy"
                              className="w-[13px] h-[13px] cursor-pointer m-1"
                            />
                            <img
                              src={COMMENT_ICON}
                              alt="loading"
                              loading="lazy"
                              className="w-[13px] h-[13px] cursor-pointer m-1"
                            />
                            {localStorage.getItem("devil-auth") &&
                            JSON.parse(localStorage.getItem("devil-auth"))
                              .name === userName ? (
                              <img
                                src={DELETE_ICON}
                                alt="loading"
                                loading="lazy"
                                className="w-[13px] h-[13px] cursor-pointer m-1"
                                onClick={() => handleDeletePost(post._id)}
                              />
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MyProfile;
