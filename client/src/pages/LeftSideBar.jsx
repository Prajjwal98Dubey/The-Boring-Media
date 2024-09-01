import { useEffect, useState } from "react";
import CommunityModal from "../components/CommunityModal";
import axios from "axios";
import { ALL_MY_COMMUNITIES } from "../apis/backendapi";
import { trimString } from "../helpers/trimCommName";

const LeftSideBar = () => {
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getAllMyCommunities = async () => {
      const { data } = await axios.get(ALL_MY_COMMUNITIES, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("devil-auth")).refreshToken
          }`,
        },
      });
      setCommunities(data);
      setIsLoading(false);
    };
    getAllMyCommunities();
  }, []);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  return (
    <div className="w-[20%] h-full border border-transparent border-r-gray-500 text-white font-rubik">
      <div className="flex justify-center">
        <button
          className="w-[200px] h-[35px] p-1 hover:bg-gray-400 rounded-md cursor-pointer"
          onClick={() => setIsCommunityModalOpen(true)}
        >
          + Create a community
        </button>
        {isCommunityModalOpen && (
          <CommunityModal
            isCommunityModalOpen={isCommunityModalOpen}
            setIsCommunityModalOpen={setIsCommunityModalOpen}
          />
        )}
      </div>
      <div className="text-gray-400 flex justify-center p-1">COMMUNITIES</div>
      <div>
        <div className="flex justify-center">
          {isLoading ? (
            <div className="text-white font-bold flex justify-center">
              Loading...
            </div>
          ) : (
            <div>
              {communities.map((comm) => (
                <div
                  key={comm._id}
                  className="flex m-1 p-1 hover:bg-[#777171] cursor-pointer rounded-md"
                >
                  <div className="flex justify-center items-center">
                    {comm.communityPhoto === "" ? (
                      <div className="w-[30px] h-[30px] rounded-full border border-gray-300 bg-black text-white font-extrabold flex justify-center items-center">
                        T
                      </div>
                    ) : (
                      <img
                        src={comm.communityPhoto}
                        className="w-[30px] h-[30px] rounded-full border border-gray-300"
                        alt="loading"
                      />
                    )}
                  </div>
                  <div className="text-[15px] text-white flex justify-center items-center ml-1">{`c/${trimString(
                    comm.title
                  )}`}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
