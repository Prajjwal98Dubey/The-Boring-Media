import axios from "axios";
import { LIKES_API } from "../apis/backendapi";

export const handleLikes = async (postId) => {
  await axios.get(LIKES_API + `?postId=${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("devil-auth")).refreshToken
      }`,
    },
  });
};
