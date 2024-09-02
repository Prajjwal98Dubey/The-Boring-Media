// import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HOST_DETAILS, SINGLE_COMMUNITY } from "../apis/backendapi";
import { POST_LOADER, USERS_GROUP_ICON } from "../assets/icons";
const CommunityPage = () => {
  const { id } = useParams();
  const [communityDetails, setCommunitiesDetails] = useState([]);
  const [hostDetail, setHostDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getCommunityDetails = async () => {
      await fetch(SINGLE_COMMUNITY + `?id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(async (res) => {
          setCommunitiesDetails(res);
          await fetch(HOST_DETAILS + `?host=${res.host}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((response) => {
              setHostDetails(response);
              setIsLoading(false);
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    };
    getCommunityDetails();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center p-2">
          <img
            src={POST_LOADER}
            alt="loading"
            className="flex justify-center items-center w-[30px] h-[30px] animate-pulse"
          />
        </div>
      ) : (
        <div>
          <div className="w-[40%] fixed top-0 left-0 h-full border border-transparent border-r-gray-400">
            <div>
              {communityDetails.communityCoverPhoto !== "" ? (
                <img
                  src={communityDetails.communityCoverPhoto}
                  alt="loading"
                  className="w-full h-[200px]"
                />
              ) : (
                <div className="w-full h-[200px] bg-red-500"></div>
              )}
              <div className="fixed top-[17%] left-[16.5%] mt-[20px]">
                {communityDetails.communityPhoto !== "" ? (
                  <div>
                    <img
                      src={communityDetails.communityPhoto}
                      alt="loading"
                      className="w-[100px] h-[100px] rounded-full border border-gray-400 "
                    />
                  </div>
                ) : (
                  <div className="w-[100px] h-[100px] rounded-full border border-gray-400 text-white font-bold text-5xl flex justify-center items-center bg-black">
                    /c
                  </div>
                )}
              </div>
            </div>
            <div className="mt-[45px] flex justify-center font-bold font-rubik text-white text-4xl">
              {communityDetails.title}
            </div>
            <div className="flex justify-center text-[16px] text-gray-300">
              by
            </div>
            <div className="flex justify-center">
              <div className="flex ">
                <div className="flex justify-center items-center m-1">
                  <img
                    src={hostDetail.photo}
                    alt="loading"
                    className="w-[20px] h-[20px] rounded-full "
                  />
                </div>
                <div className="text-[19px] text-white font-bold flex justify-center items-center m-1">
                  {hostDetail.name}
                </div>
              </div>
            </div>
            <div className="m-1 text-gray-300 text-[15px] font-rubik  text-center">
              {communityDetails.description}
            </div>
            <div className="flex justify-center items-center mt-3">
              <button className="w-[200px] h-[35px] p-1 flex justify-center items-center bg-blue-600 cursor-pointer hover:bg-blue-700 text-white font-bold font-rubik rounded-md">
                Join community
              </button>
            </div>
            <div className="flex justify-center mt-4">
              <div className="flex justify-center items-center m-[2px]">
                <img
                  src={USERS_GROUP_ICON}
                  alt="loading"
                  className="w-[21px] h-[21px] flex justify-center items-center"
                />
              </div>
              <div className="text-white font-bold flex justify-center items-center m-[2px]">
                12.2K
              </div>
              <div className="text-gray-300 flex justify-center items-center m-[2px]">
                members
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CommunityPage;
