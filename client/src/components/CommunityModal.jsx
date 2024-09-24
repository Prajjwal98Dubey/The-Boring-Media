/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import BackDrop from "./BackDrop";
import {
  COMMUNITY_COVER_PHOTO_UPLOAD,
  COMMUNITY_PHOTO_UPLOAD,
  CREATE_COMMUNITY,
  JOIN_COMMUNITY,
} from "../apis/backendapi";
import axios from "axios";

const CommunityModal = ({ isCommunityModalOpen, setIsCommunityModalOpen }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [communityPhoto, setCommunityPhoto] = useState({});
  const [communityCoverPhoto, setCommunityCoverPhoto] = useState({});
  const [communityPhotoUpload, setCommunityPhotoUpload] = useState("");
  const [communityCoverPhotoUpload, setCommunityCoverPhotoUpload] =
    useState("");
  const handleCommunityPhoto = (e) => {
    setCommunityPhoto(e.target.files[0]);
  };
  const handleSubmitCommunityPhoto = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("community-photo", communityPhoto);
    await fetch(COMMUNITY_PHOTO_UPLOAD, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("devil-auth")).refreshToken
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCommunityPhotoUpload(data.url);
        alert("community photo upload.");
      })
      .catch((err) => console.log(err));
  };
  const handleCommunityCoverPhoto = (e) => {
    setCommunityCoverPhoto(e.target.files[0]);
  };
  const handleSubmitCommunityCoverPhoto = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("community-cover-image", communityCoverPhoto);
    await fetch(COMMUNITY_COVER_PHOTO_UPLOAD, {
      method: "POST",
      body: data,
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("devil-auth")).refreshToken
        }`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCommunityCoverPhotoUpload(data.url);
        alert("community cover photo uploaded.");
      })
      .catch((err) => console.log(err));
  };
  const handleCreateCommunity = async () => {
    if (title === "" || desc === "") return alert("enter mandatory fields.");
    const {data} = await axios.post(
      CREATE_COMMUNITY,
      {
        title,
        description: desc,
        communityPhoto: communityPhotoUpload,
        communityCoverPhoto: communityCoverPhotoUpload,
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
    await axios.post(JOIN_COMMUNITY, {
      community:data,
    },{
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${JSON.parse(localStorage.getItem('devil-auth')).refreshToken}`
      }
    });
    setIsCommunityModalOpen(false);
    alert("community created");
    return;
  };
  return (
    <>
      <div onClick={() => setIsCommunityModalOpen(false)}>
        <BackDrop />
      </div>
      <div className="z-10 fixed left-[50%] top-[50%] bg-[#313131] rounded-md border border-gray-400 w-[850px] h-[600px] transform -translate-x-1/2 -translate-y-1/2 shadow-sm shadow-white">
        <div className="flex justify-center p-1 items-center text-white font-bold m-1">
          Create a community
        </div>
        <div className="flex justify-center ">
          <input
            type="text"
            placeholder="title for community"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[500px] h-[35px] p-1 text-white bg-[#313131] border border-gray-400 rounded-md m-1"
          />
        </div>
        <div className="flex justify-center p-1 items-center">
          <textarea
            placeholder="description for community..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="bg-[#313131] rounded-md border border-gray-300 w-[500px] h-[200px] p-1 text-white"
          ></textarea>
        </div>
        <div className="flex justify-center">
          <form onSubmit={(e) => handleSubmitCommunityPhoto(e)}>
            <div>
              <input
                type="file"
                name="community-photo"
                onChange={(e) => handleCommunityPhoto(e)}
              />
              <div>
                <button
                  className="bg-blue-600 w-[150px] h-[35px] rounded-md hover:bg-blue-700 cursor-pointer"
                  type="submit"
                >
                  upload
                </button>
              </div>
            </div>
          </form>

          <form onSubmit={(e) => handleSubmitCommunityCoverPhoto(e)}>
            <div>
              <input
                type="file"
                name="community-cover-image"
                onChange={(e) => handleCommunityCoverPhoto(e)}
              />
              <div>
                <button
                  className="bg-blue-600 w-[250px] h-[35px] rounded-md hover:bg-blue-700 cursor-pointer"
                  type="submit"
                >
                  upload cover photo
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-700 cursor-pointer hover:bg-blue-600 w-[150px] h-[35px] rounded-md m-1"
            onClick={handleCreateCommunity}
          >
            {" "}
            + Create
          </button>
        </div>
        <div className="border border-gray-400 m-1"></div>
        <div className="flex justify-center text-xl font-extrabold">{`c/${title}`}</div>
        <div className="flex justify-center text-md font-bold ">{desc}</div>
      </div>
    </>
  );
};

export default CommunityModal;
