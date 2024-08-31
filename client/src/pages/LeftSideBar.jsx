import { useState } from "react"
import CommunityModal from "../components/CommunityModal"

const LeftSideBar = () => {
  const[isCommunityModalOpen,setIsCommunityModalOpen] = useState(false)
    return (
      <div className="w-[20%] h-full border border-transparent border-r-gray-500 text-white font-rubik">
          <div className="flex justify-center">
            <button className="w-[200px] h-[35px] p-1 hover:bg-gray-400 rounded-md cursor-pointer" onClick={()=>setIsCommunityModalOpen(true)}>
              + Create a community
            </button>
            {isCommunityModalOpen && <CommunityModal isCommunityModalOpen={isCommunityModalOpen} setIsCommunityModalOpen={setIsCommunityModalOpen}/>}
          </div>
      </div>
    )
  }
  
  export default LeftSideBar
  