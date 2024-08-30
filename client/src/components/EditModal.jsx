/* eslint-disable react/prop-types */

import { useState } from "react";
import BackDrop from "./BackDrop";
import axios from "axios";
import { EDIT_PROFILE_BIO } from "../apis/backendapi";

const EditModal = ({ setEditModal,triggerMount,setTriggerMount}) => {
  const [editedBio, setEditedBio] = useState("");
  const handleEditBio = async () => {
    if (editedBio === "") return alert("write some text to edit!!!");
    await axios.put(
      EDIT_PROFILE_BIO,
      {
        bio: editedBio,
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
    setEditedBio("");
    setTriggerMount(!triggerMount)
    setEditModal(false);
    return alert("bio updated.");
  };
  return (
    <>
      <div onClick={() => setEditModal(false)}>
        <BackDrop />
      </div>
      <div className="z-10 absolute left-[33%%] top-[33%] bg-[#313131] rounded-md border border-gray-300 w-[650] h-[150px]">
        <div className="flex justify-center p-4 items-center">
          <input
            autoFocus
            type="text"
            className="w-[550px] h-[40px] border border-gray-400 rounded-md bg-[#313131] text-white p-1 font-rubik"
            placeholder="write bio..."
            value={editedBio}
            onChange={(e) => setEditedBio(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 cursor-pointer rounded-md w-[150px] text-white font-bold h-[35px]"
            onClick={handleEditBio}
          >
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default EditModal;
